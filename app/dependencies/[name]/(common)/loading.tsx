import { Spinner, Card, Text, Flex } from "@radix-ui/themes";

type TLoadingProps = {
  message: string;
};

export default function CLoading({ message }: TLoadingProps) {
  return (
    <Card>
      <Flex
        align="center"
        justify="center"
        height="240px"
        direction="column"
        gap="2"
      >
        <Spinner size="3" />
        <Text color="gray">{message}</Text>
      </Flex>
    </Card>
  );
}
