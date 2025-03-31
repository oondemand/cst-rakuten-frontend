import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Table,
  Text,
} from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FileCheck2, PiggyBank } from "lucide-react";
import { DashboardService } from "../../service/dashboard";

import { currency } from "../../utils/currency";

export const Dashboard = () => {
  const { data: valoresPorStatus } = useQuery({
    queryFn: DashboardService.obterValoresPorStatus,
    queryKey: ["dashboard-servicos"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const { data: ticketsPorStatus } = useQuery({
    queryFn: DashboardService.obterTicketsPorStatus,
    queryKey: ["dashboard-tickets-status"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const { data: ticketsPorEtapa } = useQuery({
    queryFn: DashboardService.obterTicketsPorEtapa,
    queryKey: ["dashboard-tickets-etapa"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const valorTotalTodosServicos = valoresPorStatus?.reduce((acc, cur) => {
    return acc + cur.total;
  }, 0);

  const servicoStatusColorMap = {
    processando: "purple.500",
    aberto: "blue.500",
    pendente: "orange.500",
    aberto: "blue.500",
    pago: "green.500",
    "pago-externo": "green.200",
    arquivado: "gray.500",
  };

  const ticketStatusColorMap = {
    "aguardando-inicio": "yellow.500",
    trabalhando: "green.500",
    revisao: "red.500",
    concluido: "blue.500",
    arquivado: "gray.500",
  };

  const etapaMap = {};

  console.log("Tickets", ticketsPorEtapa);

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Text color="gray.400" fontSize="xs">
        Visão geral
      </Text>
      <Text color="gray.700" fontSize="lg">
        {format(new Date(), "MMMM yyyy", { locale: ptBR })}
      </Text>
      <Flex gap="8">
        <Box mt="6" w="80" bg="brand.500" p="6" rounded="2xl">
          <Flex>
            <Flex alignItems="center" gap="4">
              <Box bg="white" rounded="lg" p="1">
                <PiggyBank size={36} color="purple" />
              </Box>
              <Text color="gray.100" fontWeight="medium">
                Valor total <br /> dos serviços
              </Text>
            </Flex>
          </Flex>
          <Text color="white" mt="4" fontSize="3xl" fontWeight="bold">
            {currency.format(valorTotalTodosServicos ?? 0)}
          </Text>
          <Text color="gray.200" fontSize="sm" mt="2">
            {quantidadeTotalServicos ?? 0} serviços
          </Text>
        </Box>

        <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Pago Externo
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              {currency.format(
                (valoresPorStatus?.find((e) => e.status === "pago")?.total ??
                  0) +
                  (valoresPorStatus?.find((e) => e.status === "pago-externo")
                    ?.total ?? 0)
              )}
            </Text>
          </Box>
        </Box>

        <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Em processamento
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              {currency.format(
                valoresPorStatus?.find((e) => e.status === "processando")
                  ?.total ?? 0
              )}
            </Text>
          </Box>
        </Box>

        <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Aberto
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              {currency.format(
                valoresPorStatus?.find((e) => e.status === "aberto")?.total ?? 0
              )}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex gap="10" mt="8">
        <Box>
          <Box maxW="600px" bg="white" p="4" rounded="2xl">
            <Text fontWeight="semibold">Tickets por status</Text>
            <Table.Root mt="4">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    STATUS
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    QUANTIDADE
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {ticketsPorStatus?.map((item) => (
                  <Table.Row>
                    <Table.Cell
                      display="flex"
                      gap="2"
                      alignItems="center"
                      border="none"
                    >
                      <Box
                        h="3"
                        w="3"
                        rounded="full"
                        bg={ticketStatusColorMap[item.status]}
                      />
                      {item.status}
                    </Table.Cell>
                    <Table.Cell border="none">{item.count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        <Box>
          <Box maxW="600px" bg="white" p="4" rounded="2xl">
            <Text fontWeight="semibold">Tickets por etapa</Text>
            <Table.Root mt="4">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    ETAPA
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    QUANTIDADE
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {ticketsPorEtapa?.map((item) => (
                  <Table.Row>
                    <Table.Cell
                      display="flex"
                      gap="2"
                      alignItems="center"
                      border="none"
                    >
                      {item.etapa.replaceAll("-", " ")}
                    </Table.Cell>
                    <Table.Cell border="none">{item.count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        <Box>
          <Box maxW="600px" bg="white" p="4" rounded="2xl">
            <Text fontWeight="semibold">Serviços por status</Text>
            <Table.Root mt="4">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    STATUS
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    QUANTIDADE
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="light"
                    py="1"
                  >
                    VALOR TOTAL
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {valoresPorStatus?.map((item) => (
                  <Table.Row>
                    <Table.Cell
                      display="flex"
                      gap="2"
                      alignItems="center"
                      border="none"
                    >
                      <Box
                        h="3"
                        w="3"
                        rounded="full"
                        bg={servicoStatusColorMap[item.status]}
                      />
                      {item.status}
                    </Table.Cell>
                    <Table.Cell border="none">{item.count}</Table.Cell>
                    <Table.Cell truncate border="none">
                      <Text truncate>{currency.format(item?.total ?? 0)}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}; 
