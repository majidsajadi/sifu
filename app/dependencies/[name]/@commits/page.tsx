import { Badge, Flex, Card, IconButton } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { getCommits } from "@/core";

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const response = await getCommits(params.name, searchParams.source, searchParams.target);

  return (
    <Card>
      <Flex direction="column" gap="2">
        <Flex gap="2" direction="row-reverse" align="center">
          <IconButton size="2" variant="soft" color="gray">
            <ExternalLinkIcon />
          </IconButton>
          {/* {response?.total && <Badge size="2" color="gray" variant="soft">
            {response.total} commits
          </Badge>}
          {response?.files && <Badge size="2" color="gray" variant="soft">
            {response.files} files change
          </Badge>} */}
        </Flex>
        <Flex>asdasd</Flex>
      </Flex>
    </Card>
  );
}
