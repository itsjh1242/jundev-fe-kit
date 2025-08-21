import fs from "node:fs";
import path from "node:path";

/**
 * 디렉토리를 재귀적으로 복사 (기존 파일은 덮어쓰지 않음)
 *
 * @param src  원본 디렉토리 경로
 * @param dest 대상 디렉토리 경로
 */
export function copyDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      // 덮어쓰지 않고 없을 때만 복사
      if (!fs.existsSync(d)) fs.copyFileSync(s, d);
    }
  }
}

/**
 * 디렉토리를 재귀적으로 복사 (항상 덮어쓰기)
 *
 * @param src  원본 디렉토리 경로
 * @param dest 대상 디렉토리 경로
 */
export function overwriteDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      overwriteDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}
