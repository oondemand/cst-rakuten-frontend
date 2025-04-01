import {
  Flex,
  Tabs,
  Box,
  Button,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ListaService } from "../../service/listas";
import { DeleteIcon, Trash2 } from "lucide-react";
import { toaster } from "../../components/ui/toaster";
import { api } from "../../config/api";
import { queryClient } from "../../config/react-query";

import { useConfirmation } from "../../hooks/useConfirmation";

export function Listas() {
  const [tab, setTab] = useStateWithStorage("LISTAS-TAB", "campanha");
  const { requestConfirmation } = useConfirmation();

  const { data } = useQuery({
    queryKey: ["listas"],
    queryFn: ListaService.getListas,
  });

  const { mutateAsync: onAddItemMutation } = useMutation({
    mutationFn: async ({ id, values }) =>
      await api.post(`listas/${id}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item adicionado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro inesperado ao adicionar novo item a lista.",
        type: "error",
      });
    },
  });

  const { mutateAsync: onDeleteItemMutation } = useMutation({
    mutationFn: async ({ id, itemId }) =>
      await api.delete(`listas/${id}/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item excluído com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro inesperado ao excluir item.",
        type: "error",
      });
    },
  });

  const { mutateAsync: onUpdateItemMutation } = useMutation({
    mutationFn: async ({ id, itemId, key, value }) =>
      await api.put(`listas/${id}`, {
        itemId,
        [key]: value,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listas"]);
      toaster.create({
        title: "Item atualizado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro inesperado ao atualizar item.",
        type: "error",
      });
    },
  });

  const handleDeleteLista = async ({ id, itemId }) => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja remover item ?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await onDeleteItemMutation({ id, itemId });
    }
  };

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Text fontSize="lg" color="gray.700" fontWeight="semibold">
        Listas
      </Text>
      <Flex mt="4">
        <Tabs.Root
          value={tab}
          onValueChange={(e) => setTab(e.value)}
          variant="line"
          bg="white"
          rounded="lg"
          shadow="sm"
        >
          <Tabs.List>
            {data &&
              data?.length > 0 &&
              data.map((item) => (
                <Tabs.Trigger
                  // fontSize="xs"
                  // h="6"
                  // rounded="lg"
                  color="gray.500"
                  value={item?.codigo}
                  key={item?.codigo}
                >
                  {item?.codigo.charAt(0).toUpperCase() +
                    item?.codigo.slice(1).replace(/[-_]/g, " ")}
                </Tabs.Trigger>
              ))}
          </Tabs.List>
          {data &&
            data?.length > 0 &&
            data.map((lista) => (
              <Tabs.Content key={lista?.codigo} value={lista?.codigo} p="0">
                <Box
                  // mt="8"
                  px="6"
                  py="4"
                  pb="8"
                  // bg="white"
                  // rounded="lg"
                  // shadow="sm"
                  maxH="600px"
                  overflow="auto"
                  className="custom-scrollbar"
                >
                  <Flex alignItems="center" gap="4">
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      {lista?.codigo.charAt(0).toUpperCase() +
                        lista?.codigo.slice(1).replace(/[-_]/g, " ")}
                    </Text>
                    <Button
                      onClick={() => {
                        onAddItemMutation({ id: lista?._id, values: {} });
                      }}
                      variant="subtle"
                      color="brand.500"
                      size="2xs"
                    >
                      Adicionar item
                    </Button>
                  </Flex>
                  {lista?.valores.map((item) => (
                    <Flex alignItems="center" gap="4" mt="2">
                      <Input
                        w="sm"
                        size="sm"
                        name="valor"
                        color="gray.600"
                        placeholder="Preencha o valor do item..."
                        variant="flushed"
                        fontSize="xs"
                        defaultValue={item?.valor}
                        key={item?._id}
                        onBlur={async (ev) => {
                          if (
                            ev.target.value !== "" &&
                            ev.target.defaultValue !== ev.target.value
                          ) {
                            await onUpdateItemMutation({
                              itemId: item._id,
                              id: lista._id,
                              key: ev.target.name,
                              value: ev.target.value,
                            });
                          }
                        }}
                      />
                      <IconButton
                        onClick={async () => {
                          await handleDeleteLista({
                            id: lista._id,
                            itemId: item._id,
                          });
                        }}
                        variant="surface"
                        colorPalette="red"
                        size="2xs"
                      >
                        <Trash2 />
                      </IconButton>
                    </Flex>
                  ))}
                </Box>
              </Tabs.Content>
            ))}
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
