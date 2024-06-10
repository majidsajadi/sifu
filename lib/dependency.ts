import semver from "semver";
import { fetchDependency, searchDependency } from "./registry";

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

export async function queryDependency(name: string) {
  const dependency = await searchDependency(name);
  return dependency.objects.map((dep) => dep.package);
}

function getLatestVersionStatisfies(versions: string[], range: string) {
  return semver.maxSatisfying(versions, range) ?? undefined;
}

export async function getDependencyVersionOverview(name: string, range: string) {
  const metadata = await fetchDependency(name);

  const versions = Object.keys(metadata.versions);
  const latest = metadata["dist-tags"].latest;
  const latestSatisfies = getLatestVersionStatisfies(versions, range);

  return {
    latest,
    latestSatisfies,
  };
}

export type TObjectPropertyDiff = {
  name: string;
  source?: string;
  target?: string;
};

function compareObjects(
  source?: {
    [x: string]: string | undefined;
  },
  target?: {
    [x: string]: string | undefined;
  }
) {
  const result: Array<TObjectPropertyDiff> = [];

  if (source) {
    Object.entries(source).forEach(([name, range]) => {
      result.push({
        name,
        source: range,
      });
    });
  }

  if (target) {
    Object.entries(target).forEach(([name, range]) => {
      const item = result.find((diff) => diff.name === name);

      if (!!item) {
        item.target = range;
      } else {
        result.push({
          name,
          target: range,
        });
      }
    });
  }

  return result;
}

export async function compareDependenciesEngines(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const { versions } = await fetchDependency(name);

  const { engines: sourceEngines } = versions[source];
  const { engines: targetEngines } = versions[target];

  return compareObjects(sourceEngines, targetEngines);
}
