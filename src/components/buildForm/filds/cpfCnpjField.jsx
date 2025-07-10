import { Input, Box, Text } from "@chakra-ui/react";
import { useHookFormMask } from "use-mask-input";

export const CpfCnpjField = ({ ...props }) => {
  const { watch } = props.methods;
  const tipo = watch("tipo");

  const registerWithMask = useHookFormMask(props.methods.register);

  const rowMaskMap = {
    pf: "999.999.999-99",
    pj: "99.999.999/9999-99",
    ext: null,
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event?.preventDefault();
      props?.setValue(props?.accessorKey, props.initialValue);
    }
  };

  return (
    <Box>
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <Input
        onKeyDown={handleKeyDown}
        fontSize="sm"
        size="sm"
        variant="flushed"
        disabled={props.disabled}
        {...registerWithMask(props.accessorKey, rowMaskMap[tipo] ?? null)}
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
