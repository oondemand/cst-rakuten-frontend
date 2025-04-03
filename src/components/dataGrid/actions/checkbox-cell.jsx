import { Checkbox, Flex } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { useMutation } from "@tanstack/react-query";
import { TicketService } from "../../../service/ticket";
import { ServicoService } from "../../../service/servico";
import { queryClient } from "../../../config/react-query";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const CheckActionCell = ({ ...props }) => {
  const { requestConfirmation } = useConfirmation();

  const checked = ["pendente", "processando"].includes(
    props.row.original.status
  );

  const colorPalletMaps = {
    aberto: "",
    pendente: "orange",
    processando: "purple",
  };

  const { mutateAsync: deleteServicoMutation } = useMutation({
    mutationFn: async ({ servicoId }) =>
      await TicketService.removerServico({ servicoId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["listar-servicos"]);
    },
    onError: ({}) => {
      toaster.create({
        title: "Ouve um erro inesperado ao realizar operação!",
        type: "error",
      });
    },
  });

  const { mutateAsync: updateServicoMutation, isPending } = useMutation({
    mutationFn: async ({ id, body }) =>
      await ServicoService.atualizarServico({ id, body }),
    onSuccess() {
      queryClient.invalidateQueries(["listar-servicos"]);
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro inesperado ao realizar operação!",
        type: "error",
      });
    },
  });

  const handleCheckChange = async (e) => {
    if (props.row.original.status === "processando") {
      const { action } = await requestConfirmation({
        title: "Tem certeza ?",
        description: "Essa operação ira remover o serviço do ticket.",
      });

      if (action === "confirmed") {
        return await deleteServicoMutation({
          servicoId: props.row.original._id,
        });
      }
    }

    if (props.row.original.status === "aberto") {
      return await updateServicoMutation({
        id: props.row.original._id,
        body: { status: "pendente" },
      });
    }

    if (props.row.original.status === "pendente") {
      return await updateServicoMutation({
        id: props.row.original._id,
        body: { status: "aberto" },
      });
    }
  };

  return (
    <Flex w="full" placeContent="center">
      <Checkbox.Root
        colorPalette={colorPalletMaps[props.row.original.status]}
        variant="subtle"
        checked={checked}
        onChange={handleCheckChange}
        disabled={isPending}
        cursor="pointer"
        _disabled={{ cursor: "not-allowed" }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Root>
    </Flex>
  );
};
