import { Flex, Text } from "@chakra-ui/react";

export const DefaultCell = ({ getValue, value, ...rest }) => {
  <Flex minH="8">
    <Text alignSelf="center" fontSize="sm" truncate>
      {getValue()}
    </Text>
  </Flex>;
};
