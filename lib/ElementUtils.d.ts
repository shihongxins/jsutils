/**
 * 当前页面文档是否处于全屏模式
 */
export declare function isDocumentInFullscreenMode(): boolean;
/**
 * 切换元素的全屏模式
 * @param target 要全屏的目标元素
 * @param options 全屏选项
 * @returns
 */
export declare function toggleElementFullscreen(target: Element, options: FullscreenOptions): Promise<unknown>;
/**
 * 元素注册横向滚动事件，可注册为 Vue 指令
 * @param target - 目标元素
 * @param {object} options - 配置选项
 * @param {boolean} options.altKey - 按住 alt 键时横向滚动生效
 * @param {boolean} options.force - 强制横向滚动生效
 */
export declare function listenElementHorizontalScrolling(target: HTMLElement, options?: {
    altkey: boolean;
    force: boolean;
}): void;
/**
 * 获取元素样式属性值
 * @param propName 属性名
 * @returns 属性值
 */
export declare function getElementStyleProp(target?: Element, propName?: string): void | string;
export declare const ElementUtils: {
    isDocumentInFullscreenMode: typeof isDocumentInFullscreenMode;
    toggleElementFullscreen: typeof toggleElementFullscreen;
    listenElementHorizontalScrolling: typeof listenElementHorizontalScrolling;
    getElementStyleProp: typeof getElementStyleProp;
};
