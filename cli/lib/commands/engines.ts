import type { TCommonOptions, TCompareOptions } from "../types.js";

export type TEnginesOptions = TCommonOptions & TCompareOptions;

export async function engines(name: string, options: TEnginesOptions) {
  // const dependency = registry.fetchDependency(dependencyName);
  // const source = options.source ?? manifest.getInstalledVersion(dependency);
  // const target = options.target ?? registery.getLatestVersion(dependency);

  // const { dependencies: sourceDependencies } = versions[source];
  // const { dependencies: targetDependencies } = versions[target];
  
  // const diff = compareObjects(sourceDependencies, targetDependencies);
  // renderDiff
}


