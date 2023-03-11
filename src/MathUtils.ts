/**
 * 判断数值是否在输入的范围
 * @param num 目标数值
 * @param min 范围最小值
 * @param max 范围最大值
 * @param equal 是否包含等于最值
 * @returns
 */
export function isNumberInRange(num: number, min: number, max: number, equal = false): boolean {
  if (max < min) {
    [min, max] = [max, min];
  }
  return equal ? min <= num && num <= max : min < num && num < max;
}

export const MathUtils = {
  isNumberInRange,
};
