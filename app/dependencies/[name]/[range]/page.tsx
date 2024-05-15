import querystring from "node:querystring";
import Link from "next/link";
import { getDependency } from "@/lib/dependency";
import { TDependenciesPageProps } from "./types";

export default async function Page({ params }: TDependenciesPageProps) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
  const { availableVersions, repository } = await getDependency(name, range);

  return (
    <>
      <div>
        {name} - {range}
      </div>
      <ul>
        {availableVersions.available.map(
          ({ version, date, satisfies, deprecated }) => {
            const query = querystring.stringify({
              owner: repository?.owner,
              repo: repository?.repo,
              directory: repository?.directory,
              range,
              version,
            });
            const href = `/compare/${params.name}?${query}`;

            return (
              <li key={version}>
                {version} - {date} - {satisfies && "satisfies"} -{" "}
                {deprecated && "deprecated"}
                <Link href={href}>Detail</Link>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
}
