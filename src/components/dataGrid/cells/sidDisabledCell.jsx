import { Box, Tag, Flex } from "@chakra-ui/react";

export const SidDisabledCell = ({ getValue, ...rest }) => {
  const initialValue = getValue();

  return (
    <Flex h="full" gap="1" overflow="hidden" flexWrap="wrap">
      {initialValue &&
        Array.isArray(initialValue) &&
        initialValue?.map((item) => {
          return (
            <Tag.Root py="1">
              <Tag.Label fontWeight="semibold">{item}</Tag.Label>
            </Tag.Root>
          );
        })}
    </Flex>
  );
};
