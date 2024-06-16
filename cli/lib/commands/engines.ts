import manifest from "../core/manifest.js";
import registry from "../core/registry.js";
import type { TCommonOptions, TCompareOptions } from "../types.js";
import { compareObjects } from "../utils/compare-objects.js";

export type TEnginesOptions = TCommonOptions & TCompareOptions;

export async function engines(
  dependencyName: string,
  options: TEnginesOptions
) {
  let source = options.source;
  if (!source) {
    source = await manifest.getInstalledVersion(dependencyName, options.path);
  }

  let target = options.target;
  if (!target) {
    target = await registry.getLatestVersion(dependencyName);
  }

  const { versions } = await registry.fetchDependency(dependencyName);

  const { engines: sourceEngines } = versions[source];
  const { engines: targetEngines } = versions[target];

  const diff = compareObjects(sourceEngines, targetEngines);

  console.log(diff);
}
