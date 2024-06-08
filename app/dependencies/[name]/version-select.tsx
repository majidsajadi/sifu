"use client";

import { Virtuoso } from "react-virtuoso";
import semver from "semver";
import { Box, Flex, Select, Text } from "@radix-ui/themes";
import type { TVersion } from "@/internal";

const MIN_VERSION_POSSIBLE = "0.0.0";
const MAX_VERSION_POSSIBLE = `${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}`;

type TVersionSelectProps = {
  onValugeChange: (value: string) => void;
  versions: TVersion[];
  name: string;
  max?: string;
  min?: string;
  value?: string;
};

export function VersionSelect({
  name,
  versions,
  min = MIN_VERSION_POSSIBLE,
  max = MAX_VERSION_POSSIBLE,
  value,
  onValugeChange,
}: TVersionSelectProps) {
  const items = versions.filter(({ version }) => {
    return semver.gt(version, min) && semver.lt(version, max);
  });

  return (
    <Select.Root value={value} onValueChange={onValugeChange}>
      <Select.Trigger placeholder={`Select \`${name}\` version`} variant="soft" color="gray">
        <Text color="gray">Source:</Text> {value}
      </Select.Trigger>
      <Select.Content position="popper">
        {!!items.length ? (
          <Virtuoso
            style={{
              height: "280px",
              // subtract 16px (2 * var(space-2)) for the content padding to prevent the radix scroll component functionality
              maxHeight: "calc(var(--radix-select-content-available-height) - 16px)",
            }}
            totalCount={items.length}
            itemContent={(index) => {
              const item = items[index];
              return (
                <Select.Item
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  key={item.version}
                  value={item.version}
                >
                  {item.version}
                </Select.Item>
              );
            }}
          />
        ) : (
          <Flex align="center" justify="center">
            <Text size="2" color="gray">
              No available version
            </Text>
          </Flex>
        )}
      </Select.Content>
    </Select.Root>
  );
}
