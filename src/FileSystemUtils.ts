/* eslint-disable @typescript-eslint/ban-ts-comment */

const isSecurity = window === top && window.location.protocol === "https:";

function genInputElemToBody(attrs: object): HTMLInputElement {
  let input = document.body.querySelector("input#file_system-picker[type=file]") as HTMLInputElement;
  input = input || document.createElement("input");
  if (input.files?.length) {
    try {
      input.type = "text";
      input.value = "";
    } catch (error) {
      console.warn(error);
      input.outerHTML = String(input.outerHTML);
    }
  }
  input.type = "file";
  input.id = "file_system-picker";
  // see https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
  input.style.cssText = `position: absolute; top: 0; left: 0; z-index: -9999; width: 1px; height: 1px; opacity: 0;`;
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      const val = (attrs as any)[key];
      if (val === null || typeof val === "undefined") {
        (input as any)[key] = null;
        input.removeAttribute(key);
      } else {
        (input as any)[key] = val;
        if (typeof val === "function") {
          input.addEventListener(key.replace(/^on/, ""), val);
        }
      }
    }
  }
  if (!document.body.querySelector("input#file_system-picker[type=file]")) {
    document.body.append(input);
  }
  return input;
}

type MockFileSystemFileHandle = FileSystemFileHandle & {
  isSameEntry?(other: FileSystemFileHandle): Promise<boolean>;
  createWritable?(options?: { keepExistingData: boolean } | undefined): Promise<any>;
};

function genMockFileSystemFileHandle(file: File): MockFileSystemFileHandle {
  return {
    kind: "file",
    name: file.name,
    getFile() {
      return Promise.resolve(file);
    },
    isSameEntry() {
      console.warn("Can't implement");
      return Promise.reject(false);
    },
    createWritable() {
      console.warn("Can't implement");
      return Promise.reject(new Error("Not implemented"));
    },
  };
}

interface MockFileSystemDirectoryHandle
  extends Pick<FileSystemDirectoryHandle, "kind" | "name" | "getDirectoryHandle" | "getFileHandle"> {
  subFolders: string[];
  subFiles: string[];
  [key: string]: any;
}

function genMockFileSystemDirectoryHandle(directory: MockFileSystemDirectoryHandle): MockFileSystemDirectoryHandle {
  return {
    kind: "directory",
    name: directory.name || "unnamed",
    subFolders: directory.subFolders || [],
    subFiles: directory.subFiles || [],
    getDirectoryHandle(name) {
      return new Promise((resolve, reject) => {
        if (name && this.subFolders?.includes(name)) {
          resolve(this[name]);
        } else {
          reject(new Error(`Not found '${name}'`));
        }
      });
    },
    getFileHandle(name) {
      return new Promise((reslove, reject) => {
        if (name && this.subFiles.includes(name)) {
          reslove(this[name]);
        } else {
          reject(new Error(`Not found '${name}'`));
        }
      });
    },
  };
}

function recursionDirectoryTree(
  file: File,
  parent: MockFileSystemDirectoryHandle,
  path?: string
): MockFileSystemDirectoryHandle {
  path = path || file.webkitRelativePath;
  const [currpath, ...rest] = path.split("/");
  parent = parent || recursionDirectoryTree.genFakeRootDirectory();
  if (currpath === file.name) {
    parent.subFiles.push(file.name);
    parent[currpath] = genMockFileSystemFileHandle(file);
  } else {
    if (!parent.subFolders.includes(currpath)) {
      parent.subFolders.push(currpath);
    }
    parent[currpath] = parent[currpath] || recursionDirectoryTree.genFakeRootDirectory();
    parent[currpath].kind = "directory";
    parent[currpath].name = currpath;
    parent[currpath].subFolders = parent[currpath].subFolders || [];
    parent[currpath].subFiles = parent[currpath].subFiles || [];
    if (rest.length) {
      recursionDirectoryTree(file, parent[currpath], rest.join("/"));
    }
  }
  return parent;
}
recursionDirectoryTree.genFakeRootDirectory = function (dirname = "root"): MockFileSystemDirectoryHandle {
  return genMockFileSystemDirectoryHandle({ name: dirname } as MockFileSystemDirectoryHandle);
};

