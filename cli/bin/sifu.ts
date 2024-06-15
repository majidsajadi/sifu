import { cac } from "cac";
import pkg from "../package.json" assert { type: "json" };

const cli = cac(pkg.name)
  .option("--path <path>", "Path to manifest directory", {
    default: ".",
  })
  .option("--silent", "Runs the command in silent mode", {
    default: false,
  })
  .option("--force", "Forces fetching from servers, bypass cache", {
    default: false,
  })
  .option("--recursive", "Runs the command for each project in the workspace", {
    default: false,
  });

cli
  .command("latest", "Lists latest versions available for your dependencies")
  .option("-m, --mode <mode>", "Runs the command against [dev | prod] dependencies")
  .option("-i, --include <pattern>", "Specifies a glob pattern that match files to be included")
  .option("-e, --exclude <pattern>", "Specifies a glob pattern that match files to be excluded")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("commits <dep>", "Lists git commits")
  .option("--from <version>", "")
  .option("--to <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("changelog <dep>", "Lists changelog")
  .option("-f, --from <version>", "")
  .option("-f, --to <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("engines", "Compares engines")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("advisories <dep>", "Compares security advisories")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("deps <dep>", "Compares dependencies")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli
  .command("size <dep>", "Compares bundle and package size ")
  .option("-s, --source <version>", "")
  .option("-t, --target <version>", "")
  .action((path, options) => {
    console.log(1, path, options);
  });

cli.usage(pkg.description);
cli.help();
cli.version(pkg.version);

try {
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
} catch (error) {
  console.error(error);
  process.exit(1);
}
