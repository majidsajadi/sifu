"use client";

import type { TVersion } from "@/core";
import { Flex } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VersionSelect } from "./version-select";

type TVersionFilterProps = {
  versions: TVersion[];
};

export function VersionFilter({ versions }: TVersionFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const source = searchParams.get("source") ?? undefined;
  const target = searchParams.get("target") ?? undefined;

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
      <VersionSelect
        name="source"
        versions={versions}
        max={target}
        value={source}
        onValugeChange={handleSourceChange}
      />
      <VersionSelect
        name="target"
        versions={versions}
        min={source}
        value={target}
        onValugeChange={handleTargetChange}
      />
    </Flex>
  );
}
