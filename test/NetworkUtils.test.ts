import { NetworkUtils } from "../src/NetworkUtils";

describe("NetworkUtils", () => {
  const successResData = {
    code: 200,
    data: [],
    msg: "Success",
  };
  const failResData = {
    code: 100,
    data: null,
    msg: "Fail, throw an error from Database",
  };
  const successResponse = new Response(JSON.stringify(successResData), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const failResponse = new Response(JSON.stringify(failResData), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const noResponse = new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
  const error = new Error("Error message");

  test("validateResponseCode", () => {
    expect(NetworkUtils.validateResponseCode(successResponse)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(successResponse, 200)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(successResponse, 200, true)).toBeTruthy();

    expect(NetworkUtils.validateResponseCode(successResData)).toBeTruthy();
    expect(NetworkUtils.validateResponseCode(successResData, 201)).toBeFalsy();

    expect(NetworkUtils.validateResponseCode(failResponse)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(failResponse, 200)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(failResponse, 200, true)).toBeTruthy();

    expect(NetworkUtils.validateResponseCode(failResData)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(failResData, 100)).toBeTruthy();

    expect(NetworkUtils.validateResponseCode(noResponse)).toBeFalsy();
    expect(NetworkUtils.validateResponseCode(noResponse, 404)).toBeFalsy();
  });

  test("getResponseMessage", () => {
    expect(NetworkUtils.getResponseMessage(successResponse)).toBe(successResponse.statusText);
    expect(NetworkUtils.getResponseMessage(successResData)).toBe(successResData.msg);

    expect(NetworkUtils.getResponseMessage(failResponse)).toBe(failResponse.statusText);
    expect(NetworkUtils.getResponseMessage(failResData)).toBe(failResData.msg);

    expect(NetworkUtils.getResponseMessage(noResponse)).toBe(noResponse.statusText);
    expect(NetworkUtils.getResponseMessage(error)).toBe(error.message);
  });
});
