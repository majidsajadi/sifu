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

export default {
  fetchCommitsBetween,
};
