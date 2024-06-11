import NextLink from "next/link";
import semver from "semver";
import { Badge, Flex, IconButton, Table, Text, Tooltip } from "@radix-ui/themes";
import { CheckIcon, CircleBackslashIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import type { TSeverity } from "@/lib/registry";
import type { BadgeProps } from "@radix-ui/themes";
import { getAdvisories } from "@/lib/dependency";
import CEmpty from "../(common)/empty";
import type { TDependenciesNamePageProps } from "../types";

const SEVERITY_COLORS: Record<TSeverity, BadgeProps["color"]> = {
  critical: "red",
  high: "orange",
  medium: "yellow",
  low: "gray",
};

export default async function Page({ params, searchParams }: TDependenciesNamePageProps) {
  const { source, target } = searchParams;
  const response = await getAdvisories(decodeURIComponent(params.name), searchParams.source, searchParams.target);

  if (!source || !target) return <CEmpty message="Please select `source` and `target`" />;

  if (!response?.length) return <CEmpty message="No advisories found" />;

  return (
    <Table.Root  variant="surface" size="1">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Advisories</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{source}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{target}</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {response.map(({ id, severity, title, url, vulnerable_versions }) => (
          <Table.Row key={id}>
            <Table.RowHeaderCell>
              <Flex gap="2" align="center">
                <Badge variant="solid" color={SEVERITY_COLORS[severity]}>
                  {severity}
                </Badge>
                <Text>{title}</Text>
                <Tooltip content="View in Github">
                  <IconButton asChild size="1" variant="ghost" color="gray">
                    <NextLink href={url}>
                      <ExternalLinkIcon />
                    </NextLink>
                  </IconButton>
                </Tooltip>
              </Flex>
            </Table.RowHeaderCell>
            <Table.Cell>
              {semver.satisfies(source, vulnerable_versions) ? (
                <Badge color="red">
                  <CircleBackslashIcon /> Affected
                </Badge>
              ) : (
                <Badge color="green">
                  <CheckIcon /> Not Affected
                </Badge>
              )}
            </Table.Cell>
            <Table.Cell>
              {semver.satisfies(target, vulnerable_versions) ? (
                <Badge color="red">
                  <CircleBackslashIcon /> Affected
                </Badge>
              ) : (
                <Badge color="green">
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
