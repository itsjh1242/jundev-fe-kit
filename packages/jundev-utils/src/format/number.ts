/**
 * @description 숫자(또는 숫자 문자열)를 3자리 단위로 콤마(,)가 찍힌 형식으로 변환
 * @example
 * formatNumber(1234567); // "1,234,567"
 * formatNumber("98765"); // "98,765"
 */
export const formatNumber = (n: number | string) =>
  new Intl.NumberFormat().format(Number(n));
