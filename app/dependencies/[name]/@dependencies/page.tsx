import Link from "next/link";
import { minVersion } from "semver";
import { Badge, Button, Card, Flex, Table, Text } from "@radix-ui/themes";
import { ArchiveIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import type { TDependencyDiff } from "@/lib";
import { getDependencies } from "@/lib";
import type { TDependenciesNamePageProps } from "../types";

export default async function Page({ params, searchParams }: TDependenciesNamePageProps) {
  const response = await getDependencies(decodeURIComponent(params.name), searchParams.source, searchParams.target);

  const getStatus = (item: TDependencyDiff) => {
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
            <Table.Cell>{item.before}</Table.Cell>
            <Table.Cell>{item.after}</Table.Cell>
            <Table.Cell justify="end">
              {!!item.before && !!item.after && item.after !== item.before && (
                <Button size="1" asChild>
                  <Link
                    href={`/dependencies/${encodeURIComponent(
                      item.name
                    )}?source=${minVersion(item.before)}&target=${minVersion(item.after)}`}
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
