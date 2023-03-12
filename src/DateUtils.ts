import dayjs from "dayjs";

type allowDateType = Date | string | number;

/**
 * 原生时间日期格式化
 * @param date 时间
 * @param format 格式
 * @returns
 */
export function nativeFormat(date: allowDateType = new Date(), format = "YYYY-MM-DD HH:mm:ss"): string {
  const _d = new Date(date);
  return format.replace(
    /(Y{4})(M{2})(D{2})(H{2})(m{2})(s{3})(s{2})/gm,
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
 * @param date 时间
 * @param format 格式
 * @returns
 */
export function dayjsFormat(date: allowDateType = new Date(), format = "YYYY-MM-DD HH:mm:ss"): string {
  return dayjs(date || "").format(format);
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
  format = "HH:mm:ss.sss",
  pad0 = true
): string {
  const _f = from instanceof Date ? from : new Date(format);
  const _t = to instanceof Date ? to : new Date(to);

  const duration = _t.valueOf() - _f.valueOf();
  const days = Math.floor((duration / 1000) * 60 * 60 * 24);
  const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor(((duration % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor(((duration % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60));
  const msecs = Math.floor(duration % 1000);

  return format.replace(/(d)(H{2})(M{2})(s{3})(s{2})/gm, function (match, fday, fhour, fmin, fsec, fmsec) {
    let tem = "";
    if (fday) return (tem += days);
    if (fhour) return (tem += hours);
    if (fmin) return (tem += mins);
    if (fmsec) return (tem += msecs);
    if (fsec) return (tem += secs);
    if (pad0 && (fhour || fmin || fsec)) {
      tem = ("00" + tem).slice(-2);
    }
    return tem;
  });
}

export const DateUtils = {
  nativeFormat,
  dayjsFormat,
  durationFormat,
};
