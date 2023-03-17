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
export declare function validateResponseCode(response: UserResponseData<any>, code?: number | number[], includeStatus?: boolean): boolean;
/**
 * 获取响应数据的 message
 * @param response 响应数据
 * @param maxLen 限制最大长度
 * @returns
 */
export declare function getResponseMessage(response: UserResponseData<any>, maxLen?: undefined | number): string;
export declare const NetworkUtils: {
    validateResponseCode: typeof validateResponseCode;
    getResponseMessage: typeof getResponseMessage;
};
export {};
