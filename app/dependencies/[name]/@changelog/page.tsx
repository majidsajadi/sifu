import Link from "next/link";
import { getChangelog } from "@/lib/changelog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge, Card, Flex, Heading, IconButton, Theme } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import CEmpty from "../(common)/empty";

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const response = await getChangelog(params.name, searchParams.source, searchParams.target);

  if (!response?.entries) return <CEmpty message="No changelog found" />;

  return (
    <Flex direction="column" gap="4">
      <Flex gap="2" direction="row-reverse" align="center">
        <IconButton size="2" variant="soft" color="gray" asChild>
          <Link href={response.href}>
            <ExternalLinkIcon />
          </Link>
        </IconButton>
        <Badge size="2" color="gray" variant="soft">
          {response.entries.length} releases
        </Badge>
      </Flex>
      <Flex direction="column">
        <Theme scaling="90%">
          {response.entries.map((entry) => (
            <Card size="1" key={entry.version} mb="4">
              <Heading size="6">{entry.version}</Heading>
              <MDXRemote source={entry.content} />
            </Card>
          ))}
        </Theme>
      </Flex>
    </Flex>
  );
}
