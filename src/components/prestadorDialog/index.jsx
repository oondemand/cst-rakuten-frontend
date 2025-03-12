import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { BuildForm } from "../buildForm/index";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { useMemo } from "react";
import { createDynamicFormFields } from "../../pages/prestadores/formFields";

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

export const PrestadorDialog = ({
  title,
  data,
  updateFn,
  createFn,
  visible,
  seOpen,
}) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "PRESTADORES",
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
    <Box>
      <DialogRoot
        open={visible}
        onOpenChange={seOpen}
        size="cover"
        placement="center"
      >
        <DialogContent w="50%" h="80%" pt="6" px="2" rounded="lg">
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogBody overflowY="auto" scrollbarWidth="thin">
            <Flex alignItems="center" gap="8" mb="8">
              <Box
                w="full"
                h="1"
                borderBottom="2px solid"
                borderColor="gray.100"
              />
              <VisibilityControlDialog
                fields={fields}
                setVisibilityState={setInputsVisibility}
                visibilityState={inputsVisibility}
                title="Ocultar inputs"
              />
            </Flex>
            <BuildForm
              flexStyles={{
                justifyContent: "center",
              }}
              fields={fields}
              visibleState={inputsVisibility}
              data={data}
              onBlurFn={data ? updateFn : createFn}
            />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
