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

  const directory = typeof repository !== "string" ? repository.directory : undefined;

  return {
    owner,
    repo,
    directory,
  };
}

export function checkDependencyRepository(name: string) {
  return kv.exists(`DEP:REPO:${name}`);
}

async function storeDependencyRepository(name: string, repository: TRegistryVersionRepository) {
  const dependencyRepository = parseDependencyRepository(repository);
  await kv.hset(`DEP:REPO:${name}`, dependencyRepository);
  return dependencyRepository;
}

export async function storeDependencyRepositoryGracefully(name: string, repository?: TRegistryVersionRepository) {
  if (!repository) return;

  try {
    await storeDependencyRepository(name, repository);
  } catch (error) {
    return;
  }
}

export async function getDependencyRepository(name: string) {
  const hit = await kv.hgetall<IDependencyRepository>(`DEP:REPO:${name}`);
  if (!!hit) return hit;

  const dependency = await fetchDependency(name, false);
  const respository = dependency.versions[dependency["dist-tags"].latest].repository;
  if (!respository) return;

  return storeDependencyRepository(name, respository);
}
