import { Card, Flex, Text } from "@radix-ui/themes";
import { ArchiveIcon } from "@radix-ui/react-icons";

type TEmptyProps = {
  message: string;
};

export default function CEmpty({ message }: TEmptyProps) {
  return (
    <Card>
      <Flex align="center" justify="center" height="240px" direction="column" gap="2">
        <Text trim="both" color="gray">
          <ArchiveIcon />
        </Text>
        <Text color="gray">{message}</Text>
      </Flex>
    </Card>
  );
}
