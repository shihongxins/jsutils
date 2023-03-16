/**
 * @jest-environment jsdom
 */

import { ElementUtils } from "../src/ElementUtils";

describe("ElementUtils", () => {
  test("isDocumentInFullscreenMode", () => {
    expect(ElementUtils.isDocumentInFullscreenMode()).toBeFalsy();
  });
});
