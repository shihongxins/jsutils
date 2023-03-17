/**
 * 合并对象共有的属性
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的目标对象
 */
export declare function assignCommonProperty(target: object, source: object, fromSourceStrictly?: undefined | boolean): object;
export declare const ObjectUtils: {
    assignCommonProperty: typeof assignCommonProperty;
};
