import Link from "next/link";
import {
  Badge,
  Flex,
  Card,
  Heading,
  Text,
  Box,
  Tooltip,
  IconButton,
  Link as NavLink,
} from "@radix-ui/themes";
import {
  ArchiveIcon,
  CircleIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { getCommits } from "@/core";
import { formatDate } from "@/utils/date";

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const response = await getCommits(
    params.name,
    searchParams.source,
    searchParams.target
  );

  if (!response?.commits)
    return (
      <Card>
        <Flex
          align="center"
          justify="center"
          height="240px"
          direction="column"
          gap="2"
        >
          <Text trim="both" color="gray">
            <ArchiveIcon />
          </Text>
          <Text color="gray">No commit found</Text>
        </Flex>
      </Card>
    );

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex gap="2" justify="between" align="center" mb="2">
          <Heading size="3">Commits between versions</Heading>
          <Flex align="center" gap="2">
            <Tooltip content="View compare in Github">
              <IconButton asChild size="1" variant="soft" color="gray">
                <Link target="_blank" href={response.url}>
                  <ExternalLinkIcon />
                </Link>
              </IconButton>
            </Tooltip>
            <Badge color="gray" variant="soft">
              {response.total} commits
            </Badge>
            <Badge color="gray" variant="soft">
              {response.files} files change
            </Badge>
          </Flex>
        </Flex>
        <Flex direction="column" gap="1">
          {response.commits.map((commit) => (
            <Flex align="stretch" gap="3" key={commit.sha}>
              <Flex direction="column" align="center" gap="1">
                <CircleIcon color="var(--gray-9)" width={12} height={12} />
                <Box
                  flexGrow="1"
                  minHeight="32px"
                  height="100%"
                  style={{
                    borderLeft: "1px solid var(--gray-a6)",
                  }}
                ></Box>
              </Flex>
              <Flex direction="column" gap="1" pb="4">
                <Text trim="start">
                  <NavLink asChild>
                    <Link target="_blank" href={commit.url}>
                      {commit.sha.substring(0, 7)}
                    </Link>
                  </NavLink>
                  : {commit.message}
                </Text>
                {commit.author && commit.date && (
                  <Text color="gray" size="2">
                    authored by{" "}
                    <NavLink asChild>
                      <Link target="_blank" href={commit.author.url}>
                        {commit.author?.name}
                      </Link>
                    </NavLink>{" "}
                    on {formatDate(commit.date)}
                  </Text>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
