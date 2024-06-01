import { Badge, Flex, Card, IconButton } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default async function Page() {
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Flex gap="2" direction="row-reverse" align="center">
          <IconButton size="2" variant="soft" color="gray">
            <ExternalLinkIcon />
          </IconButton>
          <Badge size="2" color="gray" variant="solid" highContrast>
            12 commits
          </Badge>
          <Badge size="2" color="gray" variant="solid" highContrast>
            73 files change
          </Badge>
        </Flex>
        <Flex>asdasd</Flex>
      </Flex>
    </Card>
  );
}
