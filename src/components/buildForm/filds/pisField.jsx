import { Input, Box, Text } from "@chakra-ui/react";
import { useHookFormMask } from "use-mask-input";

export const PisPasepField = ({ ...props }) => {
  const registerWithMask = useHookFormMask(props.methods.register);

  return (
    <Box>
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <Input
        fontSize="sm"
        size="sm"
        variant="flushed"
        disabled={props?.disabled}
        {...registerWithMask(props.accessorKey, "999.99999.99-9")}
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
