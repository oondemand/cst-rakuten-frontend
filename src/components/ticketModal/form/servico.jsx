import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Button,
  Table,
} from "@chakra-ui/react";
import { api } from "../../../config/api";
import { AsyncSelectAutocomplete } from "../../asyncSelectAutoComplete";
import { currency } from "../../../utils/currency";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { ServicoService } from "../../../service/servico";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";
import { ServicoTooltipCard } from "./servicoTooltipCard";

export const fetchOptions = async (inputValue) => {
  return await api.get(`/servicos?searchTerm=${inputValue}`);
};

const obterServicos = async (inputValue) => {
  const {
    data: { servicos },
  } = await fetchOptions(inputValue);

  return servicos.map((item) => {
    const competenciaFormatada = `${item?.competencia?.mes
      .toString()
      .padStart(2, "0")}/${item?.competencia?.ano}`;

    const valorFormatado = currency.format(item?.valor);

    const prestadorFormatado = `${item?.prestador?.nome} - ${item?.prestador?.sci} - ${item?.prestador?.documento}`;
    const campanha = item?.campanha;

    return {
      ...item,
      value: item._id,
      label: `${campanha} ${competenciaFormatada} ${valorFormatado} ${prestadorFormatado}`,
    };
  });
};

export const ServicoForm = ({ ticket, updateTicketMutation }) => {
  const [servicos, setServicos] = useState(ticket?.servicos);
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteServicoMutation } = useMutation({
    mutationFn: async ({ id }) => await ServicoService.deletarServico({ id }),
    onSuccess: ({ data }) => {
      setServicos(servicos.filter((e) => e?._id !== data?._id));
      toaster.create({
        title: "Serviço deletado com sucesso!",
        type: "success",
      });
    },
    onError: ({}) => {
      toaster.create({
        title: "Erro ao deletar serviço",
        type: "error",
      });
    },
  });

  const handleDeleteTicket = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja remover esse serviço?",
      description: "Essa ação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await deleteServicoMutation({ id });
    }
  };

  const handleChangeService = async (servico) => {
    if (servico && servico !== "") {
      await updateTicketMutation({
        id: ticket?._id,
        body: { servicos: [...ticket?.servicos, servico?._id] },
      });
    }
  };

  useEffect(() => {
    setServicos(ticket?.servicos);
  }, [ticket]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Serviços
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={3} mt="6">
        <Box
          mt="2"
          w="full"
          h="1"
          borderBottom="2px solid"
          borderColor="gray.100"
        />
        <Box px="1" mt="8">
          <Text color="gray.600" fontSize="sm">
            Adicionar Serviço
          </Text>
          <Flex gap="4">
            <AsyncSelectAutocomplete
              disabled={!ticket}
              queryFn={obterServicos}
              setValue={handleChangeService}
              placeholder="Digite para buscar..."
            />
          </Flex>
        </Box>
        {servicos && servicos?.length > 0 && (
          <Box
            mt="6"
            border="1px solid"
            borderColor="gray.100"
            rounded="2xl"
            p="4"
            pl="32"
          >
            <Table.Root variant="simple" size="xs" justifyItems="right">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Competência
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Valor principal
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Valor Revisão
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Valor total
                  </Table.ColumnHeader>
                  <Table.ColumnHeader width="20px" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {servicos?.map((servico) => (
                  <Tooltip
                    key={servico._id}
                    content={<ServicoTooltipCard servico={servico} />}
                    positioning={{ placement: "top" }}
                    openDelay={700}
                    closeDelay={50}
                    contentProps={{
                      css: {
                        "--tooltip-bg": "transparent",
                        width: "700px !important",
                        minWidth: "700px !important",
                        color: "gray.600",
                        shadow: "none",
                      },
                    }}
                  >
                    <Table.Row>
                      <Table.Cell>
                        <Text fontSize="xs" color="gray.400">
                          {servico?.competencia?.mes
                            .toString()
                            .padStart(2, "0")}
                          /{servico?.competencia?.ano}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text fontSize="xs" color="gray.400">
                          {currency.format(servico?.valores?.totalServico)}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text fontSize="xs" color="gray.400">
                          {currency.format(servico?.valores?.totalRevisao)}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text fontSize="xs" fontWeight="medium">
                          {currency.format(servico?.valor)}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={(e) => {
                            handleDeleteTicket({ id: servico._id });
                          }}
                          _hover={{ bg: "transparent" }}
                        >
                          <CircleX size={15} color="red" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Tooltip>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};
