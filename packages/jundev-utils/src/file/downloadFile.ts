import { saveAs } from "file-saver";

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
export const sanitizeFileName = (name: string) => {
  return name
    .replace(/[\\/:*?"<>|]/g, "") // 파일 이름에 사용할 수 없는 문자 제거
    .replace(/\s+/g, "_") // 공백을 밑줄로 대체
    .trim(); // 양쪽 공백 제거
};

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
export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

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
export const downloadFile = async (
  fileUrl: string,
  fileName?: string
): Promise<void> => {
  try {
    // 1. URL에서 확장자 추출 (없으면 기본값 'file')
    const extension = fileUrl.split(".").pop()?.toLowerCase() || "file";

    // 2. 최종 파일명 생성
    const finalFileName = fileName
      ? `${sanitizeFileName(truncateString(fileName, 50))}.${extension}`
      : fileUrl.split("/").pop() || `download.${extension}`;

    // 3. 파일 가져오기 (HTTP 상태 코드 검증 포함)
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(
        `다운로드 실패 (status: ${response.status} ${response.statusText})`
      );
    }

    // 4. Blob 변환 후 다운로드 실행
    const blob = await response.blob();
    saveAs(blob, finalFileName);
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
  }
};
