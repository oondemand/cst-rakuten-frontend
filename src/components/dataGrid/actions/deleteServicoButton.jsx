import { Button, IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { queryClient } from "../../../config/react-query";
import { api } from "../../../config/api";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const DeleteServicoAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteServicoMutation } = useMutation({
    mutationFn: async () => await api.delete(`servicos/${id}`),
    onSuccess() {
      queryClient.refetchQueries(["listar-servicos"]);
      toaster.create({
        title: "Serviço excluído com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao excluir serviço",
        type: "error",
      });
    },
  });

  const handleDeleteServico = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir serviço?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      await deleteServicoMutation();
    }
  };

  return (
    <>
      <IconButton
        variant="surface"
        colorPalette="red"
        size="2xs"
        onClick={handleDeleteServico}
      >
        <Trash />
      </IconButton>
    </>
  );
};
