import {
  Box,
  Text,
  Flex,
  Heading,
  Button,
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
import { FilesForm } from "./form/files";
import { ServicoForm } from "./form/servico";
import { DocumentoFiscalForm } from "./form/documentoFiscal";

export const CreateTicketModal = ({
  open,
  setOpen,
  defaultValue,
  onlyReading,
}) => {
  const [ticket, setTicket] = useState(defaultValue);

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
        overflow="hidden"
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
          pb="8"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          overflowY="auto"
          className="dialog-custom-scrollbar"
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
              disabled={onlyReading}
            />
            <TicketStatus
              disabled={onlyReading}
              ticketId={ticket?._id}
              ticketStatus={ticket?.status}
              updateTicketMutation={updateTicketMutation}
            />
          </Flex>
          <Textarea
            defaultValue={ticket?.observacao}
            name="observacao"
            disabled={onlyReading || !ticket}
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
            onlyReading={onlyReading}
            ticket={ticket}
            updateTicketMutation={updateTicketMutation}
          />

          <ServicoForm
            onlyReading={onlyReading}
            ticket={ticket}
            updateTicketMutation={updateTicketMutation}
          />

          <DocumentoFiscalForm
            onlyReading={onlyReading}
            ticket={ticket}
            updateTicketMutation={updateTicketMutation}
          />

          <FilesForm
            onlyReading={onlyReading}
            defaultValues={ticket?.arquivos}
            ticketId={ticket?._id}
          />
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
