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

  const { mutateAsync: updateServicoMutation, isPending } = useMutation({
    mutationFn: async ({ id, body }) =>
      await ServicoService.atualizarServico({ id, body }),
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro inesperado ao realizar operação!",
        type: "error",
      });
    },
  });

  const handleCheckChange = async (e) => {
    for (const servico of data) {
      if (!checked && servico?.status === "aberto") {
        await updateServicoMutation({
          id: servico?._id,
          body: { status: "pendente" },
        });

        continue;
      }

      if (checked && servico?.status === "pendente") {
        servico.status = "aberto";
        await updateServicoMutation({
          id: servico?._id,
          body: { status: "aberto" },
        });

        continue;
      }
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
