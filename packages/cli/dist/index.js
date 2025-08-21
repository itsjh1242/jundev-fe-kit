#!/usr/bin/env node

// src/commands/add.ts
import { execa } from "execa";
import chalk2 from "chalk";

// src/utils/fs.ts
import fs from "fs";
import path from "path";

// src/utils/log.ts
import chalk from "chalk";
import boxen from "boxen";
function logSuccess(installed) {
  const body = chalk.white("\uBAA8\uB4C8 \uCD94\uAC00\uB428 \u2192 ") + chalk.cyan(installed.join(", ")) + "\n" + chalk.gray("\uC758\uC874\uC131 \uC124\uCE58\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
  console.log(
    boxen(body, {
      title: chalk.white.bold("\u{1F680} jundev-fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "green"
    })
  );
}

// src/utils/pkg.ts
import fs2 from "fs";
import path2 from "path";
function readPkg() {
  const pkgPath2 = path2.resolve("package.json");
  if (!fs2.existsSync(pkgPath2)) {
    throw new Error("package.json not found in CWD");
  }
  const json = JSON.parse(fs2.readFileSync(pkgPath2, "utf8"));
  return { pkgPath: pkgPath2, json };
}
function writePkg(pkgPath2, json) {
  fs2.writeFileSync(pkgPath2, JSON.stringify(json, null, 2) + "\n");
}
function setKitModule(json, name, version) {
  json.feKit ??= {};
  json.feKit.modules ??= {};
  json.feKit.modules[name] = { version };
}

// src/registry.ts
import fs3 from "fs";
import path3 from "path";
import { fileURLToPath } from "url";
var __dirname = path3.dirname(fileURLToPath(import.meta.url));
var pkgDir = path3.resolve(__dirname, "..");
var registryPath = path3.join(pkgDir, "src", "registry.json");
var registry = JSON.parse(fs3.readFileSync(registryPath, "utf8"));

// src/commands/add.ts
async function add(selected) {
  const { pkgPath: pkgPath2, json: pkg2 } = readPkg();
  const installed = [];
  pkg2.dependencies ??= {};
  for (const name of selected) {
    const item = registry[name];
    if (!item) {
      console.error(chalk2.red(`[fe-kit] Unknown module: ${name}`));
      continue;
    }
    pkg2.dependencies[item.package] = "latest";
    setKitModule(pkg2, name, "latest");
    installed.push(name);
  }
  writePkg(pkgPath2, pkg2);
  await execa("pnpm", ["install"], { stdio: "inherit" });
  logSuccess(installed);
}

// src/commands/list.ts
import chalk3 from "chalk";
import boxen2 from "boxen";
function list() {
  const names = Object.keys(registry);
  if (names.length === 0) {
    console.log(chalk3.gray("\uD145 \uBE44\uC5C8\uC2B5\uB2C8\uB2E4."));
    return;
  }
  const body = chalk3.white("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uBAA8\uB4C8:") + "\n" + names.map((n) => "  " + chalk3.cyan(n)).join("\n");
  console.log(
    boxen2(body, {
      title: chalk3.white.bold("fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "white"
    })
  );
}

// src/commands/upgrade.ts
import { execa as execa2 } from "execa";
import chalk4 from "chalk";
import boxen3 from "boxen";
async function upgrade(targets, opts = {}) {
  const { pkgPath: pkgPath2, json: pkg2 } = readPkg();
  const state = pkg2.feKit?.modules ?? {};
  const targetNames = targets.length > 0 ? targets : Object.keys(state);
  if (targetNames.length === 0) {
    console.log(chalk4.gray("No installed modules to upgrade"));
    return;
  }
  pkg2.dependencies ??= {};
  pkg2.feKit ??= {};
  pkg2.feKit.modules ??= {};
  const upgraded = [];
  const changedPackages = /* @__PURE__ */ new Set();
  for (const name of targetNames) {
    const item = registry[name];
    if (!item) {
      console.error(chalk4.red(`[fe-kit] Unknown module: ${name}`));
      continue;
    }
    pkg2.dependencies[item.package] = "latest";
    pkg2.feKit.modules[name] = { version: "latest" };
    upgraded.push(name);
    changedPackages.add(item.package);
  }
  if (opts.dry) {
    const body2 = chalk4.white("\uC5C5\uADF8\uB808\uC774\uB4DC (\uBBF8\uB9AC\uBCF4\uAE30)") + "\n" + chalk4.cyan(upgraded.join(", ")) + `

\uC5C5\uB370\uC774\uD2B8\uB420 \uD328\uD0A4\uC9C0: ${Array.from(changedPackages).join(", ")} \u2192 latest`;
    console.log(boxen3(body2, { padding: 1, borderStyle: "round" }));
    return;
  }
  writePkg(pkgPath2, pkg2);
  await execa2("pnpm", ["install"], { stdio: "inherit" });
  const body = chalk4.white("\uC5C5\uADF8\uB808\uC774\uB4DC \uC644\uB8CC \u2192 ") + chalk4.cyan(upgraded.join(", ")) + "\n" + chalk4.gray(`\uC5C5\uB370\uC774\uD2B8\uB41C \uD328\uD0A4\uC9C0: ${Array.from(changedPackages).join(", ")}`);
  console.log(
    boxen3(body, {
      title: chalk4.white.bold("\u2B06\uFE0F fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "green"
    })
  );
}

// src/commands/version.ts
import fs4 from "fs";
import path4 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import chalk5 from "chalk";
import boxen4 from "boxen";
var __dirname2 = path4.dirname(fileURLToPath2(import.meta.url));
var pkgPath = path4.resolve(__dirname2, "..", "package.json");
var pkg = JSON.parse(fs4.readFileSync(pkgPath, "utf8"));
function printVersion() {
  const body = chalk5.white("\uD604\uC7AC fe-kit CLI \uBC84\uC804: ") + chalk5.cyan(`v${pkg.version}`);
  console.log(
    boxen4(body, {
      title: chalk5.white.bold("\u{1F4E6} fe-kit"),
      titleAlignment: "center",
      padding: { top: 1, bottom: 1, left: 4, right: 4 },
      margin: 1,
      borderStyle: "round",
      borderColor: "blue"
    })
  );
}

// src/index.ts
async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const mods = args.slice(1);
  const flags = new Set(mods.filter((m) => m.startsWith("--")));
  const modulesOnly = mods.filter((m) => !m.startsWith("--"));
  switch (cmd) {
    case "add":
      await add(mods);
      break;
    case "list":
      list();
      break;
    case "upgrade":
      await upgrade(modulesOnly, { dry: flags.has("--dry") });
      break;
    case "version":
    case "-v":
    case "--version":
      printVersion();
      break;
    default:
      console.log("Usage:");
      console.log("  fe-kit add <module...>");
      console.log("  fe-kit list");
      console.log("  fe-kit upgrade [<module...>] [--dry]");
  }
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
