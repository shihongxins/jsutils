interface NonStandardFullscreenAPI extends Document {
  webkitFullscreenEnabled?: boolean;
  mozFullScreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;

  webkitRequestFullscreen?: (options: FullscreenOptions) => Promise<void>;
  mozRequestFullScreen?: (options: FullscreenOptions) => Promise<void>;
  msRequestFullscreen?: (options: FullscreenOptions) => Promise<void>;

  webkitExitFullscreen?: () => Promise<void>;
  mozExitFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;

  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;

  webkitIsFullScreen?: boolean;
  mozFullScreen?: boolean;
  msIsFullScreen?: boolean;
}

const doc: NonStandardFullscreenAPI = document;
const rootElem = document.documentElement || document.body;
const fullscreenEnabled =
  doc.fullscreenEnabled || doc.webkitFullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled;
const requestFullscreen =
  rootElem.requestFullscreen || doc.webkitRequestFullscreen || doc.mozRequestFullScreen || doc.msRequestFullscreen;
const exitFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozExitFullScreen || doc.msExitFullscreen;

/**
 * 当前页面文档是否处于全屏模式
 */
export function isDocumentInFullscreenMode(): boolean {
  return Boolean(
    doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      doc.fullscreen ||
      doc.webkitIsFullScreen ||
      doc.mozFullScreen ||
      doc.msIsFullScreen
  );
}

/**
 * 切换元素的全屏模式
 * @param target 要全屏的目标元素
 * @param options 全屏选项
 * @returns
 */
export function toggleElementFullscreen(target: Element, options: FullscreenOptions) {
  return new Promise((resolve, reject) => {
    if (!fullscreenEnabled) {
      reject(new Error("This browser is not support fullscreen."));
    }
    if (!requestFullscreen) {
      reject(new Error("The element is not support fullscreen"));
    }
    if (isDocumentInFullscreenMode()) {
      resolve(exitFullscreen());
    } else {
      resolve(requestFullscreen.call(target, options));
    }
  });
}

/**
 * 元素注册横向滚动事件，可注册为 Vue 指令
 * @param target - 目标元素
 * @param {object} options - 配置选项
 * @param {boolean} options.altKey - 按住 alt 键时横向滚动生效
 * @param {boolean} options.force - 强制横向滚动生效
 */
export function listenElementHorizontalScrolling(
  target: HTMLElement,
  options: { altkey: boolean; force: boolean } = { altkey: true, force: false }
): void {
  target.addEventListener("wheel", (e) => {
    const event = e || window.event;
    if (
      event &&
      event.target === target &&
      (target.offsetHeight >= target.scrollHeight || options.altkey === event.altKey || options.force)
    ) {
      event.preventDefault();
      event.stopPropagation();
      target.scrollLeft += event.deltaY;
    }
  });
}

/**
 * 获取元素样式属性值
 * @param propName 属性名
 * @returns 属性值
 */
export function getElementStyleProp(target: Element = document.documentElement, propName = ""): void | string {
  if (!(target && propName)) {
    return;
  }
  return getComputedStyle(target).getPropertyValue(propName).trim();
}

export const ElementUtils = {
  isDocumentInFullscreenMode,
  toggleElementFullscreen,
  listenElementHorizontalScrolling,
  getElementStyleProp,
};
