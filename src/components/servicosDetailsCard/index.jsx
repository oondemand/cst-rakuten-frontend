import { Box, Text, Heading, Grid } from "@chakra-ui/react";
import { currency } from "../../utils/currency";

export const ServicosDetailsCard = ({ servicos }) => {
  return (
    <Box width="1400px" pt="2" color="gray.700">
      <Grid
        templateColumns="repeat(13, 1fr)"
        gap={2}
        fontSize="sm"
        fontWeight="medium"
      >
        <Text minWidth="100px">Competência</Text>
        <Text minWidth="90px">Principal</Text>
        <Text minWidth="70px">Bônus</Text>
        <Text minWidth="110px">Ajuste Com.</Text>
        <Text minWidth="110px">Paid Place.</Text>
        <Text minWidth="110px">Total Serviço</Text>

        <Text minWidth="90px">Rev Principal</Text>
        <Text minWidth="70px">Rev Bônus</Text>
        <Text minWidth="110px">Rev Comissão</Text>
        <Text minWidth="110px">Rev Paid Place.</Text>
        <Text minWidth="110px">Total Revisão</Text>

        <Text minWidth="90px">Imposto</Text>
        <Text minWidth="110px" fontWeight="600">
          Total
        </Text>
      </Grid>

      {servicos.map((item, index) => (
        <Grid
          key={index}
          templateColumns="repeat(13, 1fr)"
          gap={2}
          py="0.5"
          borderBottom={index < servicos.length - 1 ? "1px solid" : "none"}
          borderColor="gray.100"
          fontSize="sm"
        >
          <Text truncate minWidth="100px">
            {`${item?.competencia?.mes}/${item?.competencia?.ano}`}
          </Text>
          <Text truncate minWidth="90px">
            {currency.format(item?.valores?.grossValue ?? 0)}
          </Text>
          <Text truncate minWidth="70px">
            {currency.format(item?.valores?.bonus ?? 0)}
          </Text>
          <Text truncate minWidth="110px">
            {currency.format(item?.valores?.ajusteComercial ?? 0)}
          </Text>
          <Text truncate minWidth="110px">
            {currency.format(item?.valores?.paidPlacement ?? 0)}
          </Text>
          <Text
            truncate
            minWidth="110px"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            {currency.format(item?.valores?.totalServico ?? 0)}
          </Text>

          <Text truncate minWidth="90px">
            {currency.format(item?.valores?.revisionGrossValue ?? 0)}
          </Text>
          <Text truncate minWidth="70px">
            {currency.format(item?.valores?.revisionProvisionBonus ?? 0)}
          </Text>
          <Text truncate minWidth="110px">
            {currency.format(item?.valores?.revisionComissaoPlataforma ?? 0)}
          </Text>
          <Text truncate minWidth="110px">
            {currency.format(item?.valores?.revisionPaidPlacement ?? 0)}
          </Text>
          <Text
            truncate
            minWidth="110px"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            {currency.format(item?.valores?.totalRevisao ?? 0)}
          </Text>

          {/* Totalização */}
          <Text truncate minWidth="90px">
            {currency.format(item?.valores?.imposto ?? 0)}
          </Text>
          <Text truncate minWidth="110px" fontWeight="600">
            {currency.format(item?.valor ?? 0)}
          </Text>
        </Grid>
      ))}
    </Box>
  );
};
