import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { SearchDependency } from "./search-dependency";

export default function Page() {
  return (
    <Flex direction="column" height="100%" align="center" gap="4" pt="9">
      <Heading mt="9" size="4" weight="regular">
        Update your product dependencies with insight
      </Heading>
      <SearchDependency />
      <Flex align="center" gap="3">
        <Text size="2" color="gray">
          or
        </Text>
        <Button variant="ghost">Upload package.json</Button>
      </Flex>
    </Flex>
  );
}
