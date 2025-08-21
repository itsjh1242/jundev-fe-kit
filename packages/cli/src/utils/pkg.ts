import fs from "node:fs";
import path from "node:path";

/**
 * 현재 작업 디렉토리(CWD)의 package.json 읽기
 * @returns { pkgPath, json } 파일 경로와 파싱된 JSON 객체
 */
export function readPkg(): { pkgPath: string; json: any } {
  const pkgPath = path.resolve("package.json");
  if (!fs.existsSync(pkgPath)) {
    throw new Error("package.json not found in CWD");
  }
  const json = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  return { pkgPath, json };
}

/**
 * package.json 다시 쓰기
 * @param pkgPath package.json 경로
 * @param json    업데이트된 JSON 객체
 */
export function writePkg(pkgPath: string, json: any): void {
  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2) + "\n");
}

/**
 * package.json 내 feKit.modules에 모듈 추가/갱신
 * @param json    package.json 객체
 * @param name    모듈 이름
 * @param version 모듈 버전 (선택)
 */
export function setKitModule(json: any, name: string, version?: string): void {
  json.feKit ??= {};
  json.feKit.modules ??= {};
  json.feKit.modules[name] = { version };
}

/**
 * 객체 병합 유틸
 *
 * - obj에 값이 없을 때만 a의 값을 복사해옴
 * - dependencies, peerDependencies 병합 시 사용
 */
export function merge(obj: Record<string, any>, a?: Record<string, any>): void {
  if (!a) return;
  for (const [k, v] of Object.entries(a)) {
    obj[k] ??= v;
  }
}
