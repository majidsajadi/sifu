import { Badge, Flex, Card, IconButton } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

type TPageProps = {
  params: { name: string };
};

export default async function Page({ params }: TPageProps) {
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Flex gap="2" direction="row-reverse" align="center">
          <IconButton size="2" variant="soft" color="gray">
            <ExternalLinkIcon />
          </IconButton>
          <Badge size="2" color="gray" variant="soft">
            3 releases
          </Badge>
        </Flex>
        <Flex>asdasd</Flex>
      </Flex>
    </Card>
  );
}
