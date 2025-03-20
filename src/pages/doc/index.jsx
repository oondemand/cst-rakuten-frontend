import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { Clipboard, IconButton, Input, InputGroup } from "@chakra-ui/react";

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="xs" me="-2">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  );
};

export const Doc = () => {
  return (
    <Box
      flex="1"
      pt="8"
      px="6"
      pb="2"
      itens="center"
      overflow="auto"
      scrollbarWidth="thin"
    >
      <Heading>Integração com omie</Heading>
      <Text my="2">
        Para integrar a esteira de serviços ao Omie, é essencial configurar os
        seguintes webhooks:
      </Text>
      <Clipboard.Root
        mt="8"
        maxW="600px"
        value="https://sua-api-url.com/webhooks/prestador"
      >
        <Clipboard.Label color="gray.700" textStyle="label">
          Sincronização de prestadores
        </Clipboard.Label>
        <InputGroup endElement={<ClipboardIconButton />}>
          <Clipboard.Input asChild>
            <Input />
          </Clipboard.Input>
        </InputGroup>
      </Clipboard.Root>
      <img
        style={{ scale: "0.8", marginLeft: "-70px" }}
        src="/integracao-omie-1.png"
      />

      <Clipboard.Root
        mt="8"
        maxW="600px"
        value="https://sua-api-url.com/webhooks/conta-pagar"
      >
        <Clipboard.Label color="gray.700" textStyle="label">
          Sincronização de contas a pagar
        </Clipboard.Label>
        <InputGroup endElement={<ClipboardIconButton />}>
          <Clipboard.Input asChild>
            <Input />
          </Clipboard.Input>
        </InputGroup>
      </Clipboard.Root>
      <img
        style={{ scale: "0.8", marginLeft: "-70px" }}
        src="/integracao-omie-2.png"
      />
      <Text>Agora, tudo pronto 💜</Text>
    </Box>
  );
};
