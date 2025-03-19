import { Flex } from "@chakra-ui/react";

export const TableActionsCell = ({ children }) => {
  return (
    <Flex gap="2" alignItems="center">
      {children}
    </Flex>
  );
};
