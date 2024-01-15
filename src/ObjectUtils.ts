/**
 * 合并对象共有的属性
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的目标对象
 */
export function assignCommonProperty(target: object, ...sources: (object | null | undefined)[]) {
  if (!(target && target instanceof Object)) {
    throw new TypeError(`Cannot convert undefined or null to object`);
  }
  const sourceList = ([] as object[])
    .concat(sources)
    .filter((sourceItem) => sourceItem !== null && sourceItem !== undefined);
  for (const key in target) {
    sourceList.forEach((sourceItem) => {
      if (
        Object.prototype.hasOwnProperty.call(target, key) &&
        sourceItem &&
        Object.prototype.hasOwnProperty.call(sourceItem, key)
      ) {
        (target as any)[key] = (sourceItem as any)[key];
      }
    });
  }
  return target;
}

export const ObjectUtils = {
  assignCommonProperty,
};
