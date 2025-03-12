import { Flex, Heading, Text } from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Settings2 } from "lucide-react";
import { Switch } from "../../components/ui/switch";

export const VisibilityControlDialog = ({
  title,
  fields,
  visibilityState,
  setVisibilityState,
}) => {
  return (
    <DialogRoot size="xs" placement="center">
      <DialogTrigger>
        <Flex w="full" p="1" cursor="pointer" color="gray.400">
          <Settings2 size={16} />
        </Flex>
      </DialogTrigger>
      <DialogContent rounded="lg">
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle size="sm">{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {fields.map((item) => (
            <Flex key={item.accessorKey} gap="2" mt="1">
              <Switch
                size="sm"
                defaultChecked
                colorPalette="teal"
                onCheckedChange={(e) => {
                  setVisibilityState((prev) => ({
                    ...prev,
                    [item.accessorKey]: e.checked,
                  }));
                }}
                checked={visibilityState[item.accessorKey]}
              />
              <Text size="sm" fontWeight="semibold">
                {item.label}
              </Text>
            </Flex>
          ))}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
