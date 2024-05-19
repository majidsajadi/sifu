import { getDependency } from "@/lib/dependency";
import { Skeleton } from "@/ui/skeleton";
import styles from "./dependency-version-overview.module.css";
import { Version } from "./version";
import clsx from "clsx";
import { fromNowInDays } from "@/utils/date";

type TDependencyVersionOverviewProps = {
  name: string;
  range: string;
};

export async function DependencyVersionOverview({
  name,
  range,
}: TDependencyVersionOverviewProps) {
  const { availableVersions } = await getDependency(name, range);
  const {
    latest,
    latestTime,
    latestSatisfies,
    latestSatisfiesTime,
    availableCount,
    availableSatisfiesCount,
  } = availableVersions;

  return (
    <div className={clsx(styles.container, !availableCount && styles.updated)}>
      <div className={styles.column}>
        <Version value={latestSatisfies} range={range} />
        {latestSatisfiesTime && (
          <span className={styles.date}>
            ({fromNowInDays(latestSatisfiesTime)})
          </span>
        )}
      </div>
      <div className={styles.column}>
        <Version value={latest} range={range} />
        <span className={styles.date}>({fromNowInDays(latestTime)})</span>
      </div>
      <div className={styles.column}>
        {availableCount} ({availableSatisfiesCount})
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
