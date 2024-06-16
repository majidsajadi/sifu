import manifest from "../core/manifest.js";
import registry from "../core/registry.js";
import repository from "../core/repository.js";
import type { TCommonOptions, TRangeOptions } from "../types.js";

export type TChangelogOptions = TCommonOptions & TRangeOptions;

export async function changelog(
  dependencyName: string,
  options: TChangelogOptions
) {
  let from = options.from;
  if (!from) {
    from = await manifest.getInstalledVersion(dependencyName, options.path);
  }

  let to = options.to;
  if (!to) {
    to = await registry.getLatestVersion(dependencyName);
  }

  const changelog = repository.fetchChangelogBetween(dependencyName, from, to);

  console.log(changelog);
}
