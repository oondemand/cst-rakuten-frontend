import { Box, Flex, Text } from "@chakra-ui/react";
import { SciUnico } from "./form/sci-unico";

export const SistemaPage = () => {
  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA" overflow="auto">
      <Flex flexWrap="wrap" gap="8">
        <Box shadow="xs" p="6" rounded="lg" bg="white">
          <Text color="gray.500" fontWeight="medium">
            Sci Unico
          </Text>
          <SciUnico />
        </Box>

        <Box shadow="xs" p="6" rounded="lg" bg="white">
          <Text color="gray.500" fontWeight="medium">
            Omie
          </Text>
        </Box>

        <Box shadow="xs" p="6" rounded="lg" bg="white">
          <Text color="gray.500" fontWeight="medium">
            Geral
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
