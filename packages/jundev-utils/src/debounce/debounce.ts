/**
 * @description
 * 연속 호출되는 함수 실행을 지연시켜 마지막 호출만 실행되도록 하는 디바운스 유틸
 *
 * @example
 * const log = debounce({
 *   fn: (msg: string) => console.log(msg),
 *   delay: 500,
 * });
 *
 * log("A"); log("B"); log("C");
 * // 0.5초 후 "C"만 출력
 */
export const debounce = <T extends (...args: any[]) => void>({
  fn,
  delay = 200,
}: {
  fn: T;
  delay?: number;
}): ((...args: Parameters<T>) => void) => {
  let t: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};
