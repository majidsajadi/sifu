import { TDependencyMetadata, fetchDependencyMetadata } from "./npm";
import { getDependencyAvailableVersions } from "./version";

export type TRepository = {
  url: string;
  owner: string;
  repo: string;
  directory: string;
};

function getRepository(
  repository: TDependencyMetadata["repository"]
): TRepository | undefined {
  const url =
    typeof repository === "string"
      ? repository
      : repository?.type === "git"
      ? repository.url
      : undefined;
  if (!url) return;

  const directory =
    typeof repository === "object" && repository?.directory
      ? repository?.directory
      : "";

  const { hostname, href, pathname } = new URL(url);

  if (hostname !== "github.com") {
    return;
  }

  let path = pathname.replace(".git", "");
  if (path.charAt(0) === "/") {
    path = path.substring(1, pathname.length);
  }

  const [owner, repo] = path.split("/");

  return {
    url: href,
    owner,
    repo,
    directory,
  };
}

export async function getDependency(dependency: string, range: string) {
  const metadata = await fetchDependencyMetadata(dependency);
  const repository = getRepository(metadata.repository);
  const availableVersions = getDependencyAvailableVersions(metadata, range);

  return {
    repository,
    availableVersions,
  };
}
