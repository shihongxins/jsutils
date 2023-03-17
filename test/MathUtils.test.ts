import { MathUtils } from "../src/MathUtils";

describe("MathUtils", () => {
  test("isNumberInRange", () => {
    expect(MathUtils.isNumberInRange(5, 0, 5)).toBeFalsy();
    expect(MathUtils.isNumberInRange(5, 0, 10)).toBeTruthy();
    expect(MathUtils.isNumberInRange(5, 0, 5, true)).toBeTruthy();
  });
});
