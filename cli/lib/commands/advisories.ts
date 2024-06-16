import registry from "../core/registry.js";
import manifest from "../core/manifest.js";
import type { TCommonOptions, TCompareOptions } from "../types.js";

type TAdvisoriesOptions = TCommonOptions & TCompareOptions;

export async function advisories(
  dependencyName: string,
  options: TAdvisoriesOptions
) {
  let source = options.source;
  if (!source) {
    source = await manifest.getInstalledVersion(dependencyName, options.path);
  }

  let target = options.target;
  if (!target) {
    target = await registry.getLatestVersion(dependencyName);
  }

  const advisories = await registry.fetchAdvisories(
    dependencyName,
    source,
    target
  );

  console.log(advisories);
}