type AcceptMIMEType = {
  [key: string]: string[];
};
interface FileType {
  description: string;
  accept: AcceptMIMEType;
}

/**
 * 文件选择配置选项
 * @interface
 */
interface OpenFilePickerOptions {
  /**
   * 是否多选
   * @default false
   */
  multiple: boolean;
  /**
   * 是否排除所有文件类型 *.*
   * @default false
   */
  excludeAcceptAllOption: boolean;
  /** 自定义文件类型 */
  types: FileType[];
  /**
   * 尽可能使用原生方法
   * @default false
   */
  native?: boolean;
}
type showOpenFilePickFn = (options: OpenFilePickerOptions) => Promise<MockFileSystemFileHandle[]>;

// @ts-ignore
const nativeOpen: undefined | showOpenFilePickFn = self.showOpenFilePicker;
const isNativeOpenSupported = nativeOpen && isSecurity;

/**
 * 显示文件选择窗口
 * @param {OpenFilePickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemFileHandle[]>}
 */
export const showOpenFilePicker: showOpenFilePickFn = (options?: OpenFilePickerOptions) => {
  if (isNativeOpenSupported && options?.native) {
    return nativeOpen(options);
  }
  return new Promise((reslove, reject) => {
    const inputAttrs: any = {};
    if (options) {
      if (options.multiple) {
        inputAttrs.multiple = true;
      }
      const types = ([] as FileType[]).concat(options.types).filter((type) => type?.accept);
      if (!options.excludeAcceptAllOption) {
        types.unshift({
          description: "Any",
          accept: {
            any: ["*.*"],
          },
        });
      }
      if (types.length) {
        const trimReg = /^\s+|(,?\s+)$/m;
        let inputAccept = types
          .map(({ accept }) => {
            for (const mimetype in accept) {
              if (Object.prototype.hasOwnProperty.call(accept, mimetype)) {
                const exts = accept[mimetype]?.length ? accept[mimetype].join(", ").replace(trimReg, "") : "";
                return exts || mimetype;
              }
              return "";
            }
            return "";
          })
          .filter((exts) => exts)
          .join(", ");
        inputAccept = inputAccept.replace(trimReg, "");
        if (inputAccept) {
          inputAttrs.accept = inputAccept;
        }
      }
    }
    inputAttrs.onchange = () => {
      if (!input.files?.length) {
        reject(new Error("No file selected"));
      } else {
        reslove(Array.from(input.files).map((file) => genMockFileSystemFileHandle(file)));
      }
      input.remove();
    };
    const input = genInputElemToBody(inputAttrs);
    input.click();
  });
};

/**
 * 原生文件夹选择配置选项
 * @interface
 */
interface DirectoryPickerOptions {
  /** 文件夹标识 ID ，可用于下次使用同 ID 时打开句柄 */
  id?: string;
  /** 选择文件夹后的操作模式 read-只读 readwrite-读写 */
  mode?: "read" | "readwrite";
  /** 可选快捷方式或已打开的文件夹句柄 */
  startIn?: "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos" | FileSystemHandle;
  /**
   * 尽可能使用原生方法
   * @default false
   */
  native?: boolean;
}

type showDirectoryPickerFn = (options: DirectoryPickerOptions) => Promise<MockFileSystemDirectoryHandle>;

//@ts-ignore
const nativeDir: undefined | showDirectoryPickerFn = window.showDirectoryPicker;
const isNativeDirSupported = nativeDir && isSecurity;

/**
 * 显示文件选择窗口
 * @param {DirectoryPickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemDirectoryHandle[]>}
 */
