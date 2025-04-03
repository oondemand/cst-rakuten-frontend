import { IconButton } from "@chakra-ui/react";
import { ArchiveRestore, LockKeyholeOpen, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { Tooltip } from "../../ui/tooltip";
import { LoginService } from "../../../service/auth";
import { TicketService } from "../../../service/ticket";
import { queryClient } from "../../../config/react-query";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const RestaurarTicketAction = ({ ticket }) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: restaurarTicketMutation, isPending } = useMutation({
    mutationFn: async () =>
      await TicketService.alterarTicket({
        id: ticket._id,
        body: { status: "revisao" },
      }),
    onSuccess() {
      queryClient.invalidateQueries(["listar-tickets-arquivados"]);
      toaster.create({
        title: "O ticket foi restaurado com sucesso!",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao restaurar ticket!",
        description: "Um erro inesperado aconteceu ao restaurar ticket!",
        type: "error",
      });
    },
  });

  const handleDeleteServico = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja restaurar ticket?",
      description: "Essa operação pode causar conflito com tickets existentes!",
    });

    if (action === "confirmed") {
      await restaurarTicketMutation();
    }
  };

  return (
    <Tooltip
      content="Restaurar ticket"
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
        disabled={isPending}
        variant="surface"
        colorPalette="gray"
        size="2xs"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDeleteServico();
        }}
      >
        <ArchiveRestore />
      </IconButton>
    </Tooltip>
  );
};
