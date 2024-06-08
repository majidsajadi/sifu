import Link from "next/link";
import {
  Badge,
  Flex,
  Card,
  Text,
  Box,
  Tooltip,
  IconButton,
  Link as NavLink,
} from "@radix-ui/themes";
import { CircleIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { getCommits } from "@/internal";
import CEmpty from "../(common)/empty";

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const response = await getCommits(
    decodeURIComponent(params.name),
    searchParams.source,
    searchParams.target
  );

  if (!response?.commits) return <CEmpty message="No commit found" />;

  return (
    <Flex direction="column" gap="4">
      <Flex gap="2" direction="row-reverse" align="center">
        <Tooltip content="View compare in Github">
          <IconButton asChild size="2" variant="soft" color="gray">
            <Link target="_blank" href={response.url}>
              <ExternalLinkIcon />
            </Link>
          </IconButton>
        </Tooltip>
        <Badge size="2" color="gray" variant="soft">
          {response.total} commits
        </Badge>
        <Badge size="2" color="gray" variant="soft">
          {response.files} files change
        </Badge>
      </Flex>
      <Card size="2">
        <Flex direction="column" gap="1">
          {response.commits.map((commit, index) => (
            <Flex align="stretch" gap="3" key={commit.sha}>
              <Flex direction="column" align="center" gap="1">
                <CircleIcon color="var(--gray-9)" width={12} height={12} />
                {index + 1 !== response.commits.length && (
                  <Box
                    minHeight="32px"
                    height="100%"
                    style={{
                      borderLeft: "1px solid var(--gray-a6)",
                    }}
                  ></Box>
                )}
              </Flex>
              <Flex direction="column" gap="1" pb="4">
                <Text trim="start">
                  <NavLink asChild>
                    <Link target="_blank" href={commit.url}>
                      {commit.sha.substring(0, 7)}
                    </Link>
                  </NavLink>
                  :
                  <Flex direction="column">
                    {commit.message
                      .split("\n")
                      .filter(Boolean)
                      .map((line, index, lines) => (
                        <Text key={line} mb={index === 0 && lines.length > 1 ? "4" : "0"}>
                          {line}
                        </Text>
                      ))}
                  </Flex>
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
      </Card>
    </Flex>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
