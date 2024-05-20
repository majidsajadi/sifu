import { github } from "./github";

type TGetCommitsParams = {
  /**
   * Github repository name
   */
  repo: string;
  /**
   * Github user/organization
   */
  owner: string;
  /**
   * Represents the starting point or lower bound for filtering items
   */
  from: string;
  /**
   * Represents the ending point or upper bound for filtering items.
   */
  to: string;
};

/**
 * Fetches and return commits between to version of a dependency (and reporting stats)
 */
export async function getCommits({ repo, owner, from, to }: TGetCommitsParams) {
  const { data } = await github.compareCommitsWithBasehead({
    owner,
    repo,
    basehead: `v${from}...v${to}`,
  });

  const total = data.total_commits;
  const url = data.html_url;
  const files = data.files?.length ?? 0;

  // calculate total changes for all commits
  const { deletions, additions, changes } = (data.files || []).reduce(
    (prev, curr) => {
      return {
        deletions: prev.deletions + curr.deletions,
        additions: prev.additions + curr.additions,
        changes: prev.changes + curr.changes,
      };
    },
    { deletions: 0, additions: 0, changes: 0 }
  );

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
    deletions,
    additions,
    changes,
    files,
    url,
    total,
    commits,
  };
}