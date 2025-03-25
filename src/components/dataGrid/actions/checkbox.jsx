import { Box, Checkbox, Flex } from "@chakra-ui/react";

export const CheckAction = ({ ...rest }) => {
  console.log("PROPS", rest);

  return (
    <Flex w="full" placeContent="center">
      <Checkbox.Root
        variant="subtle"
        checked={rest.row.original.status === "aberto"}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        {/* <Checkbox.Label /> */}
      </Checkbox.Root>
    </Flex>
  );
};
