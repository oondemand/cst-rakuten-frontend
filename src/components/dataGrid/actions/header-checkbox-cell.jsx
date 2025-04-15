import { Checkbox, Flex } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { useMutation } from "@tanstack/react-query";
import { ServicoService } from "../../../service/servico";
import { queryClient } from "../../../config/react-query";

export const HeaderCheckActionCell = ({ ...props }) => {
  const data = props.table.options?.data;

  const checked = !data?.some(
    (servico) => !["pendente", "processando"].includes(servico?.status)
  );

  const { mutateAsync: updateServicesStatus, isPending } = useMutation({
    mutationFn: async ({ ids, status }) =>
      await ServicoService.atualizarStatus({ ids, status }),
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro inesperado ao realizar operação!",
        description: error?.response?.data?.message ?? "",
        type: "error",
      });
    },
  });

  const handleCheckChange = async (e) => {
    if (checked) {
      const servicesToUpdate = data.filter(
        (servico) => servico?.status === "pendente"
      );

      await updateServicesStatus({ ids: servicesToUpdate, status: "aberto" });
    }

    if (!checked) {
      const servicesToUpdate = data.filter(
        (servico) => servico?.status === "aberto"
      );

      await updateServicesStatus({
        ids: servicesToUpdate,
        status: "pendente",
      });
    }

    queryClient.invalidateQueries(["listar-servicos"]);
  };

  return (
    <Flex w="full" ml="2.5">
      <Checkbox.Root
        colorPalette={checked ? "orange" : "gray"}
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
