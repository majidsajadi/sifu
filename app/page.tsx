import { Flex, Text } from "@radix-ui/themes";
import { SearchDependency } from "./search-dependency";
import { UploadManifest } from "./upload-manifest";

export default function Page() {
  return (
    <Flex direction="column" height="100%" align="center" gap="4" mt="9" pt="9">
      <SearchDependency />
      <Flex gap="3">
        <Text size="2" color="gray">
          or
        </Text>
        <UploadManifest />
      </Flex>
    </Flex>
  );
}
