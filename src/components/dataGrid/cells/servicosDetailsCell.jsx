import { Flex, Text, Popover, Portal } from "@chakra-ui/react";

import { ServicosDetailsCard } from "../../servicosDetailsCard";
import { Eye } from "lucide-react";

export const ServicosDetailsCell = (props) => {
  return (
    <Popover.Root positioning={{ placement: "top" }}>
      <Popover.Trigger w="full" h="full">
        <Flex
          gap="1"
          alignItems="center"
          cursor="pointer"
          color="gray.500"
          justifyContent="center"
        >
          <Text color="gray.700" alignSelf="center" fontSize="sm" truncate>
            {props.row.original?.servicos?.length}
          </Text>
          <Eye size={18} />
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
