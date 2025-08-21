/**
 * 휴대폰 번호 유효성 검사 함수
 *
 * - 허용되는 통신사 식별 번호(prefix): `010`, `011`, `016`, `017`, `018`, `019`
 * - 가운데 자리: 3자리 또는 4자리 숫자
 * - 마지막 자리: 4자리 숫자
 * - 구분자(`-`)는 선택적 (있어도 되고 없어도 됨)
 *
 * ## 사용 예시
 * ```ts
 * isValidPhone("01012345678");   // true
 * isValidPhone("010-1234-5678"); // true
 * isValidPhone("019-123-4567");  // true
 * isValidPhone("012-1234-5678"); // false (존재하지 않는 prefix)
 * isValidPhone("0101234567");    // false (자릿수 불일치)
 * ```
 *
 * @param value 검사할 전화번호 문자열
 * @returns 유효한 휴대폰 번호 형식이면 `true`, 아니면 `false`
 */
export function isValidPhone(value: string): boolean {
  const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return regex.test(value);
}

/**
 * formatPhoneNumber
 *
 * 한국 전화번호를 포맷합니다.
 * - 11자리: 010-1234-5678
 * - 10자리: 02-1234-5678 / 031-123-4567
 * - 8자리 : 1234-5678
 *
 * @param phone        전화번호 문자열
 * @param withHyphen   하이픈 포함 여부 (기본값 true)
 * @returns            포맷된 전화번호
 */
export const formatPhoneNumber = (
  phone: string,
  withHyphen: boolean = true
): string => {
  if (!phone) return "";

  // 숫자만 추출
  const digits = phone.replace(/\D/g, "");

  let formatted = digits;

  if (digits.length === 11) {
    // 휴대폰
    formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
      7
    )}`;
  } else if (digits.length === 10) {
    if (digits.startsWith("02")) {
      // 서울 지역번호
      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(
        6
      )}`;
    } else {
      // 그 외 지역번호
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6
      )}`;
    }
  } else if (digits.length === 8) {
    // 국번 없는 번호
    formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  return withHyphen ? formatted : formatted.replace(/-/g, "");
};
