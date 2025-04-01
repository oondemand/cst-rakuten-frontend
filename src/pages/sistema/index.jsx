import { Flex, Tabs } from "@chakra-ui/react";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { RegistrosTab } from "./tab/registros";

export function SistemaPage() {
  const [tab, setTab] = useStateWithStorage("SISTEMA-TAB", "listas");

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
              // bg="blue.500"
              value="listas"
            >
              Listas
            </Tabs.Trigger>
            <Tabs.Trigger
              fontSize="xs"
              h="6"
              rounded="lg"
              color="gray.500"
              // bg="blue.500"
              value="registros"
            >
              Registros
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="listas" p="0">
            Listas
          </Tabs.Content>
          <Tabs.Content value="registros" p="0">
            <RegistrosTab />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
