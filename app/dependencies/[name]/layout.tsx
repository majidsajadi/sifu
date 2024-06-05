import type { PropsWithChildren, ReactNode } from "react";
import { Badge, Container, Flex, Box, Tabs, Text } from "@radix-ui/themes";

type TLayoutProps = PropsWithChildren & {
  commits: ReactNode;
  changelog: ReactNode;
  dependencies: ReactNode;
  engines: ReactNode;
  vulnerabilities: ReactNode;
};

export default function Layout({
  children,
  commits,
  changelog,
  dependencies,
  engines,
  vulnerabilities,
}: TLayoutProps) {
  return (
    <Container size="4" height="100vh" py="4">
      <Flex direction="column" gap="8">
        {children}
        <Tabs.Root defaultValue="commits">
          <Tabs.List wrap="wrap">
            <Tabs.Trigger value="commits">Commits</Tabs.Trigger>
            <Tabs.Trigger value="changelog">Changelog</Tabs.Trigger>
            <Tabs.Trigger value="dependencies">Dependencies</Tabs.Trigger>
            <Tabs.Trigger value="engines">Engines</Tabs.Trigger>
            <Tabs.Trigger value="vulnerabilities">Vulnerabilities</Tabs.Trigger>
            <Tabs.Trigger value="size" disabled>
              <Flex gap="2">
                <Text>Size</Text> <Badge>Soon</Badge>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="size" disabled>
              <Flex gap="2">
                <Text>Browserlist</Text> <Badge>Soon</Badge>
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="commits">{commits}</Tabs.Content>
            <Tabs.Content value="changelog">{changelog}</Tabs.Content>
            <Tabs.Content value="dependencies">{dependencies}</Tabs.Content>
            <Tabs.Content value="engines">{engines}</Tabs.Content>
            <Tabs.Content value="vulnerabilities">
              {vulnerabilities}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}
