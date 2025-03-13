import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { currency } from "../../utils/currency";

export const ServicesCard = ({ servicos = [] }) => {
  const formattedServices = useMemo(() => {
    return servicos.map((item) => ({
      ...item,
      valorFormatado: currency.format(item.valor),
    }));
  }, [servicos]);

  return (
    <Flex flexDir="column">
      <Heading
        w="full"
        borderBottom="1px solid"
        borderColor="gray.200"
        fontSize="xs"
      >
        Serviços
      </Heading>
      <Box py="1.5" px="1">
        <Flex gap="2">
          <Text>Compet.</Text>
          <Text>Total</Text>
        </Flex>
        {formattedServices.map((item) => (
          <Flex key={item._id} py="0.1" gap="2" color="gray.400">
            <Text>
              {item?.competencia?.mes}/{item?.competencia?.ano}
            </Text>
            <Text fontWeight={400}>RS {currency.format(item.valor)}</Text>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

// export const ServicesCard = memo(_ServicesCard);
