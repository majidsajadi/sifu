import { Card, Container, Flex, Heading } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import { getDependency } from "@/lib/dependency";
import { fetchDependency } from "@/lib/registry";
import { NavigationTabs } from "./navigation-tabs";
import { VersionFilter } from "./version-filter";
import type { TDependenciesNamePageProps } from "./types";

type TLayoutProps = PropsWithChildren & TDependenciesNamePageProps;

export default async function Layout({ children, params }: TLayoutProps) {
  fetchDependency(decodeURIComponent(params.name));
  const { versions, name } = await getDependency(decodeURIComponent(params.name));

  return (
    <Container size="4" height="100vh" py="4">
      <Flex direction="column" gap="8">
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

        <Flex direction="column" gap="4">
          <NavigationTabs />
          {children}
        </Flex>
      </Flex>
    </Container>
  );
}
