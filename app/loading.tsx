import { Box, Flex, Spinner } from "@radix-ui/themes";

export default function Loading() {
  return <Flex height="100%" width="100%" align="center" justify="center">
     <Spinner />
  </Flex>
}
