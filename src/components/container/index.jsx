import { Flex } from "@chakra-ui/react";

export const Container = ({ children, ...rest }) => {
  return (
    <Flex {...rest} flex="1" flexDir="column" py="8" px="6">
      {children}
    </Flex>
  );
};
