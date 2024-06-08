import semver from "semver";
import { npm } from "./npm";
import { github } from "./github";

export type TDependency = {
  name: string;
  versions: TVersion[];
};

export type TVersion = {
  version: string;
};

export async function getDependency(name: string) {
  const dependency = await npm.fetchDependency(name);

  const versions = Object.values(dependency.versions)
    .map((ver) => ({
      version: ver.version,
    }))
    .sort((a, b) => semver.rcompare(a.version, b.version));

  return {
    name: dependency.name,
    versions,
  };
}

export async function getCommits(name: string, from?: string, to?: string) {
  if (!from || !to) return;

  const { repository } = await npm.fetchDependency(name);

  const url =
    typeof repository === "string"
      ? repository
      : repository?.type === "git"
      ? repository.url
      : undefined;

  if (!url) {
    throw new Error("Parsing repostory failed");
  }

  const { hostname, pathname } = new URL(url);

  if (hostname !== "github.com") {
    throw new Error(
      `Parsing repostory failed. expected Github repository found ${hostname} repository`
    );
  }

  let path = pathname.replace(".git", "");
  if (path.charAt(0) === "/") {
    path = path.substring(1, pathname.length);
  }

  const [owner, repo] = path.split("/");

  const { data } = await github.compareCommitsWithBasehead({
    owner,
    repo,
    basehead: `v${from}...v${to}`,
  });

  const commits = data.commits.map((commit) => {
    const author = commit.author
      ? { url: commit.author.html_url, name: commit.author.login }
      : undefined;

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

export type TDependencyDiff = {
  name: string;
  before?: string;
  after?: string;
};

export async function getDependencies(
  name: string,
  source?: string,
  target?: string
) {
  if (!source || !target) return;

  const { versions } = await npm.fetchDependency(name);

  const { dependencies: sourceDependencies } = versions[source];
  const { dependencies: targetDependencies } = versions[target];

  const result: Array<TDependencyDiff> = [];

  if (sourceDependencies) {
    Object.entries(sourceDependencies).forEach(([name, range]) => {
      result.push({
        name,
        before: range,
      });
    });
  }

  if (targetDependencies) {
    Object.entries(targetDependencies).forEach(([name, range]) => {
      const item = result.find((diff) => diff.name === name);

      if (!!item) {
        item.after = range;
      } else {
        result.push({
          name,
          after: range,
        });
      }
    });
  }

  return result;
}

export type TEngineDiff = {
  name: string;
  before?: string;
  after?: string;
};

export async function getEngines(
  name: string,
  source?: string,
  target?: string
) {
  if (!source || !target) return;

  const { versions } = await npm.fetchDependency(name);

  const { engines: sourceEngines } = versions[source];
  const { engines: targetEngines } = versions[target];

  const result: Array<TEngineDiff> = [];

  if (sourceEngines) {
    Object.entries(sourceEngines).forEach(([name, range]) => {
      result.push({
        name,
        before: range,
      });
    });
  }

  if (targetEngines) {
    Object.entries(targetEngines).forEach(([name, range]) => {
      const item = result.find((diff) => diff.name === name);

      if (!!item) {
        item.after = range;
      } else {
        result.push({
          name,
          after: range,
        });
      }
    });
  }

  return result;
}
