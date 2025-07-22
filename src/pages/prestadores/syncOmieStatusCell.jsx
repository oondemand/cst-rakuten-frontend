import { Box } from "@chakra-ui/react";

export const SyncOmieStatusCell = (props) => {
  const OMIE_SYNC_STATUS_MAP = {
    sucesso: "green.500",
    processando: "yellow.500",
    erro: "red.500",
  };

  return (
    <Box
      h="14px"
      w="14px"
      bg={OMIE_SYNC_STATUS_MAP[props.row.original?.status_sincronizacao_omie]}
      rounded="full"
    />
  );
};
