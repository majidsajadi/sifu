#!/usr/bin/env node

import { cac } from "cac";
import pkg from "../package.json" with { type: "json" };
import { commits } from "../lib/commands/commits.js";
import { changelog } from "../lib/commands/changelog.js";
import { engines } from "../lib/commands/engines.js";
import { advisories } from "../lib/commands/advisories.js";
import { deps } from "../lib/commands/deps.js";
import { latest } from "../lib/commands/latest.js";

const cli = cac(pkg.name).option(
  "-p, --path <path>",
  "Path to project directory containing package.json",
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
  .command("deps <dep>", "Compares dependencies")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action(deps);

cli
  .command("advisories <dependency>", "Lists security advisories that affect either source or target version")
  .option("-s, --source <version>", "Source version of the dependency (default: installed version)")
  .option("-t, --target <version>", "Target version of the dependency (default: latest version available in registry)")
  .action(advisories);


export async function run() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
