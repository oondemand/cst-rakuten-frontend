import { Box, Button, Flex, Text, IconButton } from "@chakra-ui/react";
import { CloseButton } from "../../components/ui/close-button";

import { useMemo, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { createDynamicFormFields } from "./formFields";
import { BuildForm } from "../../components/buildForm/index";
import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { toaster } from "../../components/ui/toaster";
import { DocumentosFiscaisService } from "../../service/documentos-fiscais";
import { TicketService } from "../../service/ticket";

import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import {
  FileUploadRoot,
  FileUploadTrigger,
} from "../../components/ui/file-upload";
import { Paperclip, CircleX, Download } from "lucide-react";
import { useConfirmation } from "../../hooks/useConfirmation";

const DefaultTrigger = (props) => {
  return (
    <Button
      {...props}
      size="sm"
      variant="subtle"
      fontWeight="semibold"
      color="brand.500"
      _hover={{ backgroundColor: "gray.50" }}
    >
      Criar documento fiscal
    </Button>
  );
};

export const DocumentosFiscaisDialog = ({
  defaultValues = null,
  trigger,
  label = "Criar documento fiscal",
}) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "DOCUMENTOS_FISCAIS",
  });

  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: updateDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await DocumentosFiscaisService.atualizarDocumentoFiscal({ id, body }),
    onSuccess(data) {
      if (open) setData((prev) => data?.documentoFiscal);

      toaster.create({
        title: "Documento fiscal atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar documento fiscal",
        description: error?.response?.data?.message ?? "",
        type: "error",
      });
    },
  });

  const { mutateAsync: createDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ body }) =>
      await DocumentosFiscaisService.criarDocumentoFiscal({ body }),
    onSuccess(data) {
      if (open) setData((prev) => data?.documentoFiscal);
      queryClient.invalidateQueries(["listar-documentos-fiscais"]);
      toaster.create({
        title: "Documento fiscal criado com sucesso",
        type: "success",
      });
    },

    onError: (error) => {
      if (error?.response?.data?.message === "Documento fiscal existente") {
        return toaster.create({
          title: "Ouve um erro ao criar um documento fiscal",
          description:
            "Documento fiscal para esse prestador com a competência já cadastrada!",
          type: "error",
        });
      }

      toaster.create({
        title: "Ouve um erro ao criar um documento fiscal",
        type: "error",
      });
    },
  });

  const { mutateAsync: uploadFileMutation, isPending } = useMutation({
    mutationFn: async ({ files }) =>
      await DocumentosFiscaisService.anexarArquivo({
        id: data?._id,
        file: files[0],
      }),
    onSuccess: ({ data }) => {
      const { nomeOriginal, mimetype, size, tipo, _id } = data;
      setData((prev) => ({
        ...prev,
        arquivo: { nomeOriginal, mimetype, size, tipo, _id },
      }));
      toaster.create({
        title: "Arquivo anexado com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro ao anexar arquivo!",
        type: "error",
      });
    },
  });

  const { mutateAsync: deleteFileFromDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ id }) =>
      await DocumentosFiscaisService.deleteFile({
        documentoFiscalId: data._id,
        id,
      }),
    onSuccess: () => {
      setData((prev) => ({ ...prev, arquivo: null }));
      toaster.create({
        title: "Arquivo deletado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Erro ao remover arquivo",
        type: "error",
      });
    },
  });

  const onSubmit = async (values) => {
    const competencia = values?.competencia?.split("/");
    const mes = Number(competencia?.[0]) || null;
    const ano = Number(competencia?.[1]) || null;

    const body = {
      ...values,
      prestador: values.prestador.value,

      ...(values?.competencia !== ""
        ? {
            competencia: {
              mes,
              ano,
            },
          }
        : { competencia: null }),
    };

    if (!data) return await createDocumentoFiscalMutation({ body });
    return await updateDocumentoFiscalMutation({ id: data._id, body });
  };

  const fields = useMemo(() => createDynamicFormFields(), []);

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

  const handleRemoveFile = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que excluir arquivo?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await deleteFileFromDocumentoFiscalMutation({ id });
    }
  };

  useEffect(() => {
    setData(defaultValues);
  }, [defaultValues]);

  return (
    <Box>
      <Box onClick={() => setOpen(true)} asChild>
        {trigger ? trigger : <DefaultTrigger />}
      </Box>
      {open && (
        <DialogRoot
          size="cover"
          open={open}
          onOpenChange={(e) => {
            queryClient.invalidateQueries(["listar-documentos-fiscais"]);
            setData((prev) => defaultValues);
            setOpen(e.open);
          }}
        >
          <DialogContent
            overflow="hidden"
            w="1250px"
            h="80%"
            pt="6"
            px="2"
            rounded="lg"
          >
            <DialogHeader mt="-4" py="2" px="4">
              <Flex gap="4">
                <DialogTitle>{label}</DialogTitle>
                <VisibilityControlDialog
                  fields={fields}
                  setVisibilityState={setInputsVisibility}
                  visibilityState={inputsVisibility}
                  title="Ocultar campos"
                />
              </Flex>
            </DialogHeader>
            <DialogBody overflowY="auto" className="dialog-custom-scrollbar">
              <BuildForm
                visibleState={inputsVisibility}
                fields={fields}
                gridColumns={4}
                gap={6}
                data={data}
                onSubmit={onSubmit}
              />
              {data && !data?.arquivo && (
                <Box mt="8">
                  <FileUploadRoot
                    onFileAccept={async (e) => {
                      await uploadFileMutation({ files: e.files });
                    }}
                  >
                    <FileUploadTrigger>
                      <Button
                        disabled={isPending}
                        mt="4"
                        size="2xs"
                        variant="surface"
                        color="gray.600"
                      >
                        Anexar arquivo
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadRoot>
                </Box>
              )}
              {data && data?.arquivo && (
                <Box mt="8">
                  <Text fontWeight="semibold" color="gray.700">
                    Arquivo
                  </Text>
                  <Flex mt="4" gap="3" alignItems="center">
                    <Paperclip color="purple" size={16} />
                    <Text color="gray.600">
                      {data?.arquivo?.nomeOriginal}{" "}
                      {(data?.arquivo?.size / 1024).toFixed(1)} KB
                    </Text>
                    <Flex gap="2">
                      <Button
                        onClick={async () =>
                          await handleDownloadFile({ id: data?.arquivo?._id })
                        }
                        color="gray.600"
                        cursor="pointer"
                        unstyled
                      >
                        <Download size={16} />
                      </Button>
                      <Button
                        onClick={async () =>
                          await handleRemoveFile({
                            id: data?.arquivo?._id,
                          })
                        }
                        color="red"
                        cursor="pointer"
                        unstyled
                      >
                        <CircleX size={16} />
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </DialogBody>
            <DialogCloseTrigger asChild>
              <CloseButton size="sm" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogRoot>
      )}
    </Box>
  );
};
