import { kv } from "@vercel/kv";
import { getDependencyRepositoryInfo } from "./repository-info";
import type { IDependencyRepositoryInfo } from "./repository-info";

type TChangelogURL = {
  href: string;
  owner: string;
  repo: string;
  path: string;
};

async function getDependencyChangelogURLCache(name: string) {
  try {
    return await kv.hgetall<TChangelogURL>(`DEP:CL:URL:${name}`);
  } catch (error) {
    return undefined;
  }
}

async function setDependencyChangelogURLInCache(name: string, url: TChangelogURL) {
  try {
    await kv.hset(`DEP:CL:URL:${name}`, url);
  } catch (error) {
    console.error(error);
  }
}

function getPossibleURLs({ directory, owner, repo }: IDependencyRepositoryInfo) {
  const BASE_URL = "https://github.com";
  const POSSIBLE_NAMES = ["CHANGELOG.md", "HISTORY.md", "RELEASES.md", "changelog.md", "releases.md", "NEWS.md"];
  const POSSIBLE_DIRECTORIES = directory ? [directory, ""] : [""];
  const PISSIBLE_BRANCHES = ["main" , "master"];

  const urls: TChangelogURL[] = [];

  POSSIBLE_NAMES.forEach((name) => {
    PISSIBLE_BRANCHES.forEach((branch) => {
      POSSIBLE_DIRECTORIES.forEach((directory) => {
        let path = `/${name}`;
        if (directory) {
          path = `/${directory}/${name}`;
        }

        urls.push({
          href: new URL(`/${owner}/${repo}/blob/${branch}/${path}`, BASE_URL).toString(),
          owner,
          path,
          repo,
        });
      });
    });
  });

  return urls;
}

async function findDependencyChangelogURL(name: string) {
  const repository = await getDependencyRepositoryInfo(name);
  if (!repository) return;

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

  return url;
}

/**
 * Tries to find dependency changelog url from repository
 * Using a cache aside strategy
 * @param name - dependency name
 * @returns repository info
 */
export async function getDependencyChangelogURL(name: string) {
  const hit = await getDependencyChangelogURLCache(name);
  if (hit) return hit;

  const url = await findDependencyChangelogURL(name);
  if (url) {
    await setDependencyChangelogURLInCache(name, url);
  }

  return url;
}
