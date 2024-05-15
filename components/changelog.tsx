import { getDependencyChangelogBetweenVersions } from "@/lib/changelog";
import { TRepository } from "@/lib/dependency";

type TCommitProps = {
  repository?: TRepository;
  from: string;
  to: string;
};

export async function Changelog({ repository, from, to }: TCommitProps) {
  if (!repository) return <div>No repository found</div>;
  const { entries } = await getDependencyChangelogBetweenVersions({
    owner: repository.owner,
    repo: repository.repo,
    // directory: repository.directory,
    from,
    to,
  });

  return (
    <>
      <div>{repository.url}</div>
      <div>
        {repository.repo} - {repository.owner}
      </div>
      <br />
      <ul>
        {entries.map((entry) => (
          <li key={entry.version}>
            <div>{entry.version}</div>
            <div>{entry.content}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ChangelogLoading() {
  return <div>loading</div>;
}
