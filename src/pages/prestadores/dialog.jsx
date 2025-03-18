import { Box, Button, Flex } from "@chakra-ui/react";
import { CloseButton } from "../../components/ui/close-button";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { createDynamicFormFields } from "./formFields";
import { BuildForm } from "../../components/buildForm/index";
import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { toaster } from "../../components/ui/toaster";
import { PrestadorService } from "../../service/prestador";

import { formatDate } from "../../utils/formatting";

import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      Criar um prestador
    </Button>
  );
};

export const PrestadoresDialog = ({
  defaultValues = null,
  trigger,
  label = "Criar prestador",
}) => {
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "PRESTADORES",
  });

  const { mutateAsync: updatePrestadorMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await PrestadorService.atualizarPrestador({ body, id }),
    onSuccess(data) {
      setData((prev) => ({
        ...data?.prestador,
        pessoaFisica: {
          ...data?.prestador.pessoaFisica,
          dataNascimento: formatDate(
            data?.prestador.pessoaFisica?.dataNascimento
          ),
        },
      }));
      queryClient.invalidateQueries(["listar-prestadores"]);
      toaster.create({
        title: "Prestador atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o prestador",
        type: "error",
      });
    },
  });

  const { mutateAsync: createPrestadorMutation } = useMutation({
    mutationFn: async ({ body }) =>
      await PrestadorService.criarPrestador({ body }),
    onSuccess(data) {
      setData((prev) => ({
        ...data?.prestador,
        pessoaFisica: {
          ...data?.prestador.pessoaFisica,
          dataNascimento: formatDate(
            data?.prestador.pessoaFisica?.dataNascimento
          ),
        },
      }));
      queryClient.invalidateQueries(["listar-prestadores"]);
      toaster.create({
        title: "Prestador criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar um prestador",
        type: "error",
      });
    },
  });

  const onSubmit = async (values) => {
    const body = {
      ...values,
      email: values?.email === "" ? null : values?.email,
    };

    if (!data) {
      return await createPrestadorMutation({ body });
    }

    return await updatePrestadorMutation({ id: data._id, body });
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
          onOpenChange={(e) => setOpen(e.open)}
        >
          <DialogContent
            overflow="auto"
            scrollbarWidth="thin"
            w="1250px"
            h="80%"
            pt="6"
            px="2"
            rounded="lg"
          >
            <DialogHeader>
              <DialogTitle>
                <Flex gap="4">
                  {label}
                  <VisibilityControlDialog
                    fields={fields}
                    setVisibilityState={setInputsVisibility}
                    visibilityState={inputsVisibility}
                    title="Ocultar campos"
                  />
                </Flex>
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <BuildForm
                visibleState={inputsVisibility}
                fields={fields}
                gridColumns={4}
                gap={6}
                data={data}
                onSubmit={onSubmit}
              />
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
