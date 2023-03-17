/**
 * @jest-environment jsdom
 */

import { EventUtils } from "../src/EventUtils";

describe("EventUtils", () => {
  let resize: Event;
  test("createCustomEvent", () => {
    const e = EventUtils.createCustomEvent("resize");
    if (e) resize = e;
    expect(resize).toBeDefined();
    expect(resize?.type).toBe("resize");
  });
  test("dispatchCustomEvent ", (done) => {
    window.addEventListener("resize", () => {
      console.log("window resize");
      done();
    });
    EventUtils.dispatchCustomEvent(resize);
  });
});
