/**
 * 判断数值是否在输入的范围
 * @param num 目标数值
 * @param min 范围最小值
 * @param max 范围最大值
 * @param equal 是否包含等于最值
 * @returns
 */
export declare function isNumberInRange(num: number, min: number, max: number, equal?: boolean): boolean;
export declare const MathUtils: {
    isNumberInRange: typeof isNumberInRange;
};
