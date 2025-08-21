/**
 * isValidDate
 *
 * 전달된 Date 객체가 유효한 날짜인지 검사합니다.
 *
 * @param date  검사할 Date 객체
 * @returns     유효한 날짜면 true, 잘못된 날짜면 false
 */
export const isValidDate = (date: Date): boolean => !isNaN(+date);

/**
 * formatDateTime
 *
 *
 * Date 객체를 문자열로 변환합니다.
 * 옵션으로 시/분/초 표시 여부를 제어할 수 있습니다.
 *
 * @param date   변환할 Date 객체
 * @param opts   옵션 (기본값: { hour: true, minute: true, second: true })
 * @returns      포맷된 날짜 문자열, 유효하지 않으면 "Invalid Date"
 */
export const formatDate = (
  date: Date,
  opts: { hour?: boolean; minute?: boolean; second?: boolean } = {
    hour: true,
    minute: true,
    second: true,
  }
): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const parts: string[] = [`${year}-${month}-${day}`];

  if (opts.hour || opts.minute || opts.second) {
    const timeParts: string[] = []; // ✅ string[]로 명시

    if (opts.hour) timeParts.push(pad(date.getHours()));
    if (opts.minute) timeParts.push(pad(date.getMinutes()));
    if (opts.second) timeParts.push(pad(date.getSeconds()));

    parts.push(timeParts.join(":"));
  }

  return parts.join(" ");
};

/**
 * stringToDate
 *
 * "YYYY-MM-DD HH:mm:ss" 형태의 문자열을 Date 객체로 변환합니다.
 * - 시간 부분이 없으면 00:00:00 처리
 * - 초가 없으면 00 처리
 * - 유효하지 않은 입력은 Invalid Date 반환
 *
 * @param value 날짜 문자열
 * @returns     Date 객체
 */
export const stringToDate = (value: string): Date => {
  if (!value) return new Date(NaN);

  const [datePart, timePart = "00:00:00"] = value.trim().split(" ");

  const [year, month, day] = (datePart?.split("-") ?? []).map(Number);
  const [hours = 0, minutes = 0, seconds = 0] = (
    timePart?.split(":") ?? []
  ).map(Number);

  if (!year || !month || !day) return new Date(NaN);

  const d = new Date();
  d.setFullYear(year);
  d.setMonth(month - 1); // 0-based
  d.setDate(day);
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(seconds);
  d.setMilliseconds(0);

  return d;
};
