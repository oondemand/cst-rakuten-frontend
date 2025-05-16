import { Box, Text, Heading, Grid, Button, Flex } from "@chakra-ui/react";
import { currency } from "../../utils/currency";
import { Download, CircleX } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { DocumentosFiscaisService } from "../../service/documentos-fiscais";
import { useConfirmation } from "../../hooks/useConfirmation";
import { toaster } from "../ui/toaster";
import { TicketService } from "../../service/ticket";

export const DocumentosFiscaisDetailsCard = ({ documentosFiscais }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationFn: async ({ id, documentoFiscalId }) =>
      await DocumentosFiscaisService.deleteFile({
        id,
        documentoFiscalId,
      }),
    onSuccess: ({ data }) => {
      documentosFiscais.arquivos = documentosFiscais?.arquivos?.filter(
        (e) => e?._id !== data?._id
      );

      toaster.create({
        title: "Arquivo deletado com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro ao deletar arquivo!",
        type: "error",
      });
    },
  });

  const handleDeleteFileFromTicket = async ({ id, documentoFiscalId }) => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja remover arquivo?",
      description: "Essa ação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      console.log(id, documentoFiscalId);
      await deleteFileMutation({ id, documentoFiscalId });
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

  return (
    <Box width="1400px" pt="2" color="gray.700">
      <Grid templateColumns="repeat(8, 1fr)" gap="2" fontWeight="medium">
        <Text>Tipo</Text>
        <Text>Número</Text>
        <Text>Competência</Text>
        <Text>Valor</Text>
        <Text>imposto</Text>
        <Text minW="200px">Classificação fiscal</Text>
        <Text>Descrição</Text>
        <Text minW="350px">Arquivo</Text>
      </Grid>

      {/* Linhas de dados */}
      {documentosFiscais.map((item, index) => (
        <Grid
          key={index}
          templateColumns="repeat(8, 1fr)"
          gap="2"
          py="1"
          fontSize="sm"
          color="gray.600"
          borderBottom={
            index < documentosFiscais.length - 1 ? "1px solid" : "none"
          }
          borderColor="gray.100"
        >
          <Text truncate>{item?.tipoDocumentoFiscal}</Text>
          <Text truncate>{item?.numero}</Text>
          <Text truncate>
            {`${item?.competencia?.mes ?? ""}/${item?.competencia?.ano ?? ""}`}
          </Text>
          <Text truncate>{currency.format(item?.valor)}</Text>
          <Text truncate>{currency.format(item?.imposto)}</Text>
          <Text truncate minW="200px">
            {item?.classificacaoFiscal}
          </Text>
          <Text truncate>{item?.descricao}</Text>
          <Flex justifyContent="space-between" minW="350px">
            <Text truncate>{item?.arquivo?.nomeOriginal}</Text>
            {item?.arquivo && (
              <Flex gap="2">
                <Button
                  onClick={async () =>
                    await handleDownloadFile({
                      id: item?.arquivo?._id,
                      documentoFiscalId: item?._id,
                    })
                  }
                  cursor="pointer"
                  unstyled
                >
                  <Download size={16} />
                </Button>

                <Button
                  onClick={async () =>
                    await handleDeleteFileFromTicket({
                      id: item?.arquivo?._id,
                      documentoFiscalId: item?._id,
                    })
                  }
                  color="red"
                  cursor="pointer"
                  unstyled
                >
                  <CircleX size={16} />
                </Button>
              </Flex>
            )}
          </Flex>
        </Grid>
      ))}
    </Box>
  );
};
