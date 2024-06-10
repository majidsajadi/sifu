import NextLink from "next/link";
import { getDependencyVersionOverview } from "@/lib/dependency";
import semver from "semver";
import { Flex, IconButton, Table, Text, Tooltip } from "@radix-ui/themes";
import { ArrowRightIcon, CheckIcon, Link1Icon } from "@radix-ui/react-icons";
import { DisplayVersion } from "./display-version";

type TDependencyVersionOverviewProps = {
  name: string;
  range: string;
};

export async function DependencyVersionOverview({ name, range }: TDependencyVersionOverviewProps) {
  const { latest, latestSatisfies } = await getDependencyVersionOverview(name, range);
  const source = semver.minVersion(range)?.toString() ?? "";

  return (
    <>
      <Table.Cell>
        {source !== latestSatisfies ? (
          <Flex gap="2" align="center">
            <DisplayVersion value={latestSatisfies} range={source} />
            <Tooltip
              content={
                <Flex gap="1" align="center">
                  <Text>{source}</Text>
                  <ArrowRightIcon />
                  <Text>{latestSatisfies}</Text>
                </Flex>
              }
            >
              <IconButton variant="soft" color="gray" size="1" asChild>
                <NextLink href={`/dependencies/${encodeURIComponent(name)}?source=${source}&target=${latestSatisfies}`}>
                  <Link1Icon />
                </NextLink>
              </IconButton>
            </Tooltip>
          </Flex>
        ) : (
          <Text>
            <CheckIcon />
          </Text>
        )}
      </Table.Cell>
      <Table.Cell>
        {source !== latest ? (
          <Flex gap="2" align="center">
            <DisplayVersion value={latest} range={source} />
            <Tooltip
              content={
                <Flex gap="1" align="center">
                  <Text>{source}</Text>
                  <ArrowRightIcon />
                  <Text>{latest}</Text>
                </Flex>
              }
            >
              <IconButton variant="soft" color="gray" size="1" asChild>
                <NextLink href={`/dependencies/${encodeURIComponent(name)}?source=${source}&target=${latest}`}>
                  <Link1Icon />
                </NextLink>
              </IconButton>
            </Tooltip>
          </Flex>
        ) : (
          <Text color="green">
            <CheckIcon />
          </Text>
        )}
      </Table.Cell>
    </>
  );
}
