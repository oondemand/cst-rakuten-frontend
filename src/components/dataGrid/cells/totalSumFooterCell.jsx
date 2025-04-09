import { Flex, Text } from "@chakra-ui/react";
import { currency } from "../../../utils/currency";
import { Tooltip } from "../../../components/ui/tooltip";

export const TotalSumFooterCell = ({ sum }) => {
  return (
    <Flex minH="8">
      <Tooltip
        content="Valor referente ao total da coluna"
        positioning={{ placement: "top" }}
        openDelay={500}
        closeDelay={50}
        contentProps={{
          css: {
            "--tooltip-bg": "white",
            color: "gray.600",
          },
        }}
      >
        <Text alignSelf="center" fontSize="sm" truncate>
          {currency.format(sum)}
        </Text>
      </Tooltip>
    </Flex>
  );
};
