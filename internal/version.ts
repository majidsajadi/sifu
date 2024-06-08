import semver from "semver";
import { npm } from "./npm";

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
  return versions
    .filter((version) => semver.gt(version, current))
    .sort((a, b) => semver.rcompare(a, b));
}

export async function getDependencyVersion(
  name: string,
  range: string
) {
  const currentVersion = getCurrentVersion(range);

  const metadata = await npm.fetchDependency(name);


  const versions = Object.keys(metadata.versions);
  const latest = metadata["dist-tags"].latest;
  const latestSatisfies = getLatestVersionStatisfies(versions, range);
  const greaterVersionsSorted = getGreaterVersionsSorted(
    versions,
    currentVersion
  );

  const latestTime = metadata.time[latest];
  const latestSatisfiesTime = latestSatisfies && metadata.time[latestSatisfies];

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
    latestTime,
    latestSatisfies,
    latestSatisfiesTime,
    available,
    availableCount: available.length,
    availableSatisfiesCount,
  };
}
