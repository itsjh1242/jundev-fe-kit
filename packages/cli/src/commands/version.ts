import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import boxen from "boxen";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// CLI 패키지의 package.json 경로 고정
const pkgPath = path.resolve(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

/**
 * CLI 버전 출력
 */
export function printVersion(): void {
  const body =
    chalk.white("현재 fe-kit CLI 버전: ") + chalk.cyan(`v${pkg.version}`);

  console.log(
    boxen(body, {
      title: chalk.white.bold("📦 fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "blue",
    })
  );
}
