import { Spinner, Card, Text, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Card>
      <Flex
        align="center"
        justify="center"
        height="240px"
        direction="column"
        gap="2"
      >
        <Spinner size="3" />
        <Text color="gray">Fetching commits...</Text>
      </Flex>
    </Card>
  );
}
