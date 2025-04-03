import { IconButton } from "@chakra-ui/react";
import { LockKeyholeOpen, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { UsuarioService } from "../../../service/usuario";
import { Tooltip } from "../../ui/tooltip";
import { LoginService } from "../../../service/auth";

export const RecuperarSenhaUsuarioAction = ({ usuario }) => {
  const { mutateAsync: enviarConviteUsuarioUsuario, isPending } = useMutation({
    mutationFn: async () =>
      await LoginService.esqueciMinhaSenha(usuario?.email),
    onSuccess() {
      toaster.create({
        title: "Convite enviado!",
        description: "Verifique a caixa de emails!",
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error);

      toaster.create({
        title: "Ouve um erro ao enviar convite!",
        description: "Um erro inesperado aconteceu ao enviar convite!",
        type: "error",
      });
    },
  });

  const handleDeleteServico = async () => {
    if (!usuario?.email) {
      return toaster.create({
        title: "Erro ao enviar convite!",
        description: "Um email válido é obrigatório para fazer o acesso.",
        type: "error",
      });
    }

    await enviarConviteUsuarioUsuario();
  };

  return (
    <Tooltip
      content="Recuperar senha"
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
        onClick={handleDeleteServico}
      >
        <LockKeyholeOpen />
      </IconButton>
    </Tooltip>
  );
};
