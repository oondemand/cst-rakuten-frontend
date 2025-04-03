import { IconButton } from "@chakra-ui/react";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { PrestadorService } from "../../../service/prestador";
import { Tooltip } from "../../ui/tooltip";

export const EnviarConvitePrestadorAction = ({ prestador }) => {
  const { mutateAsync: enviarConviteUsuarioPrestador, isPending } = useMutation(
    {
      mutationFn: async () =>
        await PrestadorService.enviarConvite({ prestador: prestador?._id }),
      onSuccess() {
        toaster.create({
          title: "Convite enviado!",
          description: "Verifique a caixa de emails!",
          type: "success",
        });
      },
      onError: (error) => {
        toaster.create({
          title: "Ouve um erro ao enviar convite!",
          description: "Um erro inesperado aconteceu ao enviar convite!",
          type: "error",
        });
      },
    }
  );

  const handleDeleteServico = async () => {
    if (!prestador?.email) {
      return toaster.create({
        title: "Erro ao enviar convite!",
        description: "Um email válido é obrigatório para fazer o acesso.",
        type: "error",
      });
    }

    await enviarConviteUsuarioPrestador();
  };

  return (
    <Tooltip
      content="Enviar convite"
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
        colorPalette="blue"
        size="2xs"
        onClick={handleDeleteServico}
      >
        <Send />
      </IconButton>
    </Tooltip>
  );
};
