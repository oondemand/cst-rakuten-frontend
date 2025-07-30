import { Box, Flex, Table, Text } from "@chakra-ui/react";
import { InvertedChart } from "../../components/svg/invertedChart";
import { Tooltip } from "../../components/ui/tooltip";
import { Link } from "react-router-dom";

export const IntegracaoCard = ({ integracao, title, link }) => {
  const integracaoEtapaColorMap = {
    processando: "yellow.400",
    falhas: "red.400",
    requisicao: "gray.300",
    sucesso: "green.500",
    reprocessar: "gray.300",
  };

  return (
    <Box maxW="600px" bg="white" p="4" rounded="2xl">
      <Flex gap="2">
        <Text fontWeight="semibold">{title}</Text>
        <Tooltip
          content={title}
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
          <Link to={link} viewTransition>
            <Text
              p="1.5"
              rounded="full"
              _hover={{ bg: "gray.100" }}
              color="brand.500"
              cursor="pointer"
            >
              <InvertedChart />
            </Text>
          </Link>
        </Tooltip>
      </Flex>
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
          {integracao?.map((item) => (
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
                  bg={integracaoEtapaColorMap[item.etapa] ?? "gray.200"}
                />
                {item.etapa}
              </Table.Cell>
              <Table.Cell border="none">{item.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
