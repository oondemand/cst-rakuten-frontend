import {
  Box,
  Text,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Textarea,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { queryClient } from "../../config/react-query";

import { Oondemand } from "../svg/oondemand";
import { PrestadorForm } from "./form/prestador";
import { AsyncSelectAutocomplete } from "../asyncSelectAutoComplete";

import { api } from "../../config/api";
import { FloatingLabelInput } from "../input/floatingLabel";
import { useMutation } from "@tanstack/react-query";
import { TicketService } from "../../service/ticket";

import { toaster } from "../ui/toaster";

import { PrestadorService } from "../../service/prestador";
import { PlusSquare } from "lucide-react";
import { ServicoService } from "../../service/servico";
import { TicketStatus } from "./ticketStatus";
import { TicketActions } from "./ticketActions";

export const CreateTicketModal = ({ open, setOpen, defaultValue }) => {
  const [ticket, setTicket] = useState(defaultValue);
  // const [servicos, setServicos] = useState([]);

  const { mutateAsync: createTicketMutation } = useMutation({
    mutationFn: TicketService.adicionarTicket,
    onSuccess: (data) => {
      toaster.create({
        title: "Ticket criado com sucesso!",
        type: "success",
      });

      setTicket(data?.ticket);
    },
  });

  const { mutateAsync: updateTicketMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await TicketService.alterarTicket({ id, body }),
    onSuccess: (data) => {
      toaster.create({
        title: "Ticket atualizado com sucesso!",
        type: "success",
      });

      setTicket(data?.ticket);
    },
  });

  // const { mutateAsync: createServiceMutation } = useMutation({
  //   mutationFn: async ({ body }) => await ServicoService.criarServico({ body }),
  // });

  // const { mutateAsync: updateServicoMutation } = useMutation({
  //   mutationFn: async ({ id, body }) =>
  //     await ServicoService.atualizarServico({ id, body }),
  //   onSuccess: () =>
  //     toaster.create({
  //       title: "Serviço atualizado com sucesso",
  //       type: "success",
  //     }),
  // });

  const onInputTicketFieldBlur = async ({ target: { name, value } }) => {
    if (value !== "" && !ticket) {
      return await createTicketMutation({ [name]: value });
    }

    if (value !== "" && value !== ticket?.[name]) {
      return await updateTicketMutation({
        id: ticket._id,
        body: {
          [name]: value,
        },
      });
    }
  };

  // const adicionarServico = async () => {
  //   const anoCompetencia = 2024;
  //   const mesCompetencia = 12;

  //   const { servico } = await createServiceMutation({
  //     body: { anoCompetencia, mesCompetencia },
  //   });

  //   const response = await updateTicketMutation({
  //     id: ticket._id,
  //     body: { servicos: [...ticket.servicos, servico] },
  //   });

  //   setServicos((prev) => [...prev, servico]);
  // };

  // const atualizarServico = (id, campo, valor) => {
  //   const servicosAtualizados = servicos.map((servico) =>
  //     servico.id === id ? { ...servico, [campo]: valor } : servico
  //   );

  //   setServicos(servicosAtualizados);
  // };

  // const handleServicoBlur = async (id, campo, valor) => {
  //   const servico = ticket.servicos.find((servico) => servico._id === id);

  //   if (valor !== servico[campo]) {
  //     await updateServicoMutation({
  //       id,
  //       body: { [campo]: valor },
  //     });

  //     servico[campo] = valor;
  //   }
  // };

  return (
    <DialogRoot
      size="cover"
      open={open}
      onOpenChange={({ open }) => {
        queryClient.invalidateQueries(["listar-tickets"]);
        setOpen(open);
      }}
    >
      <DialogContent
        overflow="auto"
        scrollbarWidth="thin"
        w="1000px"
        h="95%"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogTitle
          asChild
          borderBottom="1px solid"
          w="full"
          borderColor="gray.200"
        >
          <Flex gap="4" alignItems="center" mt="-4" py="2" px="4">
            <Oondemand />
            <Heading fontSize="sm">Criar novo ticket</Heading>
          </Flex>
        </DialogTitle>
        <DialogBody
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          maxH="600px"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray.200",
              borderRadius: "1px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Flex mt="7" w="full" gap="4" justifyContent="space-between">
            <Input
              autoComplete="off"
              fontSize="md"
              borderBottom="none"
              focusRing="transparent"
              focusRingColor="transparent"
              outline="none"
              name="titulo"
              bg="white"
              onBlur={onInputTicketFieldBlur}
              variant="subtle"
              size="sm"
              placeholder="Titulo..."
              px="0"
              defaultValue={ticket?.titulo}
            />
            <TicketStatus
              ticketId={ticket?._id}
              ticketStatus={ticket?.status}
              updateTicketMutation={updateTicketMutation}
            />
          </Flex>
          <Textarea
            defaultValue={ticket?.observacao}
            name="observacao"
            disabled={!ticket}
            onBlur={onInputTicketFieldBlur}
            color="gray.600"
            fontWeight="medium"
            focusRingColor="gray.700"
            _placeholder={{ color: "gray.400", fontWeight: "medium" }}
            placeholder="Deixe observações pertinentes ao processo deste ticket"
            h="24"
            mt="3"
          />

          <PrestadorForm
            ticket={ticket}
            updateTicketMutation={updateTicketMutation}
          />

          {/* <Grid templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={1} mt="6">
              <Box w="100px">
                <Text color="gray.600" fontSize="sm">
                  Serviços
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3} mt="6">
              <Box
                mt="2"
                w="full"
                h="1"
                borderBottom="2px solid"
                borderColor="gray.100"
              />

              {servicos.map((servico) => (
                <Flex key={servico.id} gap="2" mt="8">
                  <FloatingLabelInput
                    label="Competência"
                    fontSize="xs"
                    value={servico.competencia}
                    onChange={(e) =>
                      atualizarServico(
                        servico.id,
                        "competencia",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleServicoBlur(
                        servico.id,
                        "competencia",
                        e.target.value
                      )
                    }
                  />
                  <FloatingLabelInput
                    label="Descrição"
                    fontSize="xs"
                    value={servico.descricao}
                    onChange={(e) =>
                      atualizarServico(servico.id, "descricao", e.target.value)
                    }
                    onBlur={(e) =>
                      handleServicoBlur(servico.id, "descricao", e.target.value)
                    }
                  />
                  <FloatingLabelInput
                    label="Valor"
                    fontSize="xs"
                    value={servico.valor}
                    onChange={(e) =>
                      atualizarServico(servico.id, "valor", e.target.value)
                    }
                    onBlur={(e) =>
                      handleServicoBlur(servico.id, "valor", e.target.value)
                    }
                  />
                </Flex>
              ))}

              <Button
                disabled={!ticket}
                mt="4"
                size="xs"
                variant="ghost"
                onClick={adicionarServico}
              >
                <PlusSquare />
                Adicionar serviço
              </Button>
            </GridItem>
          </Grid> */}
        </DialogBody>
        {defaultValue && (
          <DialogFooter justifyContent="start">
            <TicketActions
              updateTicketMutation={updateTicketMutation}
              ticketId={ticket._id}
              etapa={ticket?.etapa}
            />
          </DialogFooter>
        )}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
