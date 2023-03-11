interface UserResponseData<T> extends Error {
  status?: number;
  statusText?: string;
  code?: number;
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
export function validateResponseCode(
  response: UserResponseData<any>,
  code: number | number[] = [],
  includeStatus = false
): boolean {
  return [NaN]
    .concat(code)
    .filter((c) => !isNaN(c))
    .includes(response.code || (includeStatus && response.status) || NaN);
}

/**
 * 获取响应数据的 message
 * @param response 响应数据
 * @param maxLen 限制最大长度
 * @returns
 */
export function getResponseMessage(response: UserResponseData<any>, maxLen: undefined | number): string {
  return String((response && (response.msg || response.statusText || response.message)) || response).slice(0, maxLen);
}

export const NetworkUtils = {
  validateResponseCode,
  getResponseMessage,
};
