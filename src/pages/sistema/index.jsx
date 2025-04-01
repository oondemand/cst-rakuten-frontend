import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FORMS } from "./forms";
import { BuildForm } from "../../components/buildForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SistemaService } from "../../service/sistema";
import { toaster } from "../../components/ui/toaster";
import { formatDate } from "../../utils/formatting";

export const SistemaPage = () => {
  const forms = useMemo(() => FORMS, []);

  const { data } = useQuery({
    queryKey: ["list-sistema"],
    queryFn: SistemaService.obterConfiguracoesSistema,
  });

  const { mutateAsync: updateConfigMutation } = useMutation({
    mutationFn: async ({ body, id }) =>
      SistemaService.atualizarConfiguracoesSistema({ body, id }),
    onSuccess: () => {
      toaster.create({
        title: "Configuração atualizada com sucesso!",
        type: "success",
      });
    },
  });

  const onSubmit = (values) => {
    console.log("DATA ->", values);
    return updateConfigMutation({ body: values, id: data?._id });
  };

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA" overflow="auto">
      <Text fontWeight="semibold" fontSize="lg">
        Configurações de sistema
      </Text>
      <Flex mt="4" flexWrap="wrap" gap="8">
        {data &&
          forms.map((form) => (
            <Box key={form.title}>
              <Box shadow="xs" p="6" pb="8" rounded="lg" bg="white">
                <Text color="gray.500" fontWeight="medium">
                  {form.title}
                </Text>
                <Box mt="6">
                  <BuildForm
                    data={{
                      ...data,
                      data_corte_app_publisher: formatDate(
                        data?.data_corte_app_publisher
                      ),
                    }}
                    gridColumns={2}
                    onSubmit={onSubmit}
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
