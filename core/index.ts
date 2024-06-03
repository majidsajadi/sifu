import semver from "semver";
import { npm } from "./npm";
import { github } from "./github";


// fetch dependency from registery 
// cache with scheduled revalidation (1 day for example)
// fetchDependency()

// extract informaction from dependency from the fetched data from registery
// getDependency()


// getCommits()
// getChangelog()


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

export async function getChangelog(name: string, from?: string, to?: string) {}
