import type { TCommonOptions, TRangeOptions } from "../types.js";

export type TCommitsOptions = TCommonOptions & TRangeOptions

export async function commits(dependencyName: string, options: TCommitsOptions) {
  // const dependency = registry.fetchDependency(dependencyName);
  // const from = options.from ?? manifest.getInstalledVersion(dependency);
  // const to = options.to ?? registery.getLatestVersion(dependency);
  // const commits = repository.fetchCommitsBetween(dependency, from, to);
  // renderCommits();
}

