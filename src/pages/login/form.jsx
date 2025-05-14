import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../../service/auth";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, Input, Box, VStack, Text } from "@chakra-ui/react";

import { toaster } from "../../components/ui/toaster";

const FormSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido!"),
  senha: z
    .string({ message: "Senha é obrigatória" })
    .min(6, { message: "A senha precisa ter pelo menos 6 dígitos!" }),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const { mutateAsync: LoginMutation } = useMutation({
    mutationFn: LoginService.logIn,
    onSuccess({ token, usuario: user }) {
      if (user.tipo === "prestador") {
        toaster.create({
          title: "Sem permissões para acessar a esteira de serviços!",
          type: "error",
        });

        return;
      }

      login(token, user);
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
            <Text color="brand.500">Email</Text>
            <Input
              focusRingColor="brand.350"
              placeholder="Seu email"
              {...register("email")}
            />
            {errors.email?.message && (
              <Text fontSize="sm" color="red.500">
                {errors.email.message}
              </Text>
            )}
          </Box>

          <Box w="full">
            <Text color="brand.500">Senha</Text>
            <Input
              focusRingColor="brand.350"
              type="password"
              placeholder="Sua senha"
              {...register("senha")}
            />
            {errors.senha?.message && (
              <Text fontSize="sm" color="red.500">
                {errors.senha.message}
              </Text>
            )}
          </Box>

          <Button w="full" fontWeight="semibold" type="submit" bg="blue.500">
            Entrar
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
