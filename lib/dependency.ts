import { Octokit } from "octokit";
import semver from "semver";
import { parseChangelog } from "./changelog-parser";
import { getDependencyChangelogURL } from "./changelog-url";
import { getDependencyRepositoryInfo } from "./repository-info";
import { fetchAdvisories, fetchDependency, searchDependency } from "./registry";

export const github = new Octokit().rest;

/**
 * Fetches dependency info from registry.
 * @param name - dependency name
 */
export async function getDependency(name: string) {
  const dependency = await fetchDependency(name);

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

/**
 * @param name - dependency name
 * @param source - source dependency
 * @param target - target dependency
 * @returns Git commits from the source version to target version
 */
export async function getCommits(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const repository = await getDependencyRepositoryInfo(name);
  if (!repository) throw new Error("Repository information could not be found");

  const { owner, repo } = repository;

  const { data } = await github.repos.compareCommitsWithBasehead({
    owner,
    repo,
    basehead: `v${source}...v${target}`,
  });

  const commits = data.commits.map((commit) => {
    const author = commit.author ? { url: commit.author.html_url, name: commit.author.login } : undefined;

    return {
      author,
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author?.date,
      url: commit.html_url,
    };
  });

  return {
    url: data.html_url,
    total: data.total_commits,
    files: data.files?.length,
    commits,
  };
}

/**
 * Finds, fetch and parse change log and return the changlog entries according to from and to filters
 */
export async function getChangelog(name: string, source?: string, target?: string) {
  if (!source || !target) return;

  const changelogURL = await getDependencyChangelogURL(name);
  if (!changelogURL) throw new Error("Changelog url could not be found");

  const { repo, owner, path, href } = changelogURL;

  const response = await github.repos.getContent({
    repo,
    owner,
    path,
  });

  const content = (response.data as any).content as string;
  const parsed = Buffer.from(content, "base64").toString();
  // TODO: use stream?

  const entries = await parseChangelog(parsed, source, target);

  return {
    href,
    entries,
  };
}
