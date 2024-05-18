import { Dependency, DependencyLoading } from "@/components/dependency";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type SearchParams = { dep?: string | string[] };

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const dependencies = parseDependencyList(searchParams.dep);
  if (!dependencies.length) redirect("/upload");

  return (
    <div>
      {dependencies.map((dep) => (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<DependencyLoading />} key={dep.name}>
            <Dependency {...dep} />
          </Suspense>
        </ErrorBoundary>
      ))}
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
