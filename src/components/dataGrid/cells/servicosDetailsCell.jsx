import { Flex, Text, Popover, Portal } from "@chakra-ui/react";

import { ServicosDetailsCard } from "../../servicosDetailsCard";

export const ServicosDetailsCell = (props) => {
  return (
    <Popover.Root positioning={{ placement: "top" }}>
      <Popover.Trigger w="full" h="full">
        <Flex cursor="pointer" justifyContent="center">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.row.original?.servicos?.length}
          </Text>
        </Flex>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto">
            <Popover.Arrow />
            <Popover.Body
              maxW="1440px"
              overflow="auto"
              className="custom-scrollbar"
            >
              <Popover.Title>Servicos</Popover.Title>
              <ServicosDetailsCard servicos={props.row.original?.servicos} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
