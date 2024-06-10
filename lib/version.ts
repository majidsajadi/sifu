import semver from "semver";
import { fetchDependency } from "./registry";

function getLatestVersionStatisfies(versions: string[], range: string) {
  return semver.maxSatisfying(versions, range) ?? undefined;
}

export async function getDependencyVersion(name: string, range: string) {
  const metadata = await fetchDependency(name);

  const versions = Object.keys(metadata.versions);
  const latest = metadata["dist-tags"].latest;
  const latestSatisfies = getLatestVersionStatisfies(versions, range);

  return {
    latest,
    latestSatisfies,
  };
}
