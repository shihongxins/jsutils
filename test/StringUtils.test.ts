import StringUtils from "../src/StringUtils";

describe("StringUtils", () => {
  test("getASCIICharsInRange", () => {
    expect(StringUtils.getASCIICharsInRange(48, 57).join("")).toBe("0123456789");
  });
  test("hasContinousRepeatedChars", () => {
    expect(StringUtils.hasContinousRepeatedChars("abc666")).toBe(true);
    expect(StringUtils.hasContinousRepeatedChars("abc666", 4)).toBe(false);
    expect(StringUtils.hasContinousRepeatedChars("aabb1122")).toBe(true);
    expect(StringUtils.hasContinousRepeatedChars("aabb1122", 3)).toBe(false);
  });
  test("hasSequencingSubString", () => {
    expect(StringUtils.hasSequencingSubString("Abc")).toBe(true);
    expect(StringUtils.hasSequencingSubString("Abc", 3)).toBe(false);
    expect(StringUtils.hasSequencingSubString("Abcde", 4)).toBe(true);
    expect(StringUtils.hasSequencingSubString("aa123")).toBe(true);
  });
  test("isSequencingString ", () => {
    expect(StringUtils.isSequencingString("0123")).toBe(true);
    expect(StringUtils.isSequencingString("dcba", -1)).toBe(true);
    expect(StringUtils.isSequencingString("Abcd")).toBe(false);
  });
  test("passwordStrengthInspector", () => {
    expect(StringUtils.passwordStrengthInspector("test1234").detail.checkItems.maxSequencingSubStringLength).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("test8888").detail.checkItems.maxContinousRepeatedCharsCount).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("test666").detail.checkItems.maxContinousRepeatedCharsCount).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("test9527").detail.checkItems.minUpperCase).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("test9527").detail.checkItems.minSpecialChar).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("test9527@").detail.checkItems.minUpperCase).toBe(-1);
    expect(StringUtils.passwordStrengthInspector("Test9527@").failed).toBe(0);
  });
});
