import semver from "semver";
import { Octokit } from "octokit";
import registry from "./registry.js";
import { type TRemoteDependencyRepository } from "./registry.js";
import { SifuError } from "../error.js";

export const github = new Octokit().rest;

export type IDependencyRepositoryInfo = {
  owner: string;
  repo: string;
  directory: undefined | string;
};

function parseDependencyRepositoryInfo(
  repository?: TRemoteDependencyRepository
) {
  if (!repository) {
    throw new SifuError("PARSE_DEPENDNECY_REPOSITORY_ERROR", "");
  }

  const url =
    typeof repository === "string"
      ? repository
      : repository.type === "git"
        ? repository.url
        : undefined;

  if (!url) {
    throw new SifuError("PARSE_DEPENDNECY_REPOSITORY_ERROR", "");
  }

  const { hostname, pathname } = new URL(url);
  if (hostname !== "github.com") {
    throw new SifuError(
      "PARSE_DEPENDNECY_REPOSITORY_ERROR",
      " expected Github repository found ${hostname} repository"
    );
  }

  let path = pathname.replace(".git", "");
  if (path.charAt(0) === "/") {
    path = path.substring(1, pathname.length);
  }

  const [owner, repo] = path.split("/");

  const directory =
    typeof repository !== "string" ? repository.directory ?? "" : "";

  return {
    owner,
    repo,
    directory,
  };
}

async function getDependencyRepositoryInfo(name: string) {
  const dependency = await registry.fetchDependency(name, false);
  return parseDependencyRepositoryInfo(
    dependency.versions[dependency["dist-tags"].latest].repository
  );
}

async function fetchCommitsBetween(
  dependencyName: string,
  from: string,
  to: string
) {
  const { owner, repo } = await getDependencyRepositoryInfo(dependencyName);

  const { data } = await github.repos.compareCommitsWithBasehead({
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

type TChangelogURL = {
  href: string;
  owner: string;
  repo: string;
  path: string;
};

function getPossibleURLs({
  directory,
  owner,
  repo,
}: IDependencyRepositoryInfo) {
  const BASE_URL = "https://github.com";
  const POSSIBLE_NAMES = [
    "CHANGELOG.md",
    "HISTORY.md",
    "RELEASES.md",
    "changelog.md",
    "releases.md",
    "NEWS.md",
  ];
  const POSSIBLE_DIRECTORIES = directory ? [directory, ""] : [""];
  const PISSIBLE_BRANCHES = ["main", "master"];

  const urls: TChangelogURL[] = [];

  POSSIBLE_NAMES.forEach((name) => {
    PISSIBLE_BRANCHES.forEach((branch) => {
      POSSIBLE_DIRECTORIES.forEach((directory) => {
        let path = `/${name}`;
        if (directory) {
          path = `/${directory}/${name}`;
        }

        urls.push({
          href: new URL(
            `/${owner}/${repo}/blob/${branch}/${path}`,
            BASE_URL
          ).toString(),
          owner,
          path,
          repo,
        });
      });
    });
  });

  return urls;
}

async function findDependencyChangelogURL(dependencyName: string) {
  const repository = await getDependencyRepositoryInfo(dependencyName);
  const possibleURLs = getPossibleURLs(repository);

  let url: TChangelogURL | undefined = undefined;

  while (!!possibleURLs.length && !url) {
    const possibleURL = possibleURLs.shift()!;
    try {
      const response = await fetch(possibleURL.href, { method: "HEAD" });
      if (response.ok) {
        url = possibleURL;
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  if (!url)
    throw new SifuError(
      "FIND_DEPENDNECY_CHANGELOG_URL_ERROR",
      `Changelog url could not be found for \`${dependencyName}\``
    );

  return url;
}

const ENTRY_HEADING_REGEX = /^##\s.*$/;
const SEMVER_HEADING_REGEX =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

/**
 * Parses the changelog content and returns the list of version entries in changelog filtered by `from` and `to`
 *
 * @param content - The string content of changelog
 * @param from - Represents the starting point or lower bound for filtering items
 * @param to - Represents the ending point or upper bound for filtering items.
 * @returns
 */
export function parseChangelog(content: string, from: string, to: string) {
  const entries = [];
  const lines = content.split("\n");

  let current: string | undefined = undefined;
  let body: string[] = [];

  lines.every((line) => {
    // if the line starts with `## ` is probebly heading of a changelog entry according to the [keep-a-changelog](https://keepachangelog.com/en/1.1.0/)
    const maybeEntryHeading = ENTRY_HEADING_REGEX.exec(line);
    if (!maybeEntryHeading) {
      body.push(line);
      return true;
    }

    // search for the version in the heading
    const version = SEMVER_HEADING_REGEX.exec(line)?.[0];

    // ignore the versions greater that `to` version. since we start from the top we should ignore the newer versions
    if (!version || semver.gt(version, to)) {
      body.push(line);
      return true;
    }

    // if we reach the `from` version we can end the search since we find every entry we need
    if (semver.lt(version, from)) return false;

    // if there is a current version in the buffer push it to the entry list and continue with the version we just find
    if (current) {
      entries.push({
        version: current,
        content: body.join("\n"),
      });
    }

    current = version;
    body = [];
    return true;
  });

  // if there is a current version in the buffer push it to the entry list
  if (current) {
    entries.push({
      version: current,
      content: body.join("\n"),
    });
  }

  return entries;
}

async function fetchChangelogBetween(
  dependencyName: string,
  from: string,
  to: string
) {
  const { repo, owner, path, href } =
    await findDependencyChangelogURL(dependencyName);

  const response = await github.repos.getContent({
    repo,
    owner,
    path,
  });

  const content = (response.data as any).content as string;
  const parsed = Buffer.from(content, "base64").toString();
  // TODO: use stream?

  const entries = await parseChangelog(parsed, from, to);

  return {
    href,
    entries,
  };
}

export default {
  fetchCommitsBetween,
  fetchChangelogBetween,
};
