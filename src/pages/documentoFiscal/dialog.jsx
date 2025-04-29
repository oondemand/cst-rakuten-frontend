import { Box, Button, Flex, Text } from "@chakra-ui/react";
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

import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

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

  const onSubmit = async (values) => {
    const competencia = values?.competencia.split("/");
    const mes = Number(competencia?.[0]) || null;
    const ano = Number(competencia?.[1]) || null;

    const body = {
      ...values,
      prestador: values.prestador.value,
      competencia: {
        mes,
        ano,
      },
    };

    if (!data) return await createDocumentoFiscalMutation({ body });
    return await updateDocumentoFiscalMutation({ id: data._id, body });
  };

  const fields = useMemo(() => createDynamicFormFields(), []);

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
              <Text>Anexar arquivo</Text>
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
