import { Box, Button } from "@chakra-ui/react";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { createDynamicFormFields } from "./formFields";
import { BuildForm } from "../../components/buildForm/index";
import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";

export const ServicosDialog = ({
  initialData = null,
  label = "Criar Serviço",
}) => {
  const [data, setData] = useState(initialData);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "SERVICOS",
  });

  const { mutateAsync: updateServicoMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await api.patch(`servicos/${data._id}`, body),
    onSuccess(data) {
      setData((prev) => data.data.servico);
      queryClient.refetchQueries(["listar-servicos"]);

      toaster.create({
        title: "Servico atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o serviço",
        type: "error",
      });
    },
  });

  const { mutateAsync: createServicoMutation } = useMutation({
    mutationFn: async ({ body }) => await api.post(`servicos`, body),
    onSuccess(data) {
      setData((prev) => data.data.servico);
      queryClient.refetchQueries(["listar-servicos"]);

      toaster.create({
        title: "Serviço criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar um serviço",
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

    if (!data) {
      return await createServicoMutation({ body });
    }

    return await updateServicoMutation({ id: data._id, body });
  };

  const fields = useMemo(() => createDynamicFormFields(), []);

  // function onCloseModal() {
  //   queryClient.refetchQueries(["listar-servicos"]);
  //   !initialData && setData();
  //   onClose();
  // }

  return (
    <Box>
      <VisibilityControlDialog
        fields={fields}
        setVisibilityState={setInputsVisibility}
        visibilityState={inputsVisibility}
        title="Ocultar campos"
      />
      <BuildForm
        visibleState={inputsVisibility}
        fields={fields}
        gridColumns={4}
        gap={6}
        data={data}
        onSubmit={onSubmit}
      />
    </Box>
    // <>
    //   <Button
    //     onClick={() => {
    //       onOpen();
    //     }}
    //     size="sm"
    //     variant="subtle"
    //     fontWeight="semibold"
    //     _hover={{ backgroundColor: "gray.50" }}
    //   >
    //     {label}
    //   </Button>

    //   {isOpen && (
    //     <AlertDialog
    //       isOpen={isOpen}
    //       onClose={onCloseModal}
    //       leastDestructiveRef={cancelRef}
    //       isCentered
    //       size="6xl"
    //     >
    //       <AlertDialogOverlay>
    //         <AlertDialogContent>
    //           <AlertDialogHeader
    //             display="flex"
    //             gap="2"
    //             alignItems="center"
    //             fontSize="lg"
    //             fontWeight="bold"
    //           >
    //             Criar serviço

    //           </AlertDialogHeader>
    //           <AlertDialogBody pb="8">

    //           </AlertDialogBody>
    //           <AlertDialogCloseButton />
    //         </AlertDialogContent>
    //       </AlertDialogOverlay>
    //     </AlertDialog>
    //   )}
    // </>
  );
};
