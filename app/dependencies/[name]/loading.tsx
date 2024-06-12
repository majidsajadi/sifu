import { Flex, Skeleton } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex gap="4" align="center" justify="between">
      <Skeleton width="100%" maxWidth="168px" height="32px" />
      <Skeleton width="100%" maxWidth="420px" height="32px" />
    </Flex>
  );
}