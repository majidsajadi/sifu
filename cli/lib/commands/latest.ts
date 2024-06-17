import type { TFilterOptions, TCommonOptions } from "../types.js";
import { SifuError } from "../error.js";
import manifest from "../core/manifest.js";
import registry from "../core/registry.js";

export type TLatestOptions = TCommonOptions & TFilterOptions;

export async function latest(options: TLatestOptions) {
  if (!!options.include && !!options.exclude) {
    throw new SifuError(
      "INVALID_OPTION",
      "both `include` and `exclude` options provided"
    );
  }

  if (!!options.mode && ["dev, prod"].includes(options.mode)) {
    throw new SifuError(
      "INVALID_OPTION",
      "`mode` only accept `dev` and `prod` as value"
    );
  }

  const dependencies = await manifest.getDependencies(options);
  const needsUpdate = await registry.getOutdatedDependencies(dependencies);

  console.log(needsUpdate);
}

// function renderLatestTable(data: TDependencyLatestVersions[]) {
//   const rows = data.map(({ name, range, latest }) => [
//     picocolors.white(name),
//     picocolors.white(range),
//     picocolors.dim("➜"),
//     colorizeVersion(latest, range),
//   ]);
//   renderTable(rows);
// }
