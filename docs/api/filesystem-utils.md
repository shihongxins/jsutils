---
layout: doc
---

# FileSystemUtils API

## showOpenFilePicker() {#showOpenFilePicker}

Show open file picker dialog.

- **type:** `function`

  ```ts
  type showOpenFilePickFn = (options: OpenFilePickerOptions) => Promise<MockFileSystemFileHandle[]>;
  ```

- **example**

  ```ts
  import { FileSystemUtils } from "@shihongxins/utils";
  FileSystemUtils.showOpenFilePicker({
    multiple: true,
    excludeAcceptAllOption: true,
    types: [
      {
        description: "Media",
        accept: {
          "image/*": [".png", ".jpg", ".jpeg", ".gif", ".apng", ".webp"],
          "audio/*": [".mp3", ".flac"],
        }
      }
      {
        description: "Text",
        accept: {
          "text/*": [".txt"],
          "html/*": [".html", ".htm", ".xhtml", ".xml"],
        }
      }
    ]
  });
  ```

## showDirectoryPicker() {#showDirectoryPicker}

Show open directory picker dialog.

- **type:** `function`

  ```ts
  type showDirectoryPickerFn = (options: DirectoryPickerOptions) => Promise<MockFileSystemDirectoryHandle>;
  ```

- **example**

  ```ts
  import { FileSystemUtils } from "@shihongxins/utils";
  FileSystemUtils.showDirectoryPickerFn({
    mode: "read",
    startIn: "desktop",
    native: true,
  });
  ```

## downloadFile() {#downloadFile}

Download a file by File or URL.

- **type:** `function`

  ```ts
  function downloadFile(target: string | Blob, filename?: string, newWnd?: boolean): void | never;
  ```

- **example**

  ```ts
  import { FileSystemUtils } from "@shihongxins/utils";
  const txt = new Blob(["Hello world"], { type: "text/plain" });
  FileSystemUtils.downloadFile(txt, "hi.txt");
  ```
