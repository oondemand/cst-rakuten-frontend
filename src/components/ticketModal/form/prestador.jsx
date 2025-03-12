import { Box, Flex } from "@chakra-ui/react";

import { BuildForm } from "../../buildForm/index";
import { useVisibleInputForm } from "../../../hooks/useVisibleInputForms";
import { useEffect, useMemo } from "react";
import { createDynamicFormFields } from "../../../pages/prestadores/formFields";

import { useListas } from "../../../hooks/useListas";
import { VisibilityControlDialog } from "../../vibilityControlDialog";

export const PrestadorForm = ({ prestador, onBlurFn }) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "PRESTADORES_TICKET_MODAL_FORM",
  });

  const { bancos, estados, prestadorTipoConta, prestadorTipos } = useListas();

  const fields = useMemo(
    () =>
      createDynamicFormFields({
        bancos,
        estados,
        prestadorTipos,
        prestadorTipoConta,
      }),
    [bancos, estados, prestadorTipoConta, prestadorTipos]
  );

  return (
    <>
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
        fieldsWidth="245px"
        flexStyles={{ display: "flex" }}
        fields={fields}
        data={prestador}
        visibleState={inputsVisibility}
        onBlurFn={onBlurFn}
      />
    </>
  );
};
