import { getDependency } from "@/lib/dependency";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { name: string; range: string };
}) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
  const { availableVersions } = await getDependency(name, range);

  return (
    <>
      <div>
        {name} - {range}
      </div>
      <ul>
        {availableVersions.available.map(
          ({ version, date, satisfies, deprecated }) => (
            <li key={version}>
              {version} - {date} - {satisfies && "satisfies"} -{" "}
              {deprecated && "deprecated"}
              <Link href={`/compare/${encodeURIComponent(name)}/${range}/${version}`}>
                Detail
              </Link>
            </li>
          )
        )}
      </ul>
    </>
  );
}
