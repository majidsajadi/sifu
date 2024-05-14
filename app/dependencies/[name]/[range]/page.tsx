import { getDependencyAvailableVersions } from "@/lib";
import Link from "next/link";
import semver from "semver";

export default async function Page({
  params,
}: {
  params: { name: string; range: string };
}) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
  const current = semver.minVersion(range);
  if (!current) throw new Error("Unable to find installed version");
  const { available } = await getDependencyAvailableVersions(name, range);

  return (
    <>
      <div>
        {name} - {range}
      </div>
      <ul>
        {available.map(({ version, date, satisfies, deprecated }) => (
          <li key={version}>
            {version} - {date} - {satisfies && "satisfies"} -{" "}
            {deprecated && "deprecated"}
            <Link href={`/compare/${name}/${current}/${version}`}>Detail</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
