/**
 * 颜色字符串 rgb 转 16 进制
 * @param color rgb 或者 rgba 格式的颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
export declare function rgb2hex(color?: string, alpha?: number): void | string;
/**
 * 颜色字符串 16 进制转 rgb
 * @param color 16 进制颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
export declare function hex2rgb(color?: string, alpha?: number): void | string;
export declare const ColorUtils: {
    rgb2hex: typeof rgb2hex;
    hex2rgb: typeof hex2rgb;
};
