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
declare const debounce: <T extends (...args: any[]) => void>({ fn, delay, }: {
    fn: T;
    delay?: number;
}) => ((...args: Parameters<T>) => void);

/**
 * 파일 이름을 안전하게 변환하는 함수
 *
 * - 윈도우/리눅스에서 파일명으로 쓸 수 없는 문자 제거
 * - 공백은 "_"로 치환
 * - 양쪽 공백 제거
 *
 * @param name 원본 파일명
 * @returns 안전하게 변환된 파일명
 */
declare const sanitizeFileName: (name: string) => string;
/**
 * 문자열을 지정한 길이로 잘라내는 함수
 *
 * - 지정된 길이 초과 시 "..." 붙여서 반환
 * - 파일명이나 UI 문자열에 자주 사용 가능
 *
 * @param str 원본 문자열
 * @param maxLength 최대 길이
 * @returns 잘린 문자열
 */
declare const truncateString: (str: string, maxLength: number) => string;
/**
 * 지정된 URL에서 파일을 다운로드하여 로컬에 저장하는 유틸 함수
 *
 * - 파일명을 안전하게 변환하고 최대 길이를 제한함
 * - fetch + blob을 활용하여 브라우저 호환성 확보
 * - 다운로드 실패 시 에러 로그 출력
 *
 * @param fileUrl   다운로드할 파일의 URL
 * @param fileName  저장할 파일명(선택). 없으면 URL에서 추출
 */
declare const downloadFile: (fileUrl: string, fileName?: string) => Promise<void>;

/**
 * @description 숫자를 한국 원화(₩) 통화 형식으로 변환
 * @example
 * formatKRW(1234567); // "₩1,234,567"
 */
declare const formatKRW: (n: number | string) => string;

/**
 * @description 숫자(또는 숫자 문자열)를 3자리 단위로 콤마(,)가 찍힌 형식으로 변환
 * @example
 * formatNumber(1234567); // "1,234,567"
 * formatNumber("98765"); // "98,765"
 */
declare const formatNumber: (n: number | string) => string;

/**
 * isValidDate
 *
 * 전달된 Date 객체가 유효한 날짜인지 검사합니다.
 *
 * @param date  검사할 Date 객체
 * @returns     유효한 날짜면 true, 잘못된 날짜면 false
 */
declare const isValidDate: (date: Date) => boolean;
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
declare const formatDate: (date: Date, opts?: {
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
}) => string;
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
declare const stringToDate: (value: string) => Date;

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
declare const getDDay: (target: Date, opts?: {
    prefix?: string;
    todayLabel?: string;
    withSign?: boolean;
}) => string;

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
declare function isValidPhone(value: string): boolean;
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
declare const formatPhoneNumber: (phone: string, withHyphen?: boolean) => string;

export { debounce, downloadFile, formatDate, formatKRW, formatNumber, formatPhoneNumber, getDDay, isValidDate, isValidPhone, sanitizeFileName, stringToDate, truncateString };
