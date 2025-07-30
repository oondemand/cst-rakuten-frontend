import { Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { InvertedChart } from "../../../../components/svg/invertedChart";
import { Tooltip } from "../../../../components/ui/tooltip";

export const EtapaActions = ({ etapa }) => {
  if (etapa.codigo === "upload_arquivos") {
    return (
      <Tooltip
        content="Esteira Anexos -> omie"
        positioning={{ placement: "top" }}
        openDelay={700}
        closeDelay={50}
        contentProps={{
          css: {
            "--tooltip-bg": "white",
            color: "gray.600",
          },
        }}
      >
        <Link to="/integracao/anexos/central-omie" viewTransition>
          <Text
            p="1"
            rounded="full"
            _hover={{ bg: "gray.200" }}
            color="brand.500"
            cursor="pointer"
          >
            <InvertedChart />
          </Text>
        </Link>
      </Tooltip>
    );
  }
};
