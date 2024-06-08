import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Table } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { DependencyVersionOverview } from "./dependency-version-overview";
import { DependencyVersionOverviewError } from "./dependency-version-overview-error";
import { DependencyVersionOverviewLoading } from "./dependency-version-overview-loading";

export default function Page({ searchParams }: { searchParams: { dep?: string | string[] } }) {
  const dependencies = parseDependencyList(searchParams.dep);

  if (!dependencies.length) redirect("/upload");

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Dependency</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Range</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Latest Satisfies</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Latest</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {dependencies.map((dep) => (
          <Table.Row key={dep.name}>
            <Table.RowHeaderCell>{dep.name}</Table.RowHeaderCell>
            <Table.Cell>{dep.range}</Table.Cell>
            <ErrorBoundary fallback={<DependencyVersionOverviewError />}>
              <Suspense fallback={<DependencyVersionOverviewLoading />}>
                <DependencyVersionOverview name={dep.name} range={dep.range} />
              </Suspense>
            </ErrorBoundary>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function parseDependencyList(search?: string | string[]) {
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
