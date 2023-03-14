import { ColorUtils } from "../src/ColorUtils";

describe("ColorUtils", () => {
  test("rgb2hex", () => {
    expect(ColorUtils.rgb2hex("rgb(255, 0, 0)")).toBe("#ff0000");
  });
  test("rgb2hex", () => {
    expect(ColorUtils.rgb2hex("rgba(64, 158, 255, 0.5)")).toBe("#409eff80");
  });

  test("hex2rgb", () => {
    expect(ColorUtils.hex2rgb("#409eff")).toBe("rgb(64, 158, 255)");
  });
  test("hex2rgb", () => {
    expect(ColorUtils.hex2rgb("#409eff80")).toBe("rgba(64, 158, 255, 0.5)");
  });
});
