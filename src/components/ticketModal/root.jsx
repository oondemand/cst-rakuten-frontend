import {
  Box,
  Text,
  Flex,
  Icon,
  Badge,
  Heading,
  Button,
  ButtonGroup,
  Textarea,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { memo, useState } from "react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { queryClient } from "../../config/react-query";

import { Oondemand } from "../svg/oondemand";
import { PrestadorForm } from "./form/prestador";

export const TicketModalRoot = ({ open, setOpen, ticket = null, children }) => {
  return (
    <DialogRoot
      placement="center"
      size="lg"
      open={open}
      onOpenChange={({ open }) => {
        queryClient.refetchQueries(["listar-tickets"]);
        setOpen(open);
      }}
    >
      <DialogContent rounded="lg" pb="4" pt="1">
        <DialogTitle
          asChild
          borderBottom="1px solid"
          w="full"
          borderColor="gray.200"
        >
          <Flex gap="4" alignItems="center" py="2" px="4">
            <Oondemand />
            <Heading fontSize="sm">Detalhes do ticket</Heading>
          </Flex>
        </DialogTitle>
        <DialogBody
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          maxH="600px"
          overflowY="auto"
          scrollbarWidth="thin"
        >
          <Flex mt="7" justifyContent="space-between">
            <Text fontSize="sm">{ticket?.titulo}</Text>
            <ButtonGroup size="2xs">
              <Button rounded="lg" disabled colorPalette="yellow">
                Aguardando início
              </Button>
              <Button rounded="lg" disabled={false} colorPalette="green">
                Trabalhando
              </Button>
              <Button rounded="lg" disabled colorPalette="red">
                Revisão
              </Button>
            </ButtonGroup>
          </Flex>
          <Textarea
            color="gray.600"
            fontWeight="medium"
            focusRingColor="gray.700"
            _placeholder={{ color: "gray.400", fontWeight: "medium" }}
            placeholder="Deixe observações pertinentes ao processo deste prestador"
            h="24"
            mt="3"
          />
          {children}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
