import manifest from "../core/manifest.js";
import registry from "../core/registry.js";
import type { TCommonOptions, TCompareOptions } from "../types.js";
import { compareObjects } from "../utils/compare-objects.js";

export type TDepsOptions = TCommonOptions & TCompareOptions;

export async function deps(dependencyName: string, options: TDepsOptions) {
  let source = options.source;
  if (!source) {
    source = await manifest.getInstalledVersion(dependencyName, options.path);
  }

  let target = options.target;
  if (!target) {
    target = await registry.getLatestVersion(dependencyName);
  }


  const { versions } = await registry.fetchDependency(dependencyName);

  const { dependencies: sourceDependencies } = versions[source];
  const { dependencies: targetDependencies } = versions[target];
  
  const diff = compareObjects(sourceDependencies, targetDependencies);
  
  console.log(diff)
}
