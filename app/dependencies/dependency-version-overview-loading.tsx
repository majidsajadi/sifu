import { Skeleton, Table } from "@radix-ui/themes";

export function DependencyVersionOverviewLoading() {
  return (
    <>
      <Table.Cell>
        <Skeleton>0.0.0</Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
    </>
  );
}
