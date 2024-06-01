import { Flex, Box, Card, Heading, Select } from "@radix-ui/themes";

type TPageProps = {
  params: { name: string };
};

export default async function Page({ params }: TPageProps) {
  return (
    <Flex gap="4" align="center" minHeight="32px">
      <Box flexGrow="1">
        <Card variant="ghost">
          <Heading size="5" weight="medium">
            React
          </Heading>
        </Card>
      </Box>
      <Flex gap="2">
        <Select.Root>
          <Select.Trigger
            placeholder="Select `source` version"
            variant="soft"
            color="gray"
          />
          <Select.Content position="popper">
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Content>
        </Select.Root>
        <Select.Root>
          <Select.Trigger
            placeholder="Select `target` version"
            variant="soft"
            color="gray"
          />
          <Select.Content position="popper">
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
}
