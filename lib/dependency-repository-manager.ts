import { kv } from "@vercel/kv";
import { fetchDependency, TRegistryVersionRepository } from "./registry";

type IDependencyRepository = { owner: string; repo: string; directory: undefined | string };

function parseDependencyRepository(repository: TRegistryVersionRepository) {
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

async function getDependencyRepositoryFromCache(name: string) {
  try {
    // return await kv.hgetall<IDependencyRepository>(`DEP:REPO:${name}`);
  } catch (error) {
    return undefined;
  }
}

async function setDependencyRepositoryInCache(name: string, repository: IDependencyRepository) {
  try {
    // await kv.hset(`DEP:REPO:${name}`, repository);
  } catch (error) {
  }
}

async function getDependencyRepositoryFromRegistery(name: string) {
  const dependency = await fetchDependency(name, false);
  const repository = dependency.versions[dependency["dist-tags"].latest].repository;
  if (!repository) return;
  return parseDependencyRepository(repository);
}

/**
 * Fetches dependency metadata from registry and parses repository information from the metadata
 * Using a cache aside strategy
 * @param name - dependency name
 * @returns repository info
 */
export async function getDependencyRepository(name: string) {
  const hit = await getDependencyRepositoryFromCache(name);
  if (!!hit) return hit;

  const repo = await getDependencyRepositoryFromRegistery(name);
  if (!!repo) {
    await setDependencyRepositoryInCache(name, repo);
  }

  return repo;
}
