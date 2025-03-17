import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { currency } from "../../../utils/currency";

export const ServicoTooltipCard = ({ servico }) => {
  console.log("Servico", servico);

  return (
    <Box
      bg="white"
      p="4"
      rounded="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.300"
    >
      <Grid
        gapY="2"
        gapX="4"
        justifySelf="right"
        templateColumns="repeat(6, 1fr)"
        alignItems="center"
      >
        <GridItem />
        <GridItem>
          <Text truncate fontSize="sm" color="gray.500">
            Gross Value
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="sm" color="gray.500">
            Bonus
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="sm" color="gray.500">
            Correção
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="sm" color="gray.500">
            Paid placement
          </Text>
        </GridItem>
        <GridItem />

        <GridItem>
          <Text truncate fontSize="xs" pl="0.5">
            Valor principal
          </Text>
        </GridItem>

        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.grossValue)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.bonus)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.ajusteComercial)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.paidPlacement)}
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="xs">
            {currency.format(servico?.valores?.totalServico)}
          </Text>
        </GridItem>

        <GridItem>
          <Text truncate fontSize="xs" pl="0.5">
            Valor Revisão
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.revisionGrossValue)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.revisionProvisionBonus)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.revisionComissaoPlataforma)}
          </Text>
        </GridItem>
        <GridItem>
          <Text
            truncate
            fontSize="xs"
            pl="0.5"
            fontWeight="normal"
            color="gray.400"
          >
            {currency.format(servico?.valores?.revisionPaidPlacement)}
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="xs">
            {currency.format(servico?.valores?.totalRevisao)}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
