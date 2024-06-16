import semver from "semver";

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
