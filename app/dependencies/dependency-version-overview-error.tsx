import { Table, Text } from "@radix-ui/themes";

export function DependencyVersionOverviewError() {
  return (
    <Table.Cell colSpan={2}>
      <Text color="red">Error</Text>
    </Table.Cell>
  );
}
