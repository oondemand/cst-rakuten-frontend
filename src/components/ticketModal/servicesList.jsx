import { currency } from "../../utils/currency";

import { Box, Text, Heading, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export const ServicesList = ({ servicos }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Serviços
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={3} mt="6">
        <Box
          mt="2"
          w="full"
          h="1"
          borderBottom="2px solid"
          borderColor="gray.100"
        />
        <Box>
          <Grid
            mt="6"
            templateColumns="repeat(3, 1fr)"
            gap={2}
            pb="1"
            fontSize="xs"
          >
            <Text truncate minWidth="60px">
              Competência
            </Text>
            <Text truncate minWidth="110px">
              Descrição
            </Text>
            <Text truncate minWidth="50px">
              Valor total
            </Text>
          </Grid>
          {servicos?.map((item, index) => (
            <Grid
              key={index}
              templateColumns="repeat(3, 1fr)"
              gap={2}
              borderColor="gray.100"
              fontSize="xs"
              fontWeight="medium"
              color="gray.400"
            >
              <Text truncate minWidth="60px">
                {item?.competencia}
              </Text>

              <Text truncate minWidth="110px">
                {item?.descricao}
              </Text>
              <Text color="gray.700" fontWeight="bold" truncate minWidth="50px">
                {currency.format(item?.valor)}
              </Text>
            </Grid>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};
