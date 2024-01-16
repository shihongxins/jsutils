/**
 * 颜色字符串 rgb 转 16 进制
 * @param color rgb 或者 rgba 格式的颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
declare function rgb2hex(color?: string, alpha?: number): void | string;
/**
 * 颜色字符串 16 进制转 rgb
 * @param color 16 进制颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
declare function hex2rgb(color?: string, alpha?: number, alphaFixed?: number): void | string;
declare const ColorUtils: {
    rgb2hex: typeof rgb2hex;
    hex2rgb: typeof hex2rgb;
};

type allowDateType = Date | string | number;
/**
 * 解析日期或时间为数值
 * @param datetime 时间
 * @returns
 */
declare function parseDateOrTime(datetime: allowDateType): number;
/**
 * 原生时间日期格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
declare function nativeFormat(datetime?: allowDateType, format?: string): string;
/**
 * 封装的 dayjs 时间格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
declare function dayjsFormat(datetime?: allowDateType, format?: string): string;
/**
 * 格式化时间段
 * @param from 开始时间
 * @param to 结束时间
 * @param format 格式
 * @param pad0 是否填0
 * @returns
 */
declare function durationFormat(from?: allowDateType, to?: allowDateType, format?: string, pad0?: boolean): string;
declare const DateUtils: {
    parseDateOrTime: typeof parseDateOrTime;
    nativeFormat: typeof nativeFormat;
    dayjsFormat: typeof dayjsFormat;
    durationFormat: typeof durationFormat;
};

/**
 * 当前页面文档是否处于全屏模式
 */
declare function isDocumentInFullscreenMode(): boolean;
/**
 * 切换元素的全屏模式
 * @param target 要全屏的目标元素
 * @param options 全屏选项
 * @returns
 */
declare function toggleElementFullscreen(target: Element, options?: FullscreenOptions): Promise<unknown>;
/**
 * 元素注册横向滚动事件，可注册为 Vue 指令
 * @param target - 目标元素
 * @param {object} options - 配置选项
 * @param {boolean} options.altKey - 按住 alt 键时横向滚动生效
 * @param {boolean} options.force - 强制横向滚动生效
 */
declare function listenElementHorizontalScrolling(target: HTMLElement, options?: {
    altkey: boolean;
    force: boolean;
}): void;
/**
 * 获取元素样式属性值
 * @param propName 属性名
 * @returns 属性值
 */
declare function getElementStyleProp(target?: Element, propName?: string): void | string;
declare const ElementUtils: {
    isDocumentInFullscreenMode: typeof isDocumentInFullscreenMode;
    toggleElementFullscreen: typeof toggleElementFullscreen;
    listenElementHorizontalScrolling: typeof listenElementHorizontalScrolling;
    getElementStyleProp: typeof getElementStyleProp;
};

interface IE8CustomEvent extends Event {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
}
interface IE8Document extends Document {
    createEventObject?(): IE8CustomEvent;
    fireEvent?: (type: string, event: Event) => void;
}
/**
 * 创建自定义事件
 * @param type 事件类型
 * @param bubbles 是否冒泡
 * @param cancelable 能否被取消
 * @returns
 */
declare function createCustomEvent(type?: string, bubbles?: boolean, cancelable?: boolean): never | void | Event;
/**
 * 触发自定义事件
 * @param event 目标事件
 * @param target 事件对象
 */
declare function dispatchCustomEvent(event: Event, target?: Window | IE8Document | Element): never | void;
declare const EventUtils: {
    createCustomEvent: typeof createCustomEvent;
    dispatchCustomEvent: typeof dispatchCustomEvent;
};

type MockFileSystemFileHandle = FileSystemFileHandle & {
    isSameEntry?(other: FileSystemFileHandle): Promise<boolean>;
    createWritable?(options?: {
        keepExistingData: boolean;
    } | undefined): Promise<any>;
};
interface MockFileSystemDirectoryHandle extends Pick<FileSystemDirectoryHandle, "kind" | "name" | "getDirectoryHandle" | "getFileHandle"> {
    subFolders: string[];
    subFiles: string[];
    [key: string]: any;
}
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
/**
 * 显示文件选择窗口
 * @param {OpenFilePickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemFileHandle[]>}
 */
declare const showOpenFilePicker: showOpenFilePickFn;
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
/**
 * 显示文件选择窗口
 * @param {DirectoryPickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemDirectoryHandle[]>}
 */
declare const showDirectoryPicker: showDirectoryPickerFn;
/**
 * 下载文件
 * @param {string | Blob | File} target - 目标链接或文件
 * @param {string?} filename - 自定义文件名
 * @param {boolean?} newWnd - 使用新窗口打开的方式下载
 */
declare function downloadFile(target: string | Blob, filename?: string, newWnd?: boolean): void | never;
declare const FileSystemUtils: {
    showOpenFilePicker: showOpenFilePickFn;
    showDirectoryPicker: showDirectoryPickerFn;
    downloadFile: typeof downloadFile;
};

declare class ListLoop<T> {
    list: T[];
    count: number;
    index: number;
    constructor(list?: T[], count?: number, index?: number);
    get total(): number;
    lastRound(): number;
    nextRound(): number;
    get currentRoundList(): T[];
}

