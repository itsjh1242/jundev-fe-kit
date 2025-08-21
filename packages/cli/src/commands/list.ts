import chalk from "chalk";
import boxen from "boxen";
import { registry } from "../registry";

/**
 * 사용 가능한 모듈 목록을 출력하는 커맨드
 */
export function list(): void {
  const names = Object.keys(registry);

  if (names.length === 0) {
    console.log(chalk.gray("텅 비었습니다."));
    return;
  }

  const body =
    chalk.white("사용 가능한 모듈:") +
    "\n" +
    names.map((n) => "  " + chalk.cyan(n)).join("\n");

  console.log(
    boxen(body, {
      title: chalk.white.bold("fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "white",
    })
  );
}
