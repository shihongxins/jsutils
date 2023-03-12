type allowDateType = Date | string | number;
/**
 * 原生时间日期格式化
 * @param date 时间
 * @param format 格式
 * @returns
 */
export declare function nativeFormat(date?: allowDateType, format?: string): string;
/**
 * 封装的 dayjs 时间格式化
 * @param date 时间
 * @param format 格式
 * @returns
 */
export declare function dayjsFormat(date?: allowDateType, format?: string): string;
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
    nativeFormat: typeof nativeFormat;
    dayjsFormat: typeof dayjsFormat;
    durationFormat: typeof durationFormat;
};
export {};
