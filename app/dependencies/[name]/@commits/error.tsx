"use client";

import { useEffect } from "react";
import { Card, Text, Flex, Link as NavLink } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card style={{ height: 420 }}>
      <Flex
        align="center"
        justify="center"
        height="100%"
        direction="column"
        gap="2"
      >
        <CrossCircledIcon color="red" width="25px" height="25px" />
        <Text size="2">Fetching commits failed.</Text>
        <Text size="2" color="gray">
          Please consider{" "}
          <NavLink asChild>
            <Link href="https://github.com/majidsajadi/sifu/issues/new">
              opening an issue
            </Link>
          </NavLink>{" "}
          so we can investigate the problem and hopefully fix this.
        </Text>
      </Flex>
    </Card>
  );
}
