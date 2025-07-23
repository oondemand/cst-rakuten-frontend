import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { BuildForm } from "../../../../components/buildForm";
import { VisibilityControlDialog } from "../../../../components/vibilityControlDialog";
import { createDynamicFormFields } from "../../../prestadores/formFields";
import { useMemo } from "react";
import { useVisibleInputForm } from "../../../../hooks/useVisibleInputForms";
import { formatDateToDDMMYYYY } from "../../../../utils/formatting";

export const PrestadorForm = ({ prestador, onlyReading }) => {
  const fields = useMemo(() => createDynamicFormFields(), []);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "INTEGRACAO_PRESTADORES_TICKET_MODAL_FORM",
  });

  return (
    <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Prestador
          </Text>
        </Box>
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
          data={{
            ...prestador,
            pessoaFisica: {
              ...prestador?.pessoaFisica,
              dataNascimento: formatDateToDDMMYYYY(
                prestador?.pessoaFisica?.dataNascimento
              ),
            },
          }}
          visibleState={inputsVisibility}
          onSubmit={() => {}}
          gridColumns={2}
          gap={4}
        />
      </GridItem>
    </Grid>
  );
};
