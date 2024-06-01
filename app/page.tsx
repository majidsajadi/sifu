import {
  Badge,
  Container,
  Flex,
  Box,
  Card,
  Heading,
  Tabs,
  Select,
  Text,
  IconButton,
  DataList,
  Link,
} from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <Container size="4" height="100vh" py="4">
      <Flex direction="column" gap="8">
        <Flex gap="4" align="center">
          <Box flexGrow="1">
            <Card variant="ghost">
              <Heading size="5" weight="medium">
                React
              </Heading>
            </Card>
          </Box>
          <Flex gap="2">
            <Select.Root>
              <Select.Trigger
                placeholder="Select `source` version"
                variant="soft"
                color="gray"
              />
              <Select.Content position="popper">
                <Select.Item value="carrot">Carrot</Select.Item>
                <Select.Item value="potato">Potato</Select.Item>
              </Select.Content>
            </Select.Root>
            <Select.Root>
              <Select.Trigger
                placeholder="Select `target` version"
                variant="soft"
                color="gray"
              />
              <Select.Content position="popper">
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>
        <Flex gap="4">
          <Box flexGrow="1">
            <Tabs.Root defaultValue="commits">
              <Tabs.List wrap="wrap">
                <Tabs.Trigger value="commits">Commits</Tabs.Trigger>
                <Tabs.Trigger value="changelog">Changelog</Tabs.Trigger>
                <Tabs.Trigger value="size" disabled>
                  <Flex gap="2">
                    <Text>Size</Text> <Badge>Soon</Badge>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="size" disabled>
                  <Flex gap="2">
                    <Text>Compatibilities</Text> <Badge>Soon</Badge>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="size" disabled>
                  <Flex gap="2">
                    <Text>Dependencies</Text> <Badge>Soon</Badge>
                  </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger value="size" disabled>
                  <Flex gap="2">
                    <Text>Vulnerabilities</Text> <Badge>Soon</Badge>
                  </Flex>
                </Tabs.Trigger>
              </Tabs.List>
              <Box pt="3">
                <Tabs.Content value="commits">
                  <Card>
                    <Flex direction="column" gap="2">
                      <Flex gap="2" direction="row-reverse" align="center">
                        <IconButton size="2" variant="soft" color="gray">
                          <ExternalLinkIcon />
                        </IconButton>
                        <Badge
                          size="2"
                          color="gray"
                          variant="solid"
                          highContrast
                        >
                          12 commits
                        </Badge>
                        <Badge
                          size="2"
                          color="gray"
                          variant="solid"
                          highContrast
                        >
                          73 files change
                        </Badge>
                      </Flex>
                      <Flex>asdasd</Flex>
                    </Flex>
                  </Card>
                </Tabs.Content>
                <Tabs.Content value="changelog">
                  <Card>
                    <Flex direction="column" gap="2">
                      <Flex gap="2" direction="row-reverse" align="center">
                        <IconButton size="2" variant="soft" color="gray">
                          <ExternalLinkIcon />
                        </IconButton>
                        <Badge
                          size="2"
                          color="gray"
                          variant="solid"
                          highContrast
                        >
                          3 releases
                        </Badge>
                      </Flex>
                      <Flex>asdasd</Flex>
                    </Flex>
                  </Card>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
          <Box width="25%" minWidth="300px">
            <Card>
              <DataList.Root>
                <DataList.Item align="center">
                  <DataList.Label>Hompage</DataList.Label>
                  <DataList.Value style={{ justifySelf: "flex-end" }}>
                    <Link href="#">reactjs.org</Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Registery</DataList.Label>
                  <DataList.Value style={{ justifySelf: "flex-end" }}>
                    <Link href="https://www.npmjs.com/package/react">
                      npmjs.com/package/react
                    </Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Repository</DataList.Label>
                  <DataList.Value style={{ justifySelf: "flex-end" }}>
                    <Link href="https://www.npmjs.com/package/react">
                      github.com/facebook/react
                    </Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Bugs</DataList.Label>
                  <DataList.Value style={{ justifySelf: "flex-end" }}>
                    <Link href="https://www.npmjs.com/package/react">
                      github.com/facebook/react/issues
                    </Link>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Card>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}
