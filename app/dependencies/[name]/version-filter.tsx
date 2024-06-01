"use client";

import semver from "semver";
import type { TVersion } from "@/core";
import { Flex, Select, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TVersionFilterProps = {
  versions: TVersion[];
};

export function VersionFilter({ versions }: TVersionFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const source = searchParams.get("source") ?? undefined;
  const target = searchParams.get("target") ?? undefined;

  const sourceItems = versions.filter(({ version }) => {
    if (!target) return true;
    return semver.lt(version, target);
  });

  const targetItems = versions.filter(({ version }) => {
    if (!source) return true;
    return semver.gt(version, source);
  });

  const handleSourceChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("source", value);
    router.push(pathname + "?" + params.toString());
  };

  const handleTargetChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("target", value);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <Flex gap="2">
      <Select.Root value={source} onValueChange={handleSourceChange}>
        <Select.Trigger
          placeholder="Select `source` version"
          variant="soft"
          color="gray"
        >
          <Text color="gray">Source:</Text> {source}
        </Select.Trigger>
        <Select.Content position="popper">
          {sourceItems.map(({ version }) => (
            <Select.Item key={version} value={version}>
              {version}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Select.Root value={target} onValueChange={handleTargetChange}>
        <Select.Trigger
          placeholder="Select `target` version"
          variant="soft"
          color="gray"
        >
          <Text color="gray">Target:</Text> {target}
        </Select.Trigger>
        <Select.Content position="popper">
          {targetItems.map(({ version }) => (
            <Select.Item key={version} value={version}>
              {version}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
