#!/usr/bin/env node
import { add } from "./commands/add";
import { list } from "./commands/list";
import { upgrade } from "./commands/upgrade";
import { printVersion } from "./commands/version";

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
