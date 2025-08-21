/**
 * @description 숫자를 한국 원화(₩) 통화 형식으로 변환
 * @example
 * formatKRW(1234567); // "₩1,234,567"
 */
export const formatKRW = (n: number | string) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(Number(n));
