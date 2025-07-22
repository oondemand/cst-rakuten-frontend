import { Box, Flex } from "@chakra-ui/react";
import { ArrowUpDown, SprayCan } from "lucide-react";

export const SyncOmieStatusCell = (props) => {
  const OMIE_SYNC_STATUS_MAP = {
    sucesso: "green.400",
    processando: "yellow.400",
    erro: "red.400",
  };

  return (
    <Flex
      h="14px"
      w="14px"
      bg={OMIE_SYNC_STATUS_MAP[props.row.original?.status_sincronizacao_omie]}
      rounded="full"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      {/* <ArrowUpDown size={10} /> */}
    </Flex>
  );
};
