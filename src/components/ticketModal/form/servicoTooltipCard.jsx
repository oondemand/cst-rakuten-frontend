import { Box, Text, Grid, GridItem, Flex } from "@chakra-ui/react";
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
            {currency.format(servico?.valores?.grossValue ?? 0)}
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
            {currency.format(servico?.valores?.bonus ?? 0)}
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
            {currency.format(servico?.valores?.ajusteComercial ?? 0)}
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
            {currency.format(servico?.valores?.paidPlacement ?? 0)}
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="xs">
            {currency.format(servico?.valores?.totalServico ?? 0)}
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
            {currency.format(servico?.valores?.revisionGrossValue ?? 0)}
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
            {currency.format(servico?.valores?.revisionProvisionBonus ?? 0)}
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
            {currency.format(servico?.valores?.revisionComissaoPlataforma ?? 0)}
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
            {currency.format(servico?.valores?.revisionPaidPlacement ?? 0)}
          </Text>
        </GridItem>
        <GridItem>
          <Text truncate fontSize="xs">
            {currency.format(servico?.valores?.totalRevisao ?? 0)}
          </Text>
        </GridItem>

        <GridItem mt="4" colSpan={4} />
        <GridItem mt="4">
          <Text truncate fontSize="xs">
            Imposto
          </Text>
        </GridItem>
        <GridItem mt="4">
          <Text>{currency.format(servico?.valores?.imposto ?? 0)}</Text>
        </GridItem>

        <GridItem colSpan={4} />
        <GridItem>
          <Text truncate fontSize="xs">
            Total
          </Text>
        </GridItem>
        <GridItem>
          <Text>{currency.format(servico?.valor ?? 0)}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
