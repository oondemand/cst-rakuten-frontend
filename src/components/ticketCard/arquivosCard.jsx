import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Paperclip } from "lucide-react";

export const AnexosCard = ({ anexos = [] }) => {
  return (
    <Box>
      <Heading
        w="full"
        borderBottom="1px solid"
        borderColor="gray.200"
        fontSize="xs"
      >
        Anexos
      </Heading>
      <Box py="1.5" px="1">
        <Flex gap="2">
          <Paperclip size={14} color="purple" />
          <Text>Prestador</Text>
        </Flex>
        <Flex gap="2">
          <Paperclip size={14} color="purple" />
          <Text>Fiscais</Text>
        </Flex>
      </Box>
    </Box>
  );
};
