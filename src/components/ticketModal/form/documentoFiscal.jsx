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
import { CircleX, Download } from "lucide-react";
import { DocumentosFiscaisService } from "../../../service/documentos-fiscais";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";
import { ServicoTooltipCard } from "./servicoTooltipCard";
import { TicketService } from "../../../service/ticket";
import { Select } from "chakra-react-select";
import { chakraStyles } from "./select-chakra-styles";
import { formatDateToDDMMYYYY } from "../../../utils/formatting";

export const DocumentoFiscalForm = ({ ticket, onlyReading }) => {
  const [documentosFiscais, setDocumentosFiscais] = useState(
    ticket?.documentosFiscais
  );

  const { requestConfirmation } = useConfirmation();

  const { data, refetch } = useQuery({
    queryKey: [
      "listar-documento-fiscal-prestador",
      { prestadorId: ticket?.prestador?._id },
    ],
    queryFn: async () =>
      await DocumentosFiscaisService.listarDocumentosFiscaisPorPrestador({
        prestadorId: ticket?.prestador?._id,
      }),
  });

  const options = data?.map((e) => ({
    label: `${e?.tipoDocumentoFiscal ?? ""} COMP. ${e?.competencia?.mes
      ?.toString()
      .padStart(2, "0")}/${e?.competencia?.ano} 
      ${currency.format(e?.valor ?? 0)}`,

    value: e?._id,
  }));

  const { mutateAsync: deleteDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ documentoFiscalId }) =>
      await TicketService.removerDocumentoFiscal({ documentoFiscalId }),
    onSuccess: ({ documentosFiscais }) => {
      setDocumentosFiscais(documentosFiscais);
      toaster.create({
        title: "Documento fiscal removido com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao remover documento fiscal",
        type: "error",
      });
    },
  });

  const { mutateAsync: addDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ documentoFiscalId }) =>
      await TicketService.adicionarDocumentoFiscal({
        ticketId: ticket?._id,
        documentoFiscalId,
      }),
    onSuccess: ({ documentosFiscais }) => {
      setDocumentosFiscais(documentosFiscais);
      toaster.create({
        title: "Documento fiscal adicionado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao adicionar documento fiscal",
        type: "error",
      });
    },
  });

  const handleDeleteTicket = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja remover esse documento fiscal?",
      description: "Essa ação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await deleteDocumentoFiscalMutation({ documentoFiscalId: id });
      refetch();
    }
  };

  const handleChangeDocumentoFiscal = async ({ value }) => {
    if (value && value !== "") {
      await addDocumentoFiscalMutation({ documentoFiscalId: value });
      refetch();
    }
  };

  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await TicketService.getFile({ id });

      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setDocumentosFiscais(ticket?.documentosFiscais);
  }, [ticket]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Documento fiscals
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
                Adicionar Documento fiscal
              </Text>
            </Flex>
            <Select
              disabled={!ticket}
              options={options}
              onChange={handleChangeDocumentoFiscal}
              value=""
              chakraStyles={chakraStyles}
            />
          </Box>
        )}
        {documentosFiscais && documentosFiscais?.length > 0 && (
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
                  {/* <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Valor
                  </Table.ColumnHeader> */}
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Imposto
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    width="25%"
                    color="gray.500"
                    fontSize="sm"
                  >
                    Valor
                  </Table.ColumnHeader>
                  <Table.ColumnHeader width="20px" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {documentosFiscais?.map((servico) => {
                  return (
                    // <Tooltip
                    //   key={servico._id}
                    //   content="Teste"
                    //   positioning={{ placement: "top" }}
                    //   openDelay={1000}
                    //   closeDelay={50}
                    //   contentProps={{
                    //     css: {
                    //       "--tooltip-bg": "transparent",
                    //       width: "700px !important",
                    //       minWidth: "700px !important",
                    //       color: "gray.600",
                    //       shadow: "none",
                    //     },
                    //   }}
                    // >
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
                            ?.toString()
                            .padStart(2, "0")}
                          /{servico?.competencia?.ano}
                        </Text>
                      </Table.Cell>

                      {/* <Table.Cell>
                          <Text fontSize="xs" color="gray.400">
                            {currency.format(servico?.valores?.totalServico)}
                          </Text>
                        </Table.Cell> */}

                      <Table.Cell>
                        <Text fontSize="xs" color="gray.400">
                          {currency.format(servico?.valores?.imposto ?? 0)}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Text fontSize="xs" fontWeight="medium">
                          {currency.format(servico?.valor)}
                        </Text>
                      </Table.Cell>

                      <Table.Cell>
                        <Flex>
                          {servico?.arquivo && (
                            <Button
                              onClick={async () => {
                                await handleDownloadFile({
                                  id: servico?.arquivo,
                                });
                              }}
                              cursor="pointer"
                              unstyled
                            >
                              <Download size={16} />
                            </Button>
                          )}
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
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                    // </Tooltip>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};
