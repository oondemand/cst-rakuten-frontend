import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FORMS } from "./forms";
import { BuildForm } from "../../components/buildForm";

export const SistemaPage = () => {
  const forms = useMemo(() => FORMS, []);

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA" overflow="auto">
      <Text fontWeight="semibold" fontSize="lg">
        Configurações de sistema
      </Text>
      <Flex mt="4" flexWrap="wrap" gap="8">
        {forms.map((form) => (
          <Box key={form.title}>
            <Box shadow="xs" p="6" pb="8" rounded="lg" bg="white">
              <Text color="gray.500" fontWeight="medium">
                {form.title}
              </Text>
              <Box mt="6">
                <BuildForm
                  gridColumns={2}
                  onSubmit={(value) => console.log("LOG", value)}
                  fields={form.fields}
                  gap={6}
                />
                {form.title === "Geral" && (
                  <Button variant="surface" mt="8">
                    Testar envio de email
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
