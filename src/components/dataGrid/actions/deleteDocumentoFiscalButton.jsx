import { Button, IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { queryClient } from "../../../config/react-query";
import { api } from "../../../config/api";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";

export const DeleteDocumentoFiscalAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteDocumentoFiscalMutation } = useMutation({
    mutationFn: async () => await api.delete(`/documentos-fiscais/${id}`),
    onSuccess() {
      queryClient.refetchQueries(["listar-documentos-fiscais"]);
      toaster.create({
        title: "Documento fiscal excluído com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao excluir documento fiscal",
        type: "error",
      });
    },
  });

  const handleDeleteDocumentoFiscal = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir documento fiscal?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      await deleteDocumentoFiscalMutation();
    }
  };

  return (
    <Tooltip
      content="Excluir documento fiscal"
      positioning={{ placement: "top" }}
      openDelay={700}
      closeDelay={50}
      contentProps={{
        css: {
          "--tooltip-bg": "white",
          color: "gray.600",
        },
      }}
    >
      <IconButton
        variant="surface"
        colorPalette="red"
        size="2xs"
        onClick={handleDeleteDocumentoFiscal}
      >
        <Trash />
      </IconButton>
    </Tooltip>
  );
};
