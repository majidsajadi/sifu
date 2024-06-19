#!/usr/bin/env node

import { cac } from "cac";
import pkg from "../package.json" assert { type: "json" };
import { commits } from "../lib/commands/commits.js";
import { changelog } from "../lib/commands/changelog.js";
import { engines } from "../lib/commands/engines.js";
import { advisories } from "../lib/commands/advisories.js";
import { deps } from "../lib/commands/deps.js";
import { latest } from "../lib/commands/latest.js";

const cli = cac(pkg.name).option(
  "--path <path>",
  "Path to manifest directory",
  {
    default: ".",
  }
);

cli.usage(pkg.description);
cli.version(pkg.version);
cli.help();

cli
  .command("", "Lists latest versions available for your dependencies")
  .option(
    "-m, --mode <mode>",
    "Runs the command against [dev | prod] dependencies"
  )
  .option(
    "-i, --include <pattern>",
    "Specifies a glob pattern that match files to be included"
  )
  .option(
    "-e, --exclude <pattern>",
    "Specifies a glob pattern that match files to be excluded"
  )
  .action(latest);

cli
  .command("commits <dep>", "Lists git commits")
  .option("--from <version>", "")
  .option("--to <version>", "")
  .action(commits);

cli
  .command("changelog <dep>", "Lists changelog")
  .option("-f, --from <version>", "")
  .option("-f, --to <version>", "")
  .action(changelog);

cli
  .command("engines", "Compares engines")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action(engines);

cli
  .command("advisories <dep>", "Compares security advisories")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action(advisories);

cli
  .command("deps <dep>", "Compares dependencies")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action(deps);

export async function run() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
