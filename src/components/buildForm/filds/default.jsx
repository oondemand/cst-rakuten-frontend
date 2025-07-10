import { Input, Box, Text } from "@chakra-ui/react";
export const DefaultField = ({ inputStyle, ...props }) => {
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
        {...props.field}
        disabled={props?.disabled}
        size="sm"
        fontSize="sm"
        variant="flushed"
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
