import { getDependencyCommitsBetweenVersions } from "@/lib/commit";
import { TRepository } from "@/lib/dependency";

type TCommitProps = {
  repository?: TRepository;
  from: string;
  to: string;
};

export async function Commit({ repository, from, to }: TCommitProps) {
  if (!repository) return <div>No repository found</div>;
  const { commits } = await getDependencyCommitsBetweenVersions({
    owner: repository.owner,
    repo: repository.repo,
    from,
    to,
  });

  return (
    <>
      <div>{repository.url}</div>
      <div>{repository.repo} - {repository.owner}</div>
      <br />
      <ul>
        {commits.map((commits) => (
          <li key={commits.sha}>
            <div>
              <span>{commits.sha}</span>
              <span>{commits.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CommitLoading() {
  return <div>loading</div>;
}
