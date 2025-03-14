import { Flex, Button, useDialogContext } from "@chakra-ui/react";

export const TicketActions = () => {
  const { setOpen } = useDialogContext();

  return (
    <Flex alignItems="center" w="full" justifyContent="space-between">
      <Flex gap="2">
        <Button variant="surface" shadow="xs" colorPalette="green" size="xs">
          Aprovar
        </Button>
        <Button colorPalette="red" variant="surface" shadow="xs" size="xs">
          Reprovar
        </Button>
        <Button variant="surface" shadow="xs" size="xs">
          Arquivar
        </Button>
      </Flex>
      <Button
        onClick={() => setOpen(false)}
        variant="surface"
        shadow="xs"
        size="xs"
      >
        Fechar
      </Button>
    </Flex>
  );
};
