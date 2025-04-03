import { Box, IconButton, Text } from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArrowUpDown } from "lucide-react";

import { Tooltip } from "../ui/tooltip";

export const IntegracaoRpaDialog = () => {
  return (
    <Box>
      <DialogRoot placement="center">
        <Tooltip
          content="Integração RPA"
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
          <DialogTrigger asChild>
            <Text
              p="1"
              rounded="full"
              _hover={{ bg: "gray.200" }}
              color="brand.500"
              cursor="pointer"
            >
              <ArrowUpDown size={20} />
            </Text>
          </DialogTrigger>
        </Tooltip>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Integração Rpa</DialogTitle>
          </DialogHeader>
          <DialogBody overflowY="auto" scrollbarWidth="thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum minus
            tempora nesciunt placeat veniam deserunt numquam atque rerum, quasi
            consequatur eligendi doloremque ad eaque sequi cupiditate maiores
            temporibus. Laboriosam, modi?
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
