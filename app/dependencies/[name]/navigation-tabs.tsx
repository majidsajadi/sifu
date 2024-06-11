"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Badge, Flex, TabNav, Text } from "@radix-ui/themes";

export function NavigationTabs() {
  const pathname = usePathname();
  const params = useParams<{ name: string }>();
  const searchParams = useSearchParams();

  const getHref = (key: string) => `/dependencies/${params.name}${key}?${searchParams.toString()}`;

  const key = pathname.split("/").findLast(Boolean);

  return (
    <TabNav.Root wrap="wrap">
      <TabNav.Link href={getHref("/")} active={key === params.name}>
        Commits
      </TabNav.Link>
      <TabNav.Link href={getHref("/changelog")} active={key === "changelog"}>
        Changelog
      </TabNav.Link>
      <TabNav.Link href={getHref("/dependencies")} active={key === "dependencies"}>
        Dependencies
      </TabNav.Link>
      <TabNav.Link href={getHref("/engines")} active={key === "engines"}>
        Engines
      </TabNav.Link>
      <TabNav.Link href={getHref("/advisories")} active={key === "advisories"}>
        Advisories
      </TabNav.Link>
      <TabNav.Link href="#">
        <Flex gap="2">
          <Text color="gray">Size</Text> <Badge>Soon</Badge>
        </Flex>
      </TabNav.Link>
      <TabNav.Link href="#">
        <Flex gap="2">
          <Text color="gray">Browserlist</Text> <Badge>Soon</Badge>
        </Flex>
      </TabNav.Link>
    </TabNav.Root>
  );
}
