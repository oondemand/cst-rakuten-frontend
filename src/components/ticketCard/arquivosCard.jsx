import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const AnexosCard = ({ anexos = [] }) => {
  const FileTypeMap = {
    generico: "",
    rpa: "RPA",
  };

  return (
    <Box>
      <Heading
        w="full"
        borderBottom="1px solid"
        borderColor="gray.200"
        fontSize="xs"
      >
        <Flex alignItems="center" gap="2">
          Anexos
        </Flex>
      </Heading>
      <Box py="1.5" px="1">
        {anexos.map((e) => (
          <Text truncate fontSize="xs" color="gray.400" fontWeight="normal">
            {FileTypeMap[e?.tipo]} {e?.nomeOriginal}{" "}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
