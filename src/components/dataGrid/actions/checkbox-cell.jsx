import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../../ui/toaster";
import { useMutation } from "@tanstack/react-query";
import { TicketService } from "../../../service/ticket";

export const CheckActionCell = ({ ...props }) => {
  const defaultValue = ["pendente", "processando"].includes(
    props.row.original.status
  );

  const [checkbox, setCheckbox] = useState(defaultValue);

  const colorPalletMaps = {
    aberto: "",
    pendente: "orange",
    processando: "purple",
  };

  // const { mutateAsync: deleteServicoMutation } = useMutation({
  //   mutationFn: async ({ servicoId }) =>
  //     await TicketService.removerServico({ ticketId: ticket?._id, servicoId }),
  //   onSuccess: ({ servicos }) => {
  //     toaster.create({
  //       title: "Serviço removido com sucesso!",
  //       type: "success",
  //     });
  //   },
  //   onError: ({}) => {
  //     toaster.create({
  //       title: "Erro ao remover serviço",
  //       type: "error",
  //     });
  //   },
  // });

  return (
    <Flex w="full" placeContent="center">
      <Checkbox.Root
        colorPalette={colorPalletMaps[props.row.original.status]}
        variant="subtle"
        checked={checkbox}
        onChange={(e) => setCheckbox(e.target.checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Root>
    </Flex>
  );
};
