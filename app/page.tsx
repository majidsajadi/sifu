import { Dependency, DependencyLoading } from "@/components/dependency";
import { Suspense } from "react";

type SearchParams = { dep?: string | string[] };

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const dependencies = parseDependencyList(searchParams.dep);

  return (
    <main>
      {dependencies.map((dep) => (
        <Suspense fallback={<DependencyLoading />}>
          <Dependency {...dep} />
        </Suspense>
      ))}
    </main>
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
