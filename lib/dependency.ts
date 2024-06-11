import semver from "semver";
import { checkDependencyRepository, storeDependencyRepositoryGracefully } from "./dependency-repository-manager";
import { fetchAdvisories, fetchDependency, searchDependency } from "./registry";

/**
 * Fetches dependency info from registry.
 * @param name - dependency name
 */
export async function getDependency(name: string) {
  const dependencyRepositoryExists = await checkDependencyRepository(name);

  // if we dont have the dependency repository info fetch the full metadata from registry that has the repository field
  // so we can find and store the dependency repository information ahead of time
  const dependency = await fetchDependency(name, !dependencyRepositoryExists);

  if (dependencyRepositoryExists) {
    const repository = dependency.versions[dependency["dist-tags"].latest].repository;
    await storeDependencyRepositoryGracefully(name, repository);
  }

  const versions = Object.values(dependency.versions)
    // filter out deprecated dependencies.
    .filter((ver) => !ver.deprecated)
    .map((ver) => ver.version)
    // sort dependencys ascending.
    .sort((a, b) => semver.rcompare(a, b));

  return {
    name: dependency.name,
    versions,
  };
}

/**
 * Searches dependency by name in registry.
 * @param name - dependency name
 */
export async function queryDependency(name: string) {
  const dependency = await searchDependency(name);
  return dependency.objects.map((dep) => dep.package);
}

export async function getDependencyVersionOverview(name: string, range: string) {
  const metadata = await fetchDependency(name);
  // latest tag is used by npm to identify the current version of a package.
  const latest = metadata["dist-tags"].latest;
  const versions = Object.keys(metadata.versions);
  // find latest version that satisfies the semver range provided.
  const latestSatisfies = semver.maxSatisfying(versions, range) ?? undefined;

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

type TObject = {
  [x: string]: string | undefined;
};

/**
 * @param source - source object
 * @param target - target object
 * @returns an object containing all properties of source and target objects with both values.
 */
function compareObjects(source?: TObject, target?: TObject) {
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

/**
 * Compares source and target versions `engine` field in `package.json`.
 *
 * @param name - dependency name
 * @param source - source dependency
 * @param target - target dependency
 * @returns an array containing all engines in both versions.
 */
export async function compareEngines(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const { versions } = await fetchDependency(name);

  const { engines: sourceEngines } = versions[source];
  const { engines: targetEngines } = versions[target];

  return compareObjects(sourceEngines, targetEngines);
}

/**
 * Compares the dependencies of source and target versions.
 *
 * @param name - dependency name
 * @param source - source dependency
 * @param target - target dependency
 * @returns an array containing all dependencies in both versions.
 */
export async function compareDependencies(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const { versions } = await fetchDependency(name);

  const { dependencies: sourceDependencies } = versions[source];
  const { dependencies: targetDependencies } = versions[target];

  return compareObjects(sourceDependencies, targetDependencies);
}

/**
 * @param name - dependency name
 * @param source - source dependency
 * @param target - target dependency
 * @returns list of advisories for vulnerabilities that affect both versions
 */
export async function getAdvisories(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const data = await fetchAdvisories(name, source, target);
  return data[name];
}
