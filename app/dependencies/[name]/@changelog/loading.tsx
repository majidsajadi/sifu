import { Spinner, Card, Text, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Card style={{ height: 420 }}>
      <Flex
        align="center"
        justify="center"
        height="100%"
        direction="column"
        gap="2"
      >
        <Spinner size="3" />
        <Text size="2" color="gray">
          Fetching and parsing changelog...
        </Text>
      </Flex>
    </Card>
  );
}
