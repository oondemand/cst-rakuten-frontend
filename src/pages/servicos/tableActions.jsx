import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useConfirmation } from "../../hooks/useConfirmation";
import { useServicoForm } from "../../hooks/useServicosForm";

export const TableActions = ({ table, row }) => {
  const { requestConfirmation } = useConfirmation();
  const { onOpen } = useServicoForm();

  return (
    <Flex gap="1">
      <Button
        size="2xs"
        onClick={async () => {
          const { action } = await requestConfirmation({
            title: "Tem certeza que deseja excluir prestador?",
            description: "Essa operação não pode ser desfeita.",
          });

          if (action === "confirmed") {
            await table.options.meta?.deleteData({
              prestadorId: row.original._id,
            });
          }
        }}
        variant="subtle"
        colorPalette="red"
      >
        Excluir
      </Button>
      <Button
        onClick={() => onOpen("Serviços detalhes", row.original)}
        size="2xs"
        variant="subtle"
        colorPalette="gray"
      >
        Alterar
      </Button>
    </Flex>
  );
};
