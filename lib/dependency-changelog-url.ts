import { kv } from "@vercel/kv";
import { getDependencyRepository } from "./dependency-repository";
import type { IDependencyRepository } from "./dependency-repository";

async function getDependencyChangelogURLCache(name: string) {
  try {
    // return await kv.get<string>(`DEP:CL:URL:${name}`);
  } catch (error) {
    return undefined;
  }
}

async function setDependencyChangelogURLInCache(name: string, url: string) {
  try {
    // await kv.set(`DEP:CL:URL:${name}`, url);
  } catch (error) {}
}

function getPossibleURLs({ directory, owner, repo }: IDependencyRepository) {
  const BASE_URL = "https://github.com";
  const POSSIBLE_NAMES = ["CHANGELOG.md", "HISTORY.md", "RELEASES.md", "changelog.md", "releases.md", "NEWS.md"];
  const POSSIBLE_DIRECTORIES = !!directory ? [directory, ""] : [""];
  const PISSIBLE_BRANCHES = ["main" /**, "master" */];

  const urls: string[] = [];

  POSSIBLE_NAMES.forEach((name) => {
    PISSIBLE_BRANCHES.forEach((branch) => {
      POSSIBLE_DIRECTORIES.forEach((directory) => {
        if (!!directory) {
          urls.push(new URL(`/${owner}/${repo}/blob/${branch}/${directory}/${name}`, BASE_URL).toString());
        } else {
          urls.push(new URL(`/${owner}/${repo}/blob/${branch}/${name}`, BASE_URL).toString());
        }
      });
    });
  });

  return urls;
}

async function findDependencyChangelogURL(name: string) {
  const repository = await getDependencyRepository(name);
  if (!repository) return;

  const possibleURLs = getPossibleURLs(repository);

  let url: string | undefined = undefined;

  while (!!possibleURLs.length && !url) {
    const possibleURL = possibleURLs.shift()!;
    try {
      const response = await fetch(possibleURL, { method: "HEAD" });
      if (response.ok) {
        url = possibleURL;
      }
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
  if (!!hit) return hit;

  const url = await findDependencyChangelogURL(name);
  if (!!url) {
    await setDependencyChangelogURLInCache(name, url);
  }

  return url;
}
