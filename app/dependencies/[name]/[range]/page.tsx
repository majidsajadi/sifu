import { getDependencyAvailableVersions } from "@/lib";

export default async function Page({
  params,
}: {
  params: { name: string; range: string };
}) {
  const name = decodeURIComponent(params.name);
  const range = decodeURIComponent(params.range);
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
          </li>
        ))}
      </ul>
    </>
  );
}
