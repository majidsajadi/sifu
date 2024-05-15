import { Changelog, ChangelogLoading } from "@/components/changelog";
import { Commit, CommitLoading } from "@/components/commit";
import { getDependency } from "@/lib/dependency";
import { Suspense } from "react";
import semver from "semver";

export default async function Page({
  params,
}: {
  params: { name: string; range: string; target: string };
}) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
  const target = decodeURIComponent(params.target);
  const current = semver.minVersion(range)?.toString();
  if (!current) return <div>error: no current</div>;

  const { repository } = await getDependency(name, range);

  return (
    <>
      <div>
        {name} - {range} - {target}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <div>
          <Suspense fallback={<CommitLoading />}>
            <Commit repository={repository} from={current} to={target} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<ChangelogLoading />}>
            <Changelog repository={repository} from={current} to={target} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
