import { ObjectUtils } from "../src/ObjectUtils";

describe("ObjectUtils", () => {
  let target: object, source: object;
  beforeEach(() => {
    target = {
      a: "1",
      b: "2",
      c: {
        d: "3",
      },
      e: "4",
      f: null,
    };
    source = {
      a: 1,
      b: null,
      c: {
        d: 3,
      },
      get e() {
        return 4;
      },
    };
  });

  test("assignCommonProperty", () => {
    expect(ObjectUtils.assignCommonProperty(target, source)).toEqual(Object.assign({}, target, source));
  });
});
