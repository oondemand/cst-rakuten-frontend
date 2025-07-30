import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Box,
  Button,
  Badge,
} from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { queryClient } from "../../../../config/react-query";

import { Oondemand } from "../../../../components/svg/oondemand";
import { PrestadorForm } from "./form/prestador";
import { TicketActions } from "./actions";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../../../components/ui/accordion";

import { JsonView, allExpanded, collapseAllNested } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const customTheme = {};

export const TicketDetailsModal = ({ open, setOpen, ticket, onlyReading }) => {
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
            <Flex gap="4" alignItems="baseline">
              <Heading fontSize="sm">Detalhes</Heading>
              <Text fontSize="xs" fontWeight="normal" fontStyle="italic">
                {ticket?.prestadorId}
              </Text>
            </Flex>
          </Flex>
        </DialogTitle>
        <DialogBody
          pb="16"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          overflowY="auto"
          className="dialog-custom-scrollbar"
        >
          <Flex mt="7" w="full" gap="4" justifyContent="space-between">
            <Text fontSize="md">{ticket?.prestador?.titulo}</Text>
          </Flex>
          <PrestadorForm
            prestador={ticket?.prestador}
            onlyReading={onlyReading}
          />
          <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={1} mt="6">
              <Box w="100px">
                <Text color="gray.600" fontSize="sm">
                  Detalhes da requisicao
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3} mt="6">
              <Box
                w="full"
                h="1"
                borderBottom="2px solid"
                borderColor="gray.100"
              />
              <Box mt="8">
                {ticket?.requisicao && (
                  <Box bg="gray.50" p="4" rounded="sm" mb="4">
                    <Text fontSize="sm" color="gray.600" mb="2.5">
                      Url:
                    </Text>
                    <Box
                      p="2.5"
                      bg="white"
                      rounded="sm"
                      fontWeight="medium"
                      mb="4"
                    >
                      {ticket?.requisicao?.url || "N/A"}
                    </Box>
                    <Text fontSize="sm" color="gray.600" mb="2.5">
                      Body:
                    </Text>
                    <Box p="2.5" bg="white" rounded="sm" fontWeight="normal">
                      <JsonView
                        container={{ backgroundColor: "red" }}
                        data={ticket?.requisicao?.body}
                        shouldExpandNode={collapseAllNested}
                        style={customTheme}
                      />
                    </Box>
                  </Box>
                )}

                {ticket?.erros &&
                  ticket?.erros?.length > 0 &&
                  ticket?.erros?.map((item, index) => (
                    <AccordionRoot key={`$-${index}`} collapsible>
                      <AccordionItem mb="2">
                        <AccordionItemTrigger cursor="pointer" border="none">
                          <Flex alignItems="center" gap="2">
                            <Text
                              fontSize="sm"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Tentativa {index + 1}
                            </Text>
                            <Badge colorPalette="red">Error</Badge>
                          </Flex>
                        </AccordionItemTrigger>
                        <AccordionItemContent w="full">
                          <Box bg="gray.50" p="4" rounded="md">
                            <Text fontSize="sm" mt="2" color="gray.600" mb="2">
                              Resposta:
                            </Text>
                            <Box
                              p="2"
                              bg="white"
                              rounded="md"
                              fontWeight="normal"
                            >
                              <JsonView
                                container={{ backgroundColor: "red" }}
                                data={item}
                                shouldExpandNode={collapseAllNested}
                                style={customTheme}
                              />
                            </Box>
                          </Box>
                        </AccordionItemContent>
                      </AccordionItem>
                    </AccordionRoot>
                  ))}
                {ticket?.resposta && (
                  <AccordionRoot collapsible>
                    <AccordionItem mb="2">
                      <AccordionItemTrigger cursor="pointer" border="none">
                        <Flex alignItems="center" gap="2">
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            fontWeight="semibold"
                          >
                            Tentativa {ticket?.erros?.length + 1}
                          </Text>
                          <Badge colorPalette="green">Sucesso</Badge>
                        </Flex>
                      </AccordionItemTrigger>
                      <AccordionItemContent w="full">
                        <Box bg="gray.50" p="4" rounded="md">
                          <Text fontSize="sm" mt="2" color="gray.600" mb="2">
                            Resposta:
                          </Text>
                          <Box
                            p="2"
                            bg="white"
                            rounded="md"
                            fontWeight="normal"
                          >
                            <JsonView
                              container={{ backgroundColor: "red" }}
                              data={ticket?.resposta}
                              shouldExpandNode={collapseAllNested}
                              style={customTheme}
                            />
                          </Box>
                        </Box>
                      </AccordionItemContent>
                    </AccordionItem>
                  </AccordionRoot>
                )}
              </Box>
            </GridItem>
          </Grid>
        </DialogBody>
        <DialogFooter justifyContent="start">
          <TicketActions integracaoId={ticket?._id} etapa={ticket.etapa} />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
