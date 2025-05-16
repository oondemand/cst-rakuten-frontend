import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const DocumentosFiscaisCard = ({ documentosFiscais = [] }) => {
  return (
    <Box>
      <Heading
        w="full"
        borderBottom="1px solid"
        borderColor="gray.200"
        fontSize="xs"
      >
        <Flex alignItems="center" gap="2">
          Documentos Fiscais
        </Flex>
      </Heading>
      <Box py="1.5" px="1">
        {documentosFiscais.map((e) => (
          <Text truncate fontSize="xs" color="gray.400" fontWeight="normal">
            {e?.arquivo?.nomeOriginal}{" "}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
