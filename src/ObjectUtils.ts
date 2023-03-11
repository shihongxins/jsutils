/**
 * 合并对象共有的属性
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的目标对象
 */
export function assignCommonProperty(target = {}, source = {}) {
  if (!(target instanceof Object && source instanceof Object)) {
    throw new Error(`arguments must be object.`);
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      (target as any)[key] = (source as any)[key];
    }
  }
  return target;
}

export const ObjectUtils = {
  assignCommonProperty,
};
