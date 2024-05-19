import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import type { TComparePageProps } from "../types";
import { getDependencyChangelogBetweenVersions } from "@/lib/changelog";
import semver from "semver";

export default async function Page({
  params,
  searchParams,
}: TComparePageProps) {
  const { range, repo, owner, version: to, directory } = searchParams;
  const from = range && semver.minVersion(range)?.toString();

  if (!from || !repo || !owner || !to)
    throw new Error("Unexpected error occurred");

  const { entries } = await getDependencyChangelogBetweenVersions({
    directory,
    repo,
    owner,
    from,
    to,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changelog</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {entries.map((entry) => (
            <li key={entry.version}>
              <div>
                <span>{entry.version}</span>
                <span>{entry.content}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
