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

export const TicketModal = ({ open, setOpen, ticket = null }) => {
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
          css={{
            // Estilização do scrollbar (WebKit)
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "8px", // Só é necessário para scroll horizontal
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c2c2c2", // Use cores do tema se possível (ex.: "gray.300")
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#dbdbdb",
            },
            // Corner (opcional)
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
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
          <Grid templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={1} mt="6">
              <Box w="100px">
                <Text color="gray.600" fontSize="sm">
                  Dados do Prestador
                </Text>
              </Box>
            </GridItem>
            {/* <GridItem colSpan={3} mt="6">
              <PrestadorForm prestador={ticket?.prestador} />
            </GridItem> */}
          </Grid>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
