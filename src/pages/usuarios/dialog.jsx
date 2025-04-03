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
import { UsuarioService } from "../../service/usuario";

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
      Criar um usuario
    </Button>
  );
};

export const UsuariosDialog = ({
  defaultValues = null,
  trigger,
  label = "Criar usuário",
}) => {
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "USUARIOS",
  });

  const { mutateAsync: updateUsuarioMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await UsuarioService.alterarUsuario({ body, id }),
    onSuccess(data) {
      // setData((prev) => ({
      //   ...data?.prestador,
      //   pessoaFisica: {
      //     ...data?.prestador.pessoaFisica,
      //     dataNascimento: formatDateToDDMMYYYY(
      //       data?.prestador.pessoaFisica?.dataNascimento
      //     ),
      //   },
      // }));
      queryClient.invalidateQueries(["listar-usuarios"]);
      toaster.create({
        title: "Usuario atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o usuario",
        type: "error",
      });
    },
  });

  const { mutateAsync: createUsuarioMutation } = useMutation({
    mutationFn: async ({ body }) =>
      await UsuarioService.adicionarUsuario({ body }),

    onSuccess(data) {
      // setData((prev) => ({
      //   ...data?.prestador,
      //   pessoaFisica: {
      //     ...data?.prestador.pessoaFisica,
      //     dataNascimento: formatDateToDDMMYYYY(
      //       data?.prestador.pessoaFisica?.dataNascimento
      //     ),
      //   },
      // }));
      queryClient.invalidateQueries(["listar-usuarios"]);
      toaster.create({
        title: "Usuario criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar um usuario",
        type: "error",
      });
    },
  });

  const onSubmit = async (values) => {
    console.log("Values", values);

    const body = {
      ...values,
      email: values?.email === "" ? null : values?.email,
    };

    if (!data) {
      return await createUsuarioMutation({ body });
    }

    return await updateUsuarioMutation({ id: data._id, body });
  };

  const fields = useMemo(() => {
    if (data) {
      return createDynamicFormFields().filter(
        (e) => e?.accessorKey !== "senha"
      );
    }

    return createDynamicFormFields().filter((e) => e?.accessorKey !== "status");
  }, [data]);

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
            setOpen(e.open);
            setData(defaultValues);
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
            <DialogBody
              mt="6"
              overflowY="auto"
              className="dialog-custom-scrollbar"
            >
              <BuildForm
                visibleState={inputsVisibility}
                fields={fields}
                gridColumns={3}
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
