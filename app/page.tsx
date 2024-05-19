import {
  DependencyVersionOverview,
  DependencyVersionOverviewError,
  DependencyVersionOverviewLoading,
} from "@/components/dependency-version-overview";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./page.module.css";
import { Skeleton } from "@/ui/skeleton";
import { Info } from "lucide-react";

type SearchParams = { dep?: string | string[] };

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const dependencies = parseDependencyList(searchParams.dep);
  if (!dependencies.length) redirect("/upload");

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.group}>
          <div className={styles.column}>Name</div>
          <div className={styles.column}>Range</div>
        </div>
        <div className={styles.group}>
          <div className={styles.column}>Latest Satisfies</div>
          <div className={styles.column}>Latest</div>
          <div className={styles.column}>Available (Satisfies)</div>
          <div className={styles.column}></div>
        </div>
      </div>
      <ul className={styles.list}>
        {dependencies.map((dep) => (
          <li key={dep.name} className={styles.row}>
            <div className={styles.group}>
              <div className={styles.column}>{dep.name}</div>
              <div className={styles.column}>{dep.range}</div>
            </div>
            <div className={styles.group}>
              <ErrorBoundary fallback={<DependencyVersionOverviewError />}>
                <Suspense fallback={<DependencyVersionOverviewLoading />}>
                  <DependencyVersionOverview {...dep} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function parseDependencyList(search?: string | string[]) {
  if (!search) return [];

  const dependencies = Array.isArray(search) ? search : [search];

  return dependencies.map((dependency) => {
    const parts = decodeURIComponent(dependency).split(",");
    return {
      name: parts[0],
      range: parts[1],
    };
  });
}
