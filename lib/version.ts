import semver from "semver";
import { TDependencyMetadata, fetchDependencyMetadata } from "./npm";

/**
 * Returns the minimum version that satisfies the range and asume its the current version of dependency
 *
 * @param range - A semver range
 */
function getCurrentVersion(range: string): string {
  const result = semver.minVersion(range);

  if (result === null) {
    throw new Error("Invalid range");
  }

  return result.toString();
}

function getLatestVersionStatisfies(versions: string[], range: string) {
  return semver.maxSatisfying(versions, range) ?? undefined;
}

function getGreaterVersionsSorted(versions: string[], current: string) {
  return versions.filter((version) => semver.gt(version, current)).sort((a, b) => semver.rcompare(a, b));
}

export function getDependencyAvailableVersions(metadata: TDependencyMetadata, range: string) {
  const currentVersion = getCurrentVersion(range);
  const versions = Object.keys(metadata.versions);
  const latest = metadata["dist-tags"].latest;
  const latestSatisfies = getLatestVersionStatisfies(versions, range)
  const greaterVersionsSorted = getGreaterVersionsSorted(versions, currentVersion);

  let availableSatisfiesCount = 0;
  const available = greaterVersionsSorted.map((version) => {
    const date = metadata.time[version];
    const value = metadata.versions[version];

    const satisfies = semver.satisfies(version, range);
    if (satisfies) availableSatisfiesCount++;

    return {
      version,
      date,
      deprecated: !!value.deprecated,
      satisfies,
    };
  });

  return {
    latest,
    latestSatisfies,
    available,
    availableCount: available.length,
    availableSatisfiesCount,
  };
}
