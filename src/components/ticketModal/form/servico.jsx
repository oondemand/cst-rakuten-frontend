import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Table,
  Flex,
} from "@chakra-ui/react";

import { currency } from "../../../utils/currency";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { ServicoService } from "../../../service/servico";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";
import { ServicoTooltipCard } from "./servicoTooltipCard";
import { TicketService } from "../../../service/ticket";
import { Select } from "chakra-react-select";
import { chakraStyles } from "./select-chakra-styles";
import { formatDateToDDMMYYYY } from "../../../utils/formatting";

export const ServicoForm = ({ ticket, onlyReading }) => {
  const [servicos, setServicos] = useState(ticket?.servicos);
  const { requestConfirmation } = useConfirmation();

  const { data, refetch } = useQuery({
    queryKey: [
      "listar-servicos-prestador",
      {
        prestadorId: ticket?.prestador?._id,
        dataRegistro: ticket?.dataRegistro,
      },
    ],
    queryFn: async () =>
      await ServicoService.listarServicosPorPrestador({
        prestadorId: ticket?.prestador?._id,
        dataRegistro: ticket?.dataRegistro ?? "",
      }),
  });

  const options = data?.map((e) => ({
    label: `${e?.tipoDocumentoFiscal ?? ""} COMP. ${e?.competencia?.mes
      .toString()
      .padStart(2, "0")}/${
      e?.competencia?.ano
    }   REGIST. ${formatDateToDDMMYYYY(e?.dataRegistro, "dd/MM/yyyy")} ${
      e?.campanha ?? ""
    }  ${currency.format(e?.valor ?? 0)}`,

    value: e?._id,
  }));

  const { mutateAsync: deleteServicoMutation } = useMutation({
    mutationFn: async ({ servicoId }) =>
      await TicketService.removerServico({ servicoId }),
    onSuccess: ({ servicos }) => {
      setServicos(servicos);
      toaster.create({
        title: "Serviço removido com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao remover serviço",
        type: "error",
      });
    },
  });

  const { mutateAsync: addServicoMutation } = useMutation({
    mutationFn: async ({ servicoId }) =>
      await TicketService.adicionarServico({
        ticketId: ticket?._id,
        servicoId,
      }),
    onSuccess: ({ servicos }) => {
      setServicos(servicos);
      toaster.create({
        title: "Serviço adicionado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      if (error?.response?.data?.message === "Data registro conflitante.") {
        return toaster.create({
          title: "Erro ao adicionar serviço",
          description: "As datas de registro dos serviços devem ser iguais.",
          type: "error",
        });
      }
      toaster.create({
        title: "Erro ao adicionar serviço",
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
      await deleteServicoMutation({ servicoId: id });
      refetch();
    }
  };

  const handleChangeService = async ({ value }) => {
    if (value && value !== "") {
      await addServicoMutation({ servicoId: value });
      refetch();
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
        {!onlyReading && (
          <Box px="1" mt="8">
            <Flex gap="4">
              <Text color="gray.600" fontSize="sm">
                Adicionar Serviço
              </Text>
              {/* <Text color="gray.400" fontSize="xs">
                {formatDateToDDMMYYYY(ticket?.dataRegistro)}
              </Text> */}
            </Flex>
            <Select
              disabled={!ticket}
              options={options}
              onChange={handleChangeService}
              value=""
              chakraStyles={chakraStyles}
            />
          </Box>
        )}
        {servicos && servicos?.length > 0 && (
          <Box
            mt="6"
            border="1px solid"
            borderColor="gray.100"
            rounded="2xl"
            p="4"
            pl="24"
          >
            <Table.Root variant="simple" size="xs" justifyItems="right">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader />

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
                    openDelay={1000}
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
                        <Text
                          fontSize="xs"
                          color="gray.400"
                          mr="6"
                          px="1"
                          borderColor="gray.200"
                          rounded="xs"
                        >
                          {servico?.tipoDocumentoFiscal}
                        </Text>
                      </Table.Cell>
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
                        {!onlyReading && (
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
                        )}
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
