/**
 * getDDay
 *
 * 특정 날짜와 오늘 사이의 D-Day 라벨을 반환합니다.
 *
 * @param target   비교할 날짜
 * @param opts     옵션
 *   - prefix: 접두어 (기본값 "D")
 *   - todayLabel: 오늘일 때 반환할 문자열 (기본값 "D-DAY")
 *   - withSign: + 표시 여부 (기본값 true → "D+3")
 *
 * @returns        D-Day 문자열
 */
export const getDDay = (
  target: Date,
  opts: {
    prefix?: string;
    todayLabel?: string;
    withSign?: boolean;
  } = {}
): string => {
  const { prefix = "D", todayLabel = "D-DAY", withSign = true } = opts;

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffInMs = startOfTarget.getTime() - startOfToday.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return todayLabel;
  if (diffInDays > 0) return `${prefix}-${diffInDays}`;
  return `${prefix}${withSign ? "+" : ""}${Math.abs(diffInDays)}`;
};
