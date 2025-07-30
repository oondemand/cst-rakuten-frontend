import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { BuildForm } from "../../../../../components/buildForm";
import { VisibilityControlDialog } from "../../../../../components/vibilityControlDialog";
import { createDynamicFormFields } from "./formFields";
import { useMemo } from "react";
import { useVisibleInputForm } from "../../../../../hooks/useVisibleInputForms";
import { formatDateToDDMMYYYY } from "../../../../../utils/formatting";
import { Download, Paperclip } from "lucide-react";
import { TicketService } from "../../../../../service/ticket";

export const ContaPagarForm = ({ contaPagar, onlyReading }) => {
  const fields = useMemo(() => createDynamicFormFields(), []);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "INTEGRACAO_CONTA_PAGAR_FORM",
  });

  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await TicketService.getFile({ id });

      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const FileTypeMap = {
    generico: "",
    rpa: "RPA",
  };

  return (
    <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Text color="gray.600" fontSize="sm">
          Arquivos
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
        <Flex justifyContent="space-between" mt="8">
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="normal"
            display="flex"
            gap="1.5"
            alignItems="center"
          >
            <Paperclip color="purple" size={12} />{" "}
            {FileTypeMap[contaPagar?.arquivo?.tipo]}{" "}
            {contaPagar?.arquivo?.nomeOriginal}
            {"  "}
            {(contaPagar?.arquivo?.size / 1024).toFixed(1)} KB
          </Text>
          <Flex gap="2">
            <Button
              onClick={async () =>
                await handleDownloadFile({ id: contaPagar?.arquivo?._id })
              }
              cursor="pointer"
              unstyled
            >
              <Download size={16} />
            </Button>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};
