import semver from "semver";
import { fetchDependency } from "./registry";

export async function getDependency(name: string) {
  const dependency = await fetchDependency(name);

  const versions = Object.values(dependency.versions)
    .filter((ver) => !ver.deprecated)
    .map((ver) => ver.version)
    .sort((a, b) => semver.rcompare(a, b));

  return {
    name: dependency.name,
    versions,
  };
}
