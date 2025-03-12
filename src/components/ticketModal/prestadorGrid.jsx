import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

import { PrestadorForm } from "./form/prestador";

export const PrestadorGrid = ({ prestador = null }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Dados do Prestador
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={3} mt="6">
        <PrestadorForm prestador={prestador} />
      </GridItem>
    </Grid>
  );
};
