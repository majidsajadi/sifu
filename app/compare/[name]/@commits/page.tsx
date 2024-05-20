import semver from "semver";
import { TComparePageProps } from "@/app/compare/[name]/types";
import { getCommits } from "@/lib/commit";

export default async function Page({ searchParams }: TComparePageProps) {
  const { range, repo, owner, version: to } = searchParams;
  const from = range && semver.minVersion(range)?.toString();

  if (!from || !repo || !owner || !to)
    throw new Error("Unexpected error occurred");

  const result = await getCommits({
    repo,
    owner,
    from,
    to,
  });

  return (
    <ul>
      {result.commits.map((commits) => (
        <li key={commits.sha}>
          <div>
            <span>{commits.sha}</span>
            <span>{commits.message}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
