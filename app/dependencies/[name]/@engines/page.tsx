import { Flex, Card, Text, Table, Badge } from "@radix-ui/themes";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { type TEngineDiff, getEngines } from "@/internal";

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const response = await getEngines(
    decodeURIComponent(params.name),
    searchParams.source,
    searchParams.target
  );

  const getStatus = (item: TEngineDiff) => {
    if (!item.before) return <Badge color="green">New</Badge>;

    if (!item.after) return <Badge color="red">Removed</Badge>;

    if (item.after === item.before) return <Badge color="gray">Same</Badge>;

    return <Badge>Updated</Badge>;
  };

  if (!response?.length)
    return (
      <Card>
        <Flex align="center" justify="center" height="240px" direction="column" gap="2">
          <Text trim="both" color="gray">
            <ArchiveIcon />
          </Text>
          <Text color="gray">No engines found</Text>
        </Flex>
      </Card>
    );

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
            <Table.Cell>{item.before}</Table.Cell>
            <Table.Cell>{item.after}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
