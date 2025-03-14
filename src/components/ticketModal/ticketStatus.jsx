import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

export const TicketStatus = ({
  updateTicketMutation,
  ticketStatus,
  ticketId,
}) => {
  const handleChangeStatus = async (status) => {
    if (ticketStatus !== status) {
      await updateTicketMutation({
        id: ticketId,
        body: { status: status },
      });
    }
  };

  return (
    <ButtonGroup size="2xs">
      <Button
        onClick={async () => await handleChangeStatus("aguardando-inicio")}
        opacity={ticketStatus === "aguardando-inicio" ? "1" : "0.5"}
        disabled={!ticketId || !ticketStatus}
        rounded="lg"
        shadow="xs"
        colorPalette="yellow"
      >
        Aguardando início
      </Button>
      <Button
        onClick={async () => await handleChangeStatus("trabalhando")}
        opacity={ticketStatus === "trabalhando" ? "1" : "0.5"}
        disabled={!ticketId || !ticketStatus}
        rounded="lg"
        shadow="xs"
        colorPalette="green"
      >
        Trabalhando
      </Button>
      <Button
        onClick={async () => await handleChangeStatus("revisao")}
        opacity={ticketStatus === "revisao" ? "1" : "0.5"}
        disabled={!ticketId || !ticketStatus}
        rounded="lg"
        shadow="xs"
        colorPalette="red"
      >
        Revisão
      </Button>
    </ButtonGroup>
  );
};
