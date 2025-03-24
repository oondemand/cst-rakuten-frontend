import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


export const Dashboard = () => {
  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Text color="gray.400" fontSize="xs">
        Visão geral
      </Text>
      <Heading color="gray.700" fontSize="lg">
        {format(new Date(), "MMMM yyyy", { locale: ptBR })}
      </Heading>
      <Heading color="brand.500" fontSize="3xl" mt="8">
        Bem vindo a central de serviços :)
      </Heading>
    </Flex>
  );
};
