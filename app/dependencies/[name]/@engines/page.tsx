import { compareEngines } from "@/lib/dependency";
import { Badge, Table } from "@radix-ui/themes";
import type { TObjectPropertyDiff } from "@/lib/dependency";
import CEmpty from "../(common)/empty";
import type { TDependenciesNamePageProps } from "../types";

export default async function Page({ params, searchParams }: TDependenciesNamePageProps) {
  const response = await compareEngines(decodeURIComponent(params.name), searchParams.source, searchParams.target);

  const getStatus = (item: TObjectPropertyDiff) => {
    if (!item.source) return <Badge color="green">New</Badge>;

    if (!item.target) return <Badge color="red">Removed</Badge>;

    if (item.target === item.source) return <Badge color="gray">Same</Badge>;

    return <Badge>Updated</Badge>;
  };

  if (!searchParams.source || !searchParams.target) return <CEmpty message="Please select `source` and `target`" />;

  if (!response?.length) return <CEmpty message="No engines found" />;

  return (
    <Table.Root variant="surface" size="1">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>From</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>To</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {response.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{getStatus(item)}</Table.Cell>
            <Table.Cell>{item.source}</Table.Cell>
            <Table.Cell>{item.target}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
