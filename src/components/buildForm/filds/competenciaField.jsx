import { Input, Box, Text } from "@chakra-ui/react";
import { useHookFormMask } from "use-mask-input";

export const CompetenciaField = ({ ...props }) => {
  const registerWithMask = useHookFormMask(props.methods.register);

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
        size="sm"
        fontSize="sm"
        variant="flushed"
        disabled={props.disabled}
        {...registerWithMask(props.accessorKey, "99/9999")}
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
