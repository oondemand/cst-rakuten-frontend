import { Flex, Text, Popover, Portal } from "@chakra-ui/react";

import { Eye } from "lucide-react";
import { DocumentosFiscaisDetailsCard } from "../../documentosFiscaisDetailsCard";

export const DocumentosFiscaisDetailsCell = (props) => {
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
            {props.row.original?.documentosFiscais?.length}
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
              <Popover.Title fontWeight="medium">
                Documentos Fiscais
              </Popover.Title>
              <DocumentosFiscaisDetailsCard
                documentosFiscais={props.row.original?.documentosFiscais}
              />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
