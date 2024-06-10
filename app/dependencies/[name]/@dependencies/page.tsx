import Link from "next/link";
import { compareDependencies, TObjectPropertyDiff } from "@/lib/dependency";
import { minVersion } from "semver";
import { Badge, Button, Card, Flex, Table, Text } from "@radix-ui/themes";
import { ArchiveIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import type { TDependenciesNamePageProps } from "../types";

export default async function Page({ params, searchParams }: TDependenciesNamePageProps) {
  const name = decodeURIComponent(params.name);
  const response = await compareDependencies(name, searchParams.source, searchParams.target);

  const getStatus = (item: TObjectPropertyDiff) => {
    if (!item.source) return <Badge color="green">New</Badge>;

    if (!item.target) return <Badge color="red">Removed</Badge>;

    if (item.target === item.source) return <Badge color="gray">Same</Badge>;

    return <Badge>Updated</Badge>;
  };

  if (!response?.length)
    return (
      <Card>
        <Flex align="center" justify="center" height="240px" direction="column" gap="2">
          <Text trim="both" color="gray">
            <ArchiveIcon />
          </Text>
          <Text color="gray">No dependencies found</Text>
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
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {response.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{getStatus(item)}</Table.Cell>
            <Table.Cell>{item.source}</Table.Cell>
            <Table.Cell>{item.target}</Table.Cell>
            <Table.Cell justify="end">
              {!!item.source && !!item.target && item.target !== item.source && (
                <Button size="1" asChild>
                  <Link
                    href={`/dependencies/${name}?source=${minVersion(item.source)}&target=${minVersion(item.target)}`}
                  >
                    <ExternalLinkIcon /> Detail
                  </Link>
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