/**
 * 判断数值是否在输入的范围
 * @param num 目标数值
 * @param min 范围最小值
 * @param max 范围最大值
 * @param equal 是否包含等于最值
 * @returns
 */
declare function isNumberInRange(num: number, min: number, max: number, equal?: boolean): boolean;
declare const MathUtils: {
    isNumberInRange: typeof isNumberInRange;
};

interface UserResponseData<T> {
    status?: number;
    statusText?: string;
    code?: number;
    message?: string;
    data?: T;
    msg?: string;
}
/**
 * 校验响应数据是否为期望状态码
 * @param response 响应数据
 * @param code 期望状态码
 * @param includeStatus 是否包含校验 status
 * @returns
 */
declare function validateResponseCode(response: UserResponseData<any>, code?: number | number[], includeStatus?: boolean): boolean;
/**
 * 获取响应数据的 message
 * @param response 响应数据
 * @param maxLen 限制最大长度
 * @returns
 */
declare function getResponseMessage(response: UserResponseData<any>, maxLen?: undefined | number): string;
declare const NetworkUtils: {
    validateResponseCode: typeof validateResponseCode;
    getResponseMessage: typeof getResponseMessage;
};

/**
 * 合并对象共有的属性
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的目标对象
 */
declare function assignCommonProperty(target: object, ...sources: (object | null | undefined)[]): object;
declare const ObjectUtils: {
    assignCommonProperty: typeof assignCommonProperty;
};

interface PasswordStrengthRules {
    minNumber?: number;
    minLowerCase?: number;
    minUpperCase?: number;
    minSpecialChar?: number;
    minLength?: number;
    maxLength?: number;
    maxSequencingSubStringLength?: number;
    maxContinousRepeatedCharsCount?: number;
    allowedSpecialChars?: string | Array<string>;
    pattern?: string | RegExp;
}
type PasswordStrengthCheckItemResult = -1 | 0 | 1;
type PasswordStrengthCheckItem = {
    [key in keyof PasswordStrengthRules]: PasswordStrengthCheckItemResult;
};
interface PasswordStrengthResult {
    checked: number;
    passed: number;
    failed: number;
    detail: {
        password: string;
        internalPassword: string;
        rules?: PasswordStrengthRules;
        internalRules: PasswordStrengthRules;
        checkItems: PasswordStrengthCheckItem;
    };
}
/**
 * @description 根据范围获取 ASII 字符数组
 * @param start
 * @param end
 * @default (33, 33) => ['!']
 * @returns
 */
declare function getASCIICharsInRange(start?: number, end?: number): string[];
/**
 * @description 是否是顺续规则字符串
 * @param string
 * @param step
 * @default ("", 1) => true
 * @returns
 */
declare function isSequencingString(string?: string, step?: number): boolean;
/**
 * @description 是否有顺续规则字符串
 * @todo TODO: 这里算法有问题，应使用其他算法
 * @param string
 * @param length
 * @default ("", 2) => false
 * @returns
 */
declare function hasSequencingSubString(string?: string, length?: number): boolean;
/**
 * 是否有连续重复的字符串
 * @param string 被检测字符串
 * @param length 重复次数
 * @default ("", 2) => false
 * @returns
 */
declare function hasContinousRepeatedChars(string?: string, repeat?: number): boolean;
/**
 * @description 密码强度校验
 * @notice 在规则和结果中，falsy 值（ 0, undefined, null, false, '' ）等表示不做/未做检查； -1 表示检查失败； 1 表示检查通过；
 * @author shihongxins
 * @param password 密码
 * @param rules 校验规则
 * @returns 校验结果
 */
declare function passwordStrengthInspector(password: string, rules?: PasswordStrengthRules): PasswordStrengthResult;

declare const StringUtils_d_getASCIICharsInRange: typeof getASCIICharsInRange;
declare const StringUtils_d_hasContinousRepeatedChars: typeof hasContinousRepeatedChars;
declare const StringUtils_d_hasSequencingSubString: typeof hasSequencingSubString;
declare const StringUtils_d_isSequencingString: typeof isSequencingString;
declare const StringUtils_d_passwordStrengthInspector: typeof passwordStrengthInspector;
declare namespace StringUtils_d {
  export { StringUtils_d_getASCIICharsInRange as getASCIICharsInRange, StringUtils_d_hasContinousRepeatedChars as hasContinousRepeatedChars, StringUtils_d_hasSequencingSubString as hasSequencingSubString, StringUtils_d_isSequencingString as isSequencingString, StringUtils_d_passwordStrengthInspector as passwordStrengthInspector };
}

export { ColorUtils, DateUtils, ElementUtils, EventUtils, FileSystemUtils, ListLoop, MathUtils, NetworkUtils, ObjectUtils, StringUtils_d as StringUtils, assignCommonProperty, createCustomEvent, dayjsFormat, dispatchCustomEvent, downloadFile, durationFormat, getElementStyleProp, getResponseMessage, hex2rgb, isDocumentInFullscreenMode, isNumberInRange, listenElementHorizontalScrolling, nativeFormat, rgb2hex, showDirectoryPicker, showOpenFilePicker, toggleElementFullscreen, validateResponseCode };
