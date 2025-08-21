import chalk from "chalk";
import boxen from "boxen";

export function logSuccess(installed: string[]) {
  const body =
    chalk.white("모듈 추가됨 → ") +
    chalk.cyan(installed.join(", ")) +
    "\n" +
    chalk.gray("의존성 설치가 성공적으로 완료되었습니다.");

  console.log(
    boxen(body, {
      title: chalk.white.bold("🚀 jundev-fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "green",
    })
  );
}
