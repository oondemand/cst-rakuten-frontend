import { Box, Text, Heading, Grid } from "@chakra-ui/react";
import { currency } from "../../../../utils/currency";

export const ServicosCard = ({ servicos }) => {
  return (
    <Box width="1400px" p="4" color="gray.700">
      <Heading
        size="sm"
        w="full"
        pb="3"
        mb="2"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        Serviços
      </Heading>

      {/* Cabeçalho completo */}
      <Grid
        templateColumns="repeat(13, 1fr)"
        gap={2}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        {/* Serviço Original */}
        <Text fontSize="sm" minWidth="100px">
          Competência
        </Text>
        <Text fontSize="sm" minWidth="90px">
          Principal
        </Text>
        <Text fontSize="sm" minWidth="70px">
          Bônus
        </Text>
        <Text fontSize="sm" minWidth="110px">
          Ajuste Com.
        </Text>
        <Text fontSize="sm" minWidth="110px">
          Paid Place.
        </Text>
        <Text
          fontSize="sm"
          minWidth="110px"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          Total Serviço
        </Text>

        {/* Revisão */}
        <Text fontSize="sm" minWidth="90px">
          Rev Principal
        </Text>
        <Text fontSize="sm" minWidth="70px">
          Rev Bônus
        </Text>
        <Text fontSize="sm" minWidth="110px">
          Rev Comissão
        </Text>
        <Text fontSize="sm" minWidth="110px">
          Rev Paid Place.
        </Text>
        <Text
          fontSize="sm"
          minWidth="110px"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          Total Revisão
        </Text>

        {/* Totalização */}
        <Text fontSize="sm" minWidth="90px">
          Imposto
        </Text>
        <Text fontSize="sm" minWidth="110px" fontWeight="600">
          Total
        </Text>
      </Grid>

      {/* Linhas de dados */}
      {servicos.map((item, index) => (
        <Grid
          key={index}
          templateColumns="repeat(13, 1fr)"
          gap={2}
          py="0.5"
          borderBottom={index < servicos.length - 1 ? "1px solid" : "none"}
          borderColor="gray.100"
        >
          {/* Serviço Original */}
          <Text fontSize="sm" minWidth="100px">
            {`${item?.competencia?.mes}/${item?.competencia?.ano}`}
          </Text>
          <Text fontSize="sm" minWidth="90px">
            {currency.format(item?.valores?.grossValue ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="70px">
            {currency.format(item?.valores?.bonus ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="110px">
            {currency.format(item?.valores?.ajusteComercial ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="110px">
            {currency.format(item?.valores?.paidPlacement ?? 0)}
          </Text>
          <Text
            fontSize="sm"
            minWidth="110px"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            {currency.format(item?.valores?.totalServico ?? 0)}
          </Text>

          {/* Revisão */}
          <Text fontSize="sm" minWidth="90px">
            {currency.format(item?.valores?.revisionGrossValue ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="70px">
            {currency.format(item?.valores?.revisionProvisionBonus ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="110px">
            {currency.format(item?.valores?.revisionComissaoPlataforma ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="110px">
            {currency.format(item?.valores?.revisionPaidPlacement ?? 0)}
          </Text>
          <Text
            fontSize="sm"
            minWidth="110px"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            {currency.format(item?.valores?.totalRevisao ?? 0)}
          </Text>

          {/* Totalização */}
          <Text fontSize="sm" minWidth="90px">
            {currency.format(item?.valores?.imposto ?? 0)}
          </Text>
          <Text fontSize="sm" minWidth="110px" fontWeight="600">
            {currency.format(item?.valor ?? 0)}
          </Text>
        </Grid>
      ))}
    </Box>
  );
};
