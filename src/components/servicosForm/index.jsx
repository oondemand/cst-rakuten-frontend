import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { BuildForm } from "../buildForm/index";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { useMemo } from "react";
import { createDynamicFormFields } from "../../pages/servicos/formFields";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useListas } from "../../hooks/useListas";
import { VisibilityControlDialog } from "../vibilityControlDialog";

export const ServicoForm = ({ data, onBlurFn }) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "SERVICOS",
  });

  const fields = useMemo(() => createDynamicFormFields(), []);

  return (
    <Box>
      <Flex alignItems="center" gap="8" mb="8">
        <Box w="full" h="1" borderBottom="2px solid" borderColor="gray.100" />
        <VisibilityControlDialog
          fields={fields}
          setVisibilityState={setInputsVisibility}
          visibilityState={inputsVisibility}
          title="Ocultar inputs"
        />
      </Flex>
      <BuildForm
        fields={fields}
        visibleState={inputsVisibility}
        data={data}
        onBlurFn={onBlurFn}
      />
    </Box>
  );
};
