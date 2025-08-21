import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CLI 패키지 루트 디렉토리 (packages/cli)
export const pkgDir = path.resolve(__dirname, "..");

// 레지스트리 JSON 경로 (src/registry.json 으로 변경)
const registryPath = path.join(pkgDir, "src", "registry.json");

// 레지스트리 로드
export const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
