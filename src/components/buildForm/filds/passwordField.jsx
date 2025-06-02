import { Input, Box, Text } from "@chakra-ui/react";
export const PasswordField = ({ inputStyle, ...props }) => {
  return (
    <Box>
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <Input
        {...props.field}
        disabled={props?.disabled}
        size="sm"
        fontSize="sm"
        variant="flushed"
        type="password"
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
