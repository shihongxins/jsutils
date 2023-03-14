type allowDateType = Date | string | number;
/**
 * 解析日期或时间为数值
 * @param datetime 时间
 * @returns
 */
export declare function parseDateOrTime(datetime: allowDateType): number;
/**
 * 原生时间日期格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
export declare function nativeFormat(datetime?: allowDateType, format?: string): string;
/**
 * 封装的 dayjs 时间格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
export declare function dayjsFormat(datetime?: allowDateType, format?: string): string;
/**
 * 格式化时间段
 * @param from 开始时间
 * @param to 结束时间
 * @param format 格式
 * @param pad0 是否填0
 * @returns
 */
export declare function durationFormat(from?: allowDateType, to?: allowDateType, format?: string, pad0?: boolean): string;
export declare const DateUtils: {
    parseDateOrTime: typeof parseDateOrTime;
    nativeFormat: typeof nativeFormat;
    dayjsFormat: typeof dayjsFormat;
    durationFormat: typeof durationFormat;
};
export {};
