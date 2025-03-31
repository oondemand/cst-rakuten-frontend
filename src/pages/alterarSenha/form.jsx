import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../../service/auth";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, Input, Box, VStack, Text } from "@chakra-ui/react";

import { toaster } from "../../components/ui/toaster";
import { useEffect } from "react";

const FormSchema = z
  .object({
    novaSenha: z
      .string()
      .min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
    confirmacao: z.string().nonempty({ message: "Confirmação é obrigatória" }),
  })
  .refine((data) => data.confirmacao === data.novaSenha, {
    message: "As senhas precisam ser iguais",
    path: ["confirmacao"],
  });

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const token = searchParams.get("code");
    if (token) {
      localStorage.setItem("code", token);
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      novaSenha: "",
      confirmacao: "",
    },
  });

  const { mutateAsync: LoginMutation } = useMutation({
    mutationFn: LoginService.criarNovaSenha,
    onSuccess({ token, usuario: user }) {
      if (user.tipo === "prestador") {
        toaster.create({
          title: "Sem permissões para acessar a esteira de serviços!",
          type: "error",
        });

        return;
      }

      login(token, user);
      localStorage.removeItem("code");
      return navigate("/");
    },
    onError(error) {
      console.log("[ERROR]:", error);

      toaster.create({
        title: "Erro a ao fazer login",
        type: "error",
      });
    },
  });

  return (
    <Box w="full">
      <form onSubmit={handleSubmit(LoginMutation)}>
        <VStack spaceY="4">
          <Box w="full">
            <Text color="brand.500">Nova Senha</Text>
            <Input
              focusRingColor="brand.350"
              placeholder="Sua senha"
              {...register("novaSenha")}
            />
            {errors.novaSenha?.message && (
              <Text fontSize="sm" color="red.500">
                {errors.novaSenha.message}
              </Text>
            )}
          </Box>

          <Box w="full">
            <Text color="brand.500">Confirmação</Text>
            <Input
              focusRingColor="brand.350"
              type="senha"
              placeholder="Confirmação"
              {...register("confirmacao")}
            />
            {errors.confirmacao?.message && (
              <Text fontSize="sm" color="red.500">
                {errors.confirmacao.message}
              </Text>
            )}
          </Box>

          <Button w="full" fontWeight="semibold" type="submit" bg="blue.500">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
