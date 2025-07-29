import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { BuildForm } from "../../../../../components/buildForm";
import { VisibilityControlDialog } from "../../../../../components/vibilityControlDialog";
import { createDynamicFormFields } from "./formFields";
import { useMemo } from "react";
import { useVisibleInputForm } from "../../../../../hooks/useVisibleInputForms";
import { formatDateToDDMMYYYY } from "../../../../../utils/formatting";

export const ContaPagarForm = ({ contaPagar, onlyReading }) => {
  const fields = useMemo(() => createDynamicFormFields(), []);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "INTEGRACAO_CONTA_PAGAR_FORM",
  });

  return (
    <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Text color="gray.600" fontSize="sm">
          Conta Pagar
        </Text>
      </GridItem>
      <GridItem colSpan={3} mt="6">
        <Flex alignItems="center" gap="4" mb="6">
          <Box w="full" h="1" borderBottom="2px solid" borderColor="gray.100" />
          <VisibilityControlDialog
            fields={fields}
            setVisibilityState={setInputsVisibility}
            visibilityState={inputsVisibility}
            title="Ocultar inputs"
          />
        </Flex>
        <BuildForm
          disabled={onlyReading}
          fields={fields}
          data={contaPagar}
          visibleState={inputsVisibility}
          onSubmit={() => {}}
          gridColumns={2}
          gap={4}
        />
      </GridItem>
    </Grid>
  );
};
