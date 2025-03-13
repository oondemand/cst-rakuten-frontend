import { Input, Box, Text } from "@chakra-ui/react";
export const DefaultField = ({ inputStyle, ...props }) => {
  return (
    <Box>
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <Input {...props.field} fontSize="md" variant="flushed" />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
