import semver from "semver";
import NextLink from "next/link";
import {
  Flex,
  Text,
  Badge,
  Table,
  IconButton,
  Tooltip,
  type BadgeProps,
} from "@radix-ui/themes";
import {
  CheckIcon,
  CircleBackslashIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { TSeverity, getVulnerabilities } from "@/core/vulnerabilities";
import CEmpty from "../(common)/empty";

const SEVERITY_COLORS: Record<TSeverity, BadgeProps["color"]> = {
  critical: "red",
  high: "orange",
  medium: "yellow",
  low: "gray",
};

type TPageProps = {
  params: { name: string };
  searchParams: { source?: string; target?: string };
};

export default async function Page({ params, searchParams }: TPageProps) {
  const { source, target } = searchParams;
  const response = await getVulnerabilities(
    decodeURIComponent(params.name),
    searchParams.source,
    searchParams.target
  );

  if (!source || !target)
    return <CEmpty message="Please select `source` and `target`" />;

  if (!response?.length) return <CEmpty message="No vulnerabilities found" />;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Vulnerability</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{source}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{target}</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {response.map((vulnerability) => (
          <Table.Row key={vulnerability.id}>
            <Table.RowHeaderCell>
              <Flex gap="2" align="center">
                <Badge
                  variant="solid"
                  color={SEVERITY_COLORS[vulnerability.severity]}
                >
                  {vulnerability.severity}
                </Badge>
                <Text>{vulnerability.title}</Text>
                <Tooltip content="View in Github">
                  <IconButton asChild size="1" variant="ghost" color="gray">
                    <NextLink href={vulnerability.url}>
                      <ExternalLinkIcon />
                    </NextLink>
                  </IconButton>
                </Tooltip>
              </Flex>
            </Table.RowHeaderCell>
            <Table.Cell>
              {semver.satisfies(source, vulnerability.vulnerable_versions) ? (
                <Badge size="3" color="red">
                  <CircleBackslashIcon /> Affected
                </Badge>
              ) : (
                <Badge size="3" color="green">
                  <CheckIcon /> Not Affected
                </Badge>
              )}
            </Table.Cell>
            <Table.Cell>
              {semver.satisfies(target, vulnerability.vulnerable_versions) ? (
                <Badge size="3" color="red">
                  <CircleBackslashIcon /> Affected
                </Badge>
              ) : (
                <Badge size="3" color="green">
                  <CheckIcon /> Not Affected
                </Badge>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}