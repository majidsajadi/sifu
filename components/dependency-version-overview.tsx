import Link from "next/link";
import { getDependency } from "@/lib/dependency";
import { Skeleton } from "@/ui/skeleton";
import styles from "./dependency-version-overview.module.css";
import { Button } from "@/ui/button";
import { Version } from "./version";

type TDependencyVersionOverviewProps = {
  name: string;
  range: string;
};

export async function DependencyVersionOverview({
  name,
  range,
}: TDependencyVersionOverviewProps) {
  const { availableVersions } = await getDependency(name, range);
  const { latest, latestSatisfies, availableCount, availableSatisfiesCount } =
    availableVersions;

  const href = `/dependencies/${encodeURIComponent(name)}/${range}`;

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Version value={latestSatisfies} range={range} />
      </div>
      <div className={styles.column}>
        <Version value={latest} range={range} />
      </div>
      <div className={styles.column}>
        {availableCount} ({availableSatisfiesCount})
      </div>
      <div className={styles.last}>
        <Button variant="link" asChild>
          <Link href={href}>More</Link>
        </Button>
      </div>
    </div>
  );
}

export function DependencyVersionOverviewLoading() {
  return <Skeleton />;
}

export function DependencyVersionOverviewError() {
  return <div>Error...</div>;
}
