import { TRegistryVersionRepository } from "./registry";

type IDependencyRepository = { owner: string; repo: string; directory: undefined | string };

const dependencyRepositories = new Map<string, IDependencyRepository>();

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
  return dependencyRepositories.has(name);
}

export function storeDependencyRepository(name: string, repository?: TRegistryVersionRepository) {
  if (!repository) return;

  try {
    const dependencyRepository = parseDependencyRepository(repository);
    dependencyRepositories.set(name, dependencyRepository);
  } catch (error) {
    // gracefull
    return;
  }
}

export function getDependencyRepository(name: string) {
  return dependencyRepositories.get(name);
}
