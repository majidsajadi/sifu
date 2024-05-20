import semver from "semver";
import { github } from "./github";

const POSSIBLE_CHANGELOG_FILE_NAME = [
  "CHANGELOG.md",
  "HISTORY.md",
  "RELEASES.md",
  "changelog.md",
  "NEWS.md",
];
const ENTRY_HEADING_REGEX = /^##\s.*$/;
const SEMVER_HEADING_REGEX =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

type TRepository = {
  /**
   * Github repository name
   */
  repo: string;
  /**
   * Github user/organization
   */
  owner: string;
};

type TParseFilter = {
  /**
   * Represents the starting point or lower bound for filtering items
   */
  from: string;
  /**
   * Represents the ending point or upper bound for filtering items.
   */
  to: string;
};

type TFindChangelogParams = TRepository & {
  /**
   * The branch to look for the changelog
   * @default "main"
   */
  branch?: string;
  /**
   * path of the package.json in case the repository is monorepo and hosts more than one dependency
   * @default ""
   */
  directory?: string;
};

/**
 * Try to look for changelog file in a Github repository by sending head request to some possible locations
 */
async function findChangelog(params: TFindChangelogParams) {
  const { owner, repo, ...options } = params;
  // TODO: search in other common branches too. ex. `master`
  const branch = options.branch ?? "main";
  // TODO: try to figure out if the repository is monorepo and get the directory from the workspaces?
  const directory =  "";

  // TODO: handle other git hostings. ex. gitlab, bitbucket
  const baseURL = `https://github.com/${owner}/${repo}/blob/${branch}`;

  // sending request sequenctially because we can prevent a lot of requests since the list of possible changelog file name is sorted by chance
  let path = "";
  for (const filename of POSSIBLE_CHANGELOG_FILE_NAME) {
    path = `${directory}/${filename}`;
    const url = `${baseURL}/${path}`;
    const hit = await fetch(url, { method: "HEAD" });
    if (hit.ok) {
      break;
    }
    path = ''
  }

  if (!path) throw new Error("Couldn't find the changelog");

  return {
    href: `${baseURL}/${path}`,
    path,
  };
}

type TFetchChangelogParams = TRepository & {
  /**
   * path to the changelog file in the repository
   */
  path: string;
};

/**
 * Fetches changelog file content from Github
 */
async function fetchChangelog({ path, repo, owner }: TFetchChangelogParams) {
  const response = await github.getContent({
    repo,
    owner,
    path,
  });

  const content = (response.data as any).content as string;
  return Buffer.from(content, "base64").toString();
}

type TParseChangelogParams = TParseFilter & {
  /**
   * The string content of changelog
   */
  content: string;
};
/**
 * Parse the changelog and returns the list of version entries in changelog filtered by `from` and `to`
 */
function parseChangelog({ content, from, to }: TParseChangelogParams) {
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

type TGetDependencyChangelogBetweenVersionsParams = TFindChangelogParams &
  TParseFilter;

/**
 * Finds, fetch and parse change log and return the changlog entries according to from and to filters
 */
export async function getDependencyChangelogBetweenVersions({
  from,
  to,
  owner,
  repo,
  directory,
  branch,
}: TGetDependencyChangelogBetweenVersionsParams) {
  const { path, href } = await findChangelog({
    repo,
    owner,
    directory,
    branch,
  });
  const content = await fetchChangelog({
    owner,
    repo,
    path,
  });

  const entries = await parseChangelog({ content, from, to });

  return {
    href,
    entries,
  };
}
