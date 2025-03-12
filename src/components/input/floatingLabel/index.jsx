import { Box, Field, Input, defineStyle, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

export const FloatingLabelInput = forwardRef(
  ({ label, error, display, w, ...rest }, ref) => {
    return (
      <Box w={w}>
        <Field.Root display={display}>
          <Box pos="relative">
            <Input
              {...rest}
              ref={ref}
              className="peer"
              px="1"
              variant="flushed"
              placeholder=""
              focusRingColor="brand.500"
            />
            <Field.Label css={floatingStyles}>{label}</Field.Label>
            {error && (
              <Text fontSize="xs" color="red.500" m="0.5">
                {error}
              </Text>
            )}
          </Box>
        </Field.Root>
      </Box>
    );
  }
);

const floatingStyles = defineStyle({
  pos: "absolute",
  px: "0.5",
  top: "-3",
  insetStart: "0",
  w: "full",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "gray.600",
  fontSize: "12px",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "1",
  },
  _peerFocusVisible: {
    color: "gray.600",
    top: "-3",
    insetStart: "0",
  },
});
