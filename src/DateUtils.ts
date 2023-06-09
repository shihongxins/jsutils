import dayjs from "dayjs";

type allowDateType = Date | string | number;

/**
 * 解析日期或时间为数值
 * @param datetime 时间
 * @returns
 */
export function parseDateOrTime(datetime: allowDateType): number {
  const reg_time = /^\d{2}:\d{2}.+$/m;
  let d = NaN;
  let needTimeOffset = false;
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
  if (typeof datetime === "string") {
    if (/^\d+-\d+-\d+$/.test(datetime)) {
      needTimeOffset = true;
      datetime = datetime.replace(/-/g, "/");
    }
    d = Date.parse(datetime);
    if (needTimeOffset) {
      d -= timeOffset;
    }
    // HH:mm:ss
    if (!d && reg_time.test(datetime)) {
      const now = new Date();
      d = Date.parse(`${nativeFormat(now, `YYYY-MM-DDT${datetime}.sss`)}`);
    }
  }
  return Date.parse(new Date(d || datetime).toISOString());
}

/**
 * 原生时间日期格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
export function nativeFormat(datetime: allowDateType = new Date(), format = "YYYY-MM-DD HH:mm:ss"): string {
  const _d: Date = new Date(parseDateOrTime(datetime));
  return format.replace(
    /(Y{4})|(M{2})|(D{2})|(H{2})|(m{2})|(s{3})|(s{2})/gm,
    function (match, fyear, fmonth, fdate, fhour, fmin, fmsec, fsec) {
      if (fyear) return _d.getFullYear().toString();
      if (fmonth) return ("00" + (_d.getMonth() + 1).toString()).slice(-2);
      if (fdate) return ("00" + _d.getDate().toString()).slice(-2);
      if (fhour) return ("00" + _d.getHours().toString()).slice(-2);
      if (fmin) return ("00" + _d.getMinutes().toString()).slice(-2);
      if (fmsec) return _d.getMilliseconds().toString();
      if (fsec) return ("00" + _d.getSeconds().toString()).slice(-2);
      return "";
    }
  );
}

/**
 * 封装的 dayjs 时间格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
export function dayjsFormat(datetime: allowDateType = new Date(), format = "YYYY-MM-DD HH:mm:ss"): string {
  return dayjs(parseDateOrTime(datetime) || "").format(format);
}

/**
 * 格式化时间段
 * @param from 开始时间
 * @param to 结束时间
 * @param format 格式
 * @param pad0 是否填0
 * @returns
 */
export function durationFormat(
  from: allowDateType = new Date(),
  to: allowDateType = new Date(),
  format = "HH hours mm mins ss secs sss ms",
  pad0 = true
): string {
  const _f = new Date(parseDateOrTime(from));
  const _t = new Date(parseDateOrTime(to));

  const duration = _t.valueOf() - _f.valueOf();
  const msecs = duration % 1000;
  const secs = Math.floor(duration / 1000) % 60;
  const mins = Math.floor(duration / 1000 / 60) % 60;
  const hours = Math.floor(duration / 1000 / 60 / 60) % 24;
  const days = Math.floor(duration / 1000 / 60 / 60 / 24);

  return format.replace(/(d)|(H{2})|(m{2})|(s{3})|(s{2})/gm, function (match, fday, fhour, fmin, fmsec, fsec) {
    let tem = "";
    if (fday) {
      tem += days;
    }
    if (fhour) {
      tem += hours;
    }
    if (fmin) {
      tem += mins;
    }
    if (fmsec) {
      tem += msecs;
    }
    if (fsec) {
      tem += secs;
    }
    if (pad0 && (fhour || fmin || fsec)) {
      tem = ("00" + tem).slice(-2);
    }
    return tem;
  });
}

export const DateUtils = {
  parseDateOrTime,
  nativeFormat,
  dayjsFormat,
  durationFormat,
};
