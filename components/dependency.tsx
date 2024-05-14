import { getDependencyAvailableVersions } from "@/lib";
import Link from "next/link";

type TDependencyProps = {
  name: string;
  range: string;
};

export async function Dependency({ name, range }: TDependencyProps) {
  const { latest, latestSatisfies, availableCount, availableSatisfiesCount } =
    await getDependencyAvailableVersions(name, range);

  return (
    <div>
      <div>name: {name}</div>
      <div>range: {range}</div>
      <div>latest: {latest}</div>
      <div>latest satisfies: {latestSatisfies}</div>
      <div>available count: {availableCount}</div>
      <div>available satisfies count: {availableSatisfiesCount}</div>
      <Link
        href={`/dependencies/${encodeURIComponent(name)}/${encodeURIComponent(
          range
        )}`}
      >
        Detail
      </Link>
      <br />
    </div>
  );
}

export function DependencyLoading() {
  return <div>loading</div>;
}
