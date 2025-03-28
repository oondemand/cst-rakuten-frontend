import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
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
    queryKey: ["dashboard"],
    staleTime: 1000 * 60, //1m
    placeholderData: keepPreviousData,
  });

  const valorTotalTodosServicos = valoresPorStatus?.reduce((cur, acc) => {
    cur = cur + acc.total;
    return cur;
  }, 0);

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
        </Box>

        {/* <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Total pago
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              R$ 10.000.000
            </Text>
          </Box>
        </Box>

        <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Total pago
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              R$ 10.000.000
            </Text>
          </Box>
        </Box>

        <Box mt="6" w="72" bg="white" p="6" rounded="2xl">
          <Box display="inline-block" bg="brand.500" rounded="2xl" p="2.5">
            <FileCheck2 size={24} color="white" />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Total pago
            </Text>
            <Text color="gray.700" mt="1" fontWeight="bold">
              R$ 10.000.000
            </Text>
          </Box>
        </Box> */}
      </Flex>
    </Flex>
  );
};
