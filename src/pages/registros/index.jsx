import { Flex, Tabs } from "@chakra-ui/react";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { RastreabilidadeTab } from "./tab/rastreabilidade";
import { ArquivadosTab } from "./tab/arquivados";

export function RegistrosPage() {
  const [tab, setTab] = useStateWithStorage("REGISTROS-TAB", "rastreabilidade");

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA" overflow="auto">
      <Flex>
        <Tabs.Root
          value={tab}
          onValueChange={(e) => setTab(e.value)}
          variant="subtle"
        >
          <Tabs.List gap="4">
            <Tabs.Trigger
              fontSize="xs"
              h="6"
              rounded="lg"
              color="gray.500"
              value="arquivados"
            >
              Arquivados
            </Tabs.Trigger>
            <Tabs.Trigger
              fontSize="xs"
              h="6"
              rounded="lg"
              color="gray.500"
              value="rastreabilidade"
            >
              Rastreabilidade
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="arquivados" p="0">
            <ArquivadosTab />
          </Tabs.Content>
          <Tabs.Content value="rastreabilidade" p="0">
            <RastreabilidadeTab />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
