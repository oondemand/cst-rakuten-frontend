import { Box, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "../../components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleAlert, ListRestart } from "lucide-react";
import { TicketDetailsModal } from "./modal";
import { memo, useState } from "react";

export const _Card = ({ ticket }) => {
  const [open, setOpen] = useState(false);
  const statusColorMap = {
    processando: "yellow.400",
    falhas: "red.400",
    requisicao: "gray.300",
    sucesso: "green.500",
  };

  return (
    <Box>
      <Box cursor="pointer" p={2} my={2} color="brand.900" h="50px">
        <Flex
          alignItems="center"
          gap="2"
          fontWeight="bold"
          fontSize="md"
          py="1"
          rounded="lg"
          bg="white"
          p="2"
          boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.05)"
          _hover={{ background: "gray.50" }}
          onClick={() => setOpen(true)}
        >
          <Flex w="full" flexDir="column" gap="2">
            <Flex w="full" alignItems="baseline" gap="2">
              <Box
                rounded="full"
                minH="12px"
                minW="12px"
                bg={statusColorMap[ticket?.etapa] || "blue.500"}
              />
              <Tooltip
                showArrow
                content={ticket?.prestador?.titulo}
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
                <Box w="90%">
                  <Text
                    truncate
                    fontWeight={500}
                    fontSize="xs"
                    color="gray.700"
                  >
                    {ticket?.prestador?.titulo}
                  </Text>
                  <Text
                    truncate
                    fontWeight={400}
                    fontSize="2xs"
                    color="gray.400"
                  >
                    {format(ticket?.createdAt, "dd MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </Text>
                </Box>
              </Tooltip>
            </Flex>
            <Flex
              w="full"
              alignItems="center"
              justifyContent="space-between"
              gap="2"
            >
              <Flex alignItems="center" gap="2">
                <Tooltip
                  showArrow
                  content={`Erros ${ticket?.erros?.length ?? 0}`}
                  positioning={{ placement: "bottom" }}
                  openDelay={500}
                  closeDelay={50}
                  contentProps={{
                    css: {
                      "--tooltip-bg": "white",
                      color: "gray.600",
                    },
                  }}
                >
                  <Flex color="gray.400" alignItems="center" gap="1">
                    <CircleAlert size={14} />
                    <Text
                      h="15px"
                      textAlign="center"
                      fontWeight={400}
                      fontSize="xs"
                    >
                      {ticket?.erros?.length ?? 0}
                    </Text>
                  </Flex>
                </Tooltip>
                <Tooltip
                  showArrow
                  content={`Tentativas ${ticket?.tentativas ?? 0}`}
                  positioning={{ placement: "bottom" }}
                  openDelay={500}
                  closeDelay={50}
                  contentProps={{
                    css: {
                      "--tooltip-bg": "white",
                      color: "gray.600",
                    },
                  }}
                >
                  <Flex color="gray.400" alignItems="center" gap="1px">
                    <ListRestart size={14} />
                    <Text
                      h="15px"
                      textAlign="center"
                      fontWeight={400}
                      fontSize="xs"
                    >
                      {ticket?.tentativas ?? 0}
                    </Text>
                  </Flex>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      {open && (
        <TicketDetailsModal
          onlyReading={true}
          open={open}
          ticket={ticket}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export const Card = memo(_Card);
