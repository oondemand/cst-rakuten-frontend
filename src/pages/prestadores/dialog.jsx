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

export const PrestadoresDialog = ({
  initialData = null,
  label = "Criar prestador",
}) => {
  const [data, setData] = useState(initialData);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "PRESTADORES",
  });

  const { mutateAsync: updatePrestadorMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await api.patch(`prestadores/${data._id}`, body),
    onSuccess(data) {
      setData((prev) => data.data.prestador);
      toaster.create({
        title: "Prestador atualizado com sucesso",
        type: "success",
      });
      queryClient.invalidateQueries(["listar-prestadores"]);
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o prestador",
        type: "error",
      });
    },
  });

  const { mutateAsync: createPrestadorMutation } = useMutation({
    mutationFn: async ({ body }) => await api.post(`prestadores`, body),
    onSuccess(data) {
      setData((prev) => data.data.prestador);

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

  // function onCloseModal() {
  //   queryClient.refetchQueries(["listar-prestadores"]);
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
