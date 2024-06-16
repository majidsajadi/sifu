import { kv } from "@vercel/kv";
import { fetchDependency, TRegistryVersionRepository } from "./registry";

export type IDependencyRepositoryInfo = { owner: string; repo: string; directory: undefined | string };

function parseDependencyRepositoryInfo(repository: TRegistryVersionRepository) {
  const url = typeof repository === "string" ? repository : repository.type === "git" ? repository.url : undefined;

  if (!url) {
    throw new Error("Parsing repostory failed");
  }

  const { hostname, pathname } = new URL(url);
  if (hostname !== "github.com") {
    throw new Error(`Parsing repostory failed. expected Github repository found ${hostname} repository`);
  }

  let path = pathname.replace(".git", "");
  if (path.charAt(0) === "/") {
    path = path.substring(1, pathname.length);
  }

  const [owner, repo] = path.split("/");

  const directory = typeof repository !== "string" ? (repository.directory ?? "") : "";

  return {
    owner,
    repo,
    directory,
  };
}

async function getDependencyRepositoryInfoFromCache(name: string) {
  try {
    return await kv.hgetall<IDependencyRepositoryInfo>(`DEP:REPO:${name}`);
  } catch (error) {
    return undefined;
  }
}

async function setDependencyRepositoryInfoInCache(name: string, repository: IDependencyRepositoryInfo) {
  try {
    await kv.hset(`DEP:REPO:${name}`, repository);
  } catch (error) {
    console.error(error)
  }
}

async function getDependencyRepositoryInfoFromRegistery(name: string) {
  const dependency = await fetchDependency(name, false);
  const repository = dependency.versions[dependency["dist-tags"].latest].repository;
  if (!repository) return;
  return parseDependencyRepositoryInfo(repository);
}

/**
 * Fetches dependency metadata from registry and parses repository information from the metadata
 * Using a cache aside strategy
 * @param name - dependency name
 * @returns repository info
 */
export async function getDependencyRepositoryInfo(name: string) {
  const hit = await getDependencyRepositoryInfoFromCache(name);
  if (hit) return hit;

  const repo = await getDependencyRepositoryInfoFromRegistery(name);
  if (repo) {
    await setDependencyRepositoryInfoInCache(name, repo);
  }

  return repo;
}
