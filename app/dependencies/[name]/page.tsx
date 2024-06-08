import { getDependency } from "@/internal";
import { Flex, Card, Heading } from "@radix-ui/themes";
import { VersionFilter } from "./version-filter";

type TPageProps = {
  params: { name: string };
};

export default async function Page({ params }: TPageProps) {
  const dependency = await getDependency(decodeURIComponent(params.name));

  return (
    <Flex gap="4" align="center" minHeight="32px">
      <Flex flexGrow="1">
        <Card variant="ghost">
          <Heading size="5" weight="medium">
            {dependency.name}
          </Heading>
        </Card>
      </Flex>
      <VersionFilter versions={dependency.versions} />
    </Flex>
  );
}
