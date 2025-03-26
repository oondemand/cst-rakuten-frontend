import { Button, Flex, Text, Box } from "@chakra-ui/react";

import {
  FileUploadRoot,
  FileUploadTrigger,
} from "../../components/ui/file-upload";

import { useMutation } from "@tanstack/react-query";
import { ServicoService } from "../../service/servico";
import { queryClient } from "../../config/react-query";
import { toaster } from "../../components/ui/toaster";
import { Download, Upload } from "lucide-react";

export const ImportPage = () => {
  const {
    mutateAsync: importServicosMutation,
    data,
    isPending,
  } = useMutation({
    mutationFn: async ({ files }) =>
      await ServicoService.importarServicos({ files }),
    onSuccess() {
      queryClient.refetchQueries(["listar-servicos"]);
      toaster.create({
        title: "Arquivo enviado com sucesso",
        description: "Aguardando processamento.",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao enviar arquivo!",
        type: "error",
      });
    },
  });

  const handleDownloadFile = async ({ buffer, name, type }) => {
    try {
      const byteArray = new Uint8Array(buffer);
      const blob = new Blob([byteArray], { type });
      saveAs(blob, name);
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log(data);

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" gap="4" bg="#F8F9FA">
      <Flex
        bg="white"
        p="6"
        alignItems="end"
        rounded="lg"
        justifyContent="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            Importar Servicos
          </Text>
          <Text fontSize="sm" color="gray.500">
            Selecione a planilha que deseja importar
          </Text>
        </Box>
        <Box>
          <FileUploadRoot
            accept=".xlsx, .xls, .xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onFileAccept={async (e) => {
              await importServicosMutation({ files: e.files });
            }}
            maxFiles={1}
          >
            <FileUploadTrigger>
              <Button
                disabled={isPending}
                colorPalette="cyan"
                fontWeight="bold"
              >
                <Upload color="white" /> Selecionar Planilha
              </Button>
            </FileUploadTrigger>
          </FileUploadRoot>
        </Box>
      </Flex>

      <Flex w="full" bg="white" p="6" rounded="lg" gap="16">
        <Box>
          <Text fontWeight="semibold" fontSize="lg">
            Resumo
          </Text>
          <Flex mt="4" gap="8">
            <Box>
              <Text fontSize="sm" color="gray.500">
                Total de linhas lidas
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {data ? data?.data?.detalhes?.totalDeLinhasLidas : "..."}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Total de Serviços criados
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {data ? data?.data?.detalhes?.novosServicos : "..."}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Total de novos prestadores
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {data ? data?.data?.detalhes?.novosPrestadores : "..."}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Linhas com erros
              </Text>
              <Text fontSize="2xl" color="red.500" fontWeight="bold">
                {data ? data?.data?.detalhes?.linhasLidasComErro : "..."}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {data && (
        <Flex w="full" bg="white" p="6" rounded="lg" gap="16">
          <Box>
            <Text fontWeight="semibold" fontSize="lg">
              Tratamento de Erros
            </Text>
            <Flex mt="4" gap="10">
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Arquivo
                </Text>
                <Button
                  onClick={() => {
                    handleDownloadFile({
                      buffer: data.data?.arquivoOriginal?.buffer?.data,
                      name: data.data?.arquivoOriginal?.nome,
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });
                  }}
                  mt="2"
                  colorPalette="cyan"
                >
                  <Download /> Fazer download
                </Button>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Arquivo de erro
                </Text>
                <Button
                  onClick={() => {
                    handleDownloadFile({
                      buffer: data.data?.arquivoErro?.data,
                      name: "arquivo-erros",
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });
                  }}
                  mt="2"
                  colorPalette="cyan"
                >
                  <Download /> Fazer download
                </Button>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Logs
                </Text>
                <Button
                  onClick={() => {
                    handleDownloadFile({
                      buffer: data.data?.arquivoLog?.data,
                      name: "logs-errors",
                      type: "text/plain",
                    });
                  }}
                  mt="2"
                  colorPalette="cyan"
                >
                  <Download /> Fazer download
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
