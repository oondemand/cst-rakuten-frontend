import { Flex, Button, useDialogContext } from "@chakra-ui/react";
import { Check, File, Trash, X } from "lucide-react";

import { toaster } from "../ui/toaster";
import { TicketService } from "../../service/ticket";
import { useMutation } from "@tanstack/react-query";
import { useConfirmation } from "../../hooks/useConfirmation";
import { queryClient } from "../../config/react-query";

export const TicketActions = ({ ticketId, etapa }) => {
  const { setOpen } = useDialogContext();
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: arquiveTicketMutation } = useMutation({
    mutationFn: async () =>
      await TicketService.alterarTicket({
        id: ticketId,
        body: {
          status: "arquivado",
        },
      }),
    onSuccess: () => {
      toaster.create({
        title: "Ticket arquivado com sucesso!",
        type: "info",
      });
    },
    onError: () => {
      toaster.error({ title: "Ouve um erro ao arquivar o ticket!" });
    },
  });

  const { mutateAsync: aproveTicketMutation } = useMutation({
    mutationFn: async () => await TicketService.aprovarTicket({ id: ticketId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listar-tickets"]);
      toaster.create({
        title: "Ticket aprovado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.error({ title: "Ouve um erro ao aprovar o ticket!" });
    },
  });

  const { mutateAsync: reproveTicketMutation } = useMutation({
    mutationFn: async () =>
      await TicketService.reprovarTicket({ id: ticketId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listar-tickets"]);
      toaster.create({
        title: "Ticket reprovado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.error({ title: "Ouve um erro ao reprovar o ticket!" });
    },
  });

  const handleArquiveTicket = async () => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja arquivar ticket?",
      description: "Todo o seu progresso será perdido!",
    });

    if (action === "confirmed") {
      await arquiveTicketMutation();
      setOpen(false);
    }
  };

  return (
    <Flex alignItems="center" w="full" justifyContent="space-between">
      <Flex gap="2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            aproveTicketMutation();
          }}
          // disabled={etapa === "aprovacao-pagamento"}
          variant="surface"
          shadow="xs"
          colorPalette="green"
          size="xs"
        >
          <Check /> Aprovar
        </Button>
        <Button
          // disabled={etapa === "requisicao"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            reproveTicketMutation();
          }}
          colorPalette="red"
          variant="surface"
          shadow="xs"
          size="xs"
        >
          <X /> Reprovar
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleArquiveTicket();
          }}
          variant="surface"
          shadow="xs"
          size="xs"
        >
          <Trash /> Arquivar
        </Button>
      </Flex>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }}
        variant="surface"
        shadow="xs"
        size="xs"
      >
        Fechar
      </Button>
    </Flex>
  );
};
