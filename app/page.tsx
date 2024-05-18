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
      <div>
        <div>
          <span>Name</span>
          <span>Range</span>
        </div>
        <div>
          <span>Latest Satisfies</span>
          <span>Latest Satisfies</span>
          <span>Count</span>
        </div>
      </div>
      <ul>
        {dependencies.map((dep) => (
          <li key={dep.name}>
            <div>{dep.name}</div>
          </li>
          // <ErrorBoundary fallback={<div>Something went wrong</div>}>
          //   <Suspense fallback={<DependencyLoading />} key={dep.name}>
          //     <Dependency {...dep} />
          //   </Suspense>
          // </ErrorBoundary>
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