export const showDirectoryPicker: showDirectoryPickerFn = (options?: DirectoryPickerOptions) => {
  if (isNativeDirSupported && options?.native) {
    return nativeDir(options);
  }
  return new Promise((reslove, reject) => {
    const inputAttrs = {
      webkitdirectory: true,
      onchange: () => {
        if (!input.files?.length) {
          reject(new Error("No directory selected"));
        } else {
          const root = recursionDirectoryTree.genFakeRootDirectory();
          Array.from(input.files).forEach((file) => {
            recursionDirectoryTree(file, root);
          });
          reslove(root);
        }
        input.remove();
      },
    };
    const input = genInputElemToBody(inputAttrs);
    if (!("webkitdirectory" in input)) {
      throw new Error(`HTMLInputElement.webkitdirectory is not supported, can't polyfill showDirectoryPicker`);
    }
    input.click();
  });
};

if (!nativeOpen) {
  (window as any).showOpenFilePicker = showOpenFilePicker;
}

if (!nativeDir) {
  (window as any).showDirectoryPicker = showDirectoryPicker;
}

/**
 * 下载文件
 * @param {string | Blob | File} target - 目标链接或文件
 * @param {string?} filename - 自定义文件名
 * @param {boolean?} newWnd - 使用新窗口打开的方式下载
 */
export function downloadFile(target: string | Blob, filename = "", newWnd = false): void | never {
  if (!target) {
    throw new Error("target is empty");
  }
  let url = "";
  if ((window.File && target instanceof window.File) || (window.Blob && target instanceof Blob)) {
    if (target instanceof window.File) {
      filename = filename || target.name || "download";
    }
    if ((window.navigator as any).msSaveOrOpenBlob) {
      return (window.navigator as any).msSaveOrOpenBlob(target, filename);
    }
    url = URL.createObjectURL(target);
  }
  if (typeof target === "string") {
    url = target;
  }
  if (!url) {
    throw new Error("Can't get the URL of target");
  }
  if (newWnd) {
    window.open(url);
  } else {
    let downloadElem: HTMLAnchorElement | HTMLIFrameElement;
    const downloadElemStyle = "position: fixed; top: 0; left: 0; z-index: -9999; width: 1px; height: 1px; opacity: 0;";
    const downloadStart = () => {
      setTimeout(() => {
        downloadElem.remove();
        if ((window.File && target instanceof window.File) || (window.Blob && target instanceof Blob)) {
          URL.revokeObjectURL(url);
        }
      }, 500);
    };
    const urlDetail = /^([^\s:]+:)?(\/\/)?([^:/&?%]+)(:(\d+))?(.*\/)?([^:/&?]*?\.\w+)?([^.]*?(\?.*)?)?$/gm.exec(url);
    const url_protocol = urlDetail?.[1] || location.protocol;
    const url_host = urlDetail?.[3] || "";
    const url_port = urlDetail?.[5] || "";
    const url_file = urlDetail?.[7] || "";
    filename = filename || url_file || "download";
    if (url_protocol === location.protocol && url_host === location.host && url_port === location.port) {
      downloadElem = document.createElement("a");
      downloadElem.href = url;
      downloadElem.download = filename;
      downloadElem.onclick = downloadStart;
    } else {
      downloadElem = document.createElement("iframe");
      const iframe = downloadElem as HTMLIFrameElement;
      iframe.onload = () => {
        const ifDom = iframe.contentDocument || iframe.contentWindow?.document;
        ifDom?.execCommand("SaveAs");
        downloadStart();
      };
    }
    downloadElem.style.cssText = downloadElemStyle;
    document.body.appendChild(downloadElem);
    if (downloadElem.tagName === "A") {
      downloadElem.click();
    } else {
      (downloadElem as HTMLIFrameElement).src = url;
    }
  }
}

export const FileSystemUtils = {
  showOpenFilePicker,
  showDirectoryPicker,
  downloadFile,
};

// For more advanced polyfill usage, see https://github.com/jimmywarting/native-file-system-adapter
// https://github.com/eligrey/FileSaver.js
