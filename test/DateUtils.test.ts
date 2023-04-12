import dayjs from "dayjs";
import { DateUtils } from "../src/DateUtils";

describe("DateUtils", () => {
  const datestr = "2022-03-12";
  const timestr = "18:19:03";

  test("parseDateOrTime", () => {
    expect(DateUtils.parseDateOrTime(datestr)).toBe(Date.parse(datestr));
    expect(DateUtils.parseDateOrTime(datestr + " " + timestr)).toBe(Date.parse(datestr + " " + timestr));
    expect(
      new Date(dayjs().format("YYYY-MM-DD 00:00:00")).getTime() + 6000 - DateUtils.parseDateOrTime("00:00:06")
    ).toBeLessThan(100);
  });
  test("nativeFormat", () => {
    expect(DateUtils.nativeFormat(new Date(datestr), "YYYY-MM-DD")).toBe(datestr);
    expect(DateUtils.nativeFormat(timestr, "HH:mm:ss")).toBe(timestr);
    expect(DateUtils.nativeFormat(datestr + " " + timestr)).toBe(datestr + " " + timestr);
  });
  test("dayjsFormat ", () => {
    expect(DateUtils.dayjsFormat(new Date(datestr), "YYYY-MM-DD")).toBe(datestr);
    expect(DateUtils.dayjsFormat(timestr, "HH:mm:ss")).toBe(timestr);
    expect(DateUtils.dayjsFormat(datestr + " " + timestr)).toBe(datestr + " " + timestr);
  });
  test("durationFormat", () => {
    expect(DateUtils.durationFormat(datestr + " " + timestr, "2023-03-12 19:23:56", "d 天 HH 小时 mm 分钟 ss 秒")).toBe(
      "365 天 1 小时 4 分钟 53 秒"
    );
    expect(
      DateUtils.durationFormat(dayjs().toDate(), dayjs().add(1, "month").toDate(), "d 天 HH 小时 mm 分钟 ss 秒")
    ).toBe(`${dayjs().daysInMonth()} 天 0 小时 0 分钟 0 秒`);
    expect(
      DateUtils.durationFormat(
        dayjs().add(1, "hour").toDate(),
        dayjs().add(2, "year").subtract(1, "month").toDate(),
        "d 天 HH 小时 mm 分钟 ss 秒 sss 毫秒"
      )
    ).toBe(`${365 * 2 - dayjs().subtract(1, "month").daysInMonth()} 天 23 小时 0 分钟 0 秒 0 毫秒`);
  });
});
