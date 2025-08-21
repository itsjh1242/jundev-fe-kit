import { execa } from "execa";
import chalk from "chalk";
import boxen from "boxen";

import { readPkg, writePkg } from "../utils/pkg";
import { registry } from "../registry";

/**
 * 모듈 업그레이드 커맨드
 *
 * @param targets 업그레이드할 모듈 이름 배열 (없으면 전체 모듈)
 * @param opts    옵션 (dry: true면 미리보기만)
 */
export async function upgrade(
  targets: string[],
  opts: { dry?: boolean } = {}
): Promise<void> {
  const { pkgPath, json: pkg } = readPkg();

  // package.json의 feKit.modules 읽기
  const state: Record<string, { version?: string }> = pkg.feKit?.modules ?? {};
  const targetNames = targets.length > 0 ? targets : Object.keys(state);

  if (targetNames.length === 0) {
    console.log(chalk.gray("No installed modules to upgrade"));
    return;
  }

  pkg.dependencies ??= {};
  pkg.feKit ??= {};
  pkg.feKit.modules ??= {};

  const upgraded: string[] = [];
  const changedPackages: Set<string> = new Set();

  for (const name of targetNames) {
    const item = registry[name];
    if (!item) {
      console.error(chalk.red(`[fe-kit] Unknown module: ${name}`));
      continue;
    }

    // 모듈이 속한 패키지 갱신
    pkg.dependencies[item.package] = "latest";

    // feKit.modules 기록 갱신
    pkg.feKit.modules[name] = { version: "latest" };

    upgraded.push(name);
    changedPackages.add(item.package);
  }

  if (opts.dry) {
    const body =
      chalk.white("업그레이드 (미리보기)") +
      "\n" +
      chalk.cyan(upgraded.join(", ")) +
      "\n\n" +
      `업데이트될 패키지: ${Array.from(changedPackages).join(", ")} → latest`;
    console.log(boxen(body, { padding: 1, borderStyle: "round" }));
    return;
  }

  // 실제 업그레이드 반영
  writePkg(pkgPath, pkg);
  await execa("pnpm", ["install"], { stdio: "inherit" });

  const body =
    chalk.white("업그레이드 완료 → ") +
    chalk.cyan(upgraded.join(", ")) +
    "\n" +
    chalk.gray(`업데이트된 패키지: ${Array.from(changedPackages).join(", ")}`);

  console.log(
    boxen(body, {
      title: chalk.white.bold("⬆️ fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "green",
    })
  );
}
