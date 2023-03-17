import { ListLoop } from "../src/ListLoop";

describe("ListLoop", () => {
  test("ListLoop", () => {
    const list = Array(5)
      .fill(null)
      .map((v, i) => `Item ${i + 1}`);
    const lp = new ListLoop(list, 2);
    expect(lp.total).toBe(list.length);
    expect(lp.count).toBe(2);
    expect(lp.index).toBe(0);
    expect(lp.currentRoundList).toEqual(list.slice(0, 2));
    lp.nextRound();
    expect(lp.currentRoundList).toEqual(list.slice(2, 4));
    lp.nextRound();
    expect(lp.currentRoundList).toEqual([list[4], list[0]]);
    lp.lastRound();
    expect(lp.currentRoundList).toEqual(list.slice(2, 4));
  });
});
