import { Button, IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { queryClient } from "../../../config/react-query";
import { api } from "../../../config/api";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const DeletePrestadorAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deletePrestadorMutation } = useMutation({
    mutationFn: async () => await api.delete(`prestadores/${id}`),
    onSuccess() {
      queryClient.invalidateQueries(["listar-prestadores"]);
      toaster.create({
        title: "Prestador excluído com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao excluir prestador",
        type: "error",
      });
    },
  });

  const handleDeletePrestador = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir prestador?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      await deletePrestadorMutation();
    }
  };

  return (
    <>
      <IconButton
        variant="surface"
        colorPalette="red"
        size="2xs"
        onClick={handleDeletePrestador}
      >
        <Trash />
      </IconButton>
    </>
  );
};
