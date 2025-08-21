import { execa } from "execa";
import chalk from "chalk";
import { readPkg, writePkg, setKitModule } from "../utils";
import { registry } from "../registry";
import { logSuccess } from "../utils/log";

export async function add(selected: string[]): Promise<void> {
  const { pkgPath, json: pkg } = readPkg();
  const installed: string[] = [];

  pkg.dependencies ??= {};

  for (const name of selected) {
    const item = registry[name];
    if (!item) {
      console.error(chalk.red(`[fe-kit] Unknown module: ${name}`));
      continue;
    }

    // 모듈이 속한 패키지를 dependencies에 추가
    pkg.dependencies[item.package] = "latest";

    // feKit.modules에 기록
    setKitModule(pkg, name, "latest");
    installed.push(name);
  }

  writePkg(pkgPath, pkg);

  // 실제 설치 실행
  await execa("pnpm", ["install"], { stdio: "inherit" });
  logSuccess(installed);
}
