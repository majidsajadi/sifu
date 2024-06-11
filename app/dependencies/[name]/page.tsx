import { Card, Flex, Heading } from "@radix-ui/themes";
import { getDependency } from "@/lib/dependency";
import { VersionFilter } from "./version-filter";
import type { TDependenciesNamePageProps } from "./types";
import { getDependencyRepository } from "@/lib/dependency-repository-manager";

export default async function Page({ params }: TDependenciesNamePageProps) {
  const { versions, name } = await getDependency(decodeURIComponent(params.name));

  return (
    <Flex gap="4" align="center" minHeight="32px">
      <Flex flexGrow="1">
        <Card variant="ghost">
          <Heading size="5" weight="medium">
            {name}
          </Heading>
        </Card>
      </Flex>
      <VersionFilter versions={versions} />
    </Flex>
  );
}
