import { Box, Flex, Heading, Tabs, Text } from "@chakra-ui/react";
import { Target } from "lucide-react";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { SelecaoManualTab } from "./tabs/selecaoManual";

export function PlanejamentoMensal() {
  const [tab, setTab] = useStateWithStorage(
    "PLANEJAMENTO_MENSAL_TAB",
    "selecao-manual"
  );

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA" overflow="auto">
      <Flex gap="8">
        <Box w="80" bg="brand.500" color="white" p="7" rounded="2xl">
          <Heading size="3xl" mb="4" fontWeight="bold">
            Planejamento Mensal
          </Heading>

          <Text fontSize="sm">
            Agora você pode organizar e atualizar seu planejamento mensal sempre
            que precisar, de forma simples e prática!
          </Text>
        </Box>

        <Flex flexDir="column" gap="5">
          <Flex
            minW="460px"
            rounded="2xl"
            alignItems="flex-start"
            background="white"
            h="96px"
            px="6"
            py="4"
            gap="4"
          >
            <Target size={38} color="#8529CD" />

            <Box>
              <Text fontSize="lg" color="gray.500">
                Valor provisionado
              </Text>
              <Text fontWeight="semibold" fontSize="3xl" color="brand.500">
                R$ 7.000.000
              </Text>
            </Box>
          </Flex>

          <Flex
            minW="460px"
            rounded="2xl"
            alignItems="flex-start"
            background="white"
            h="96px"
            px="6"
            py="4"
            gap="6"
          >
            <Box>
              <Text fontSize="sm" color="gray.500">
                Quantidade de Serviços
              </Text>
              <Text fontWeight="semibold" fontSize="3xl" color="brand.500">
                95
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Quantidade de Prestadores
              </Text>
              <Text fontWeight="semibold" fontSize="3xl" color="brand.500">
                82
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Valor Previsto
              </Text>
              <Text fontWeight="semibold" fontSize="3xl" color="brand.500">
                R$ 1.503.000
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="6">
        {/* <Box w="250px" /> */}

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
              color="white"
              bg="blue.500"
              value="selecao-manual"
            >
              Seleção manual
            </Tabs.Trigger>
            <Tabs.Trigger
              fontSize="xs"
              h="6"
              rounded="lg"
              color="white"
              bg="blue.500"
              value="sincronizar"
            >
              Sincronizar
            </Tabs.Trigger>
            <Tabs.Trigger
              fontSize="xs"
              h="6"
              rounded="lg"
              color="white"
              bg="blue.500"
              value="importar-planilha"
            >
              Importar planilha
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="selecao-manual" p="0">
            <SelecaoManualTab />
          </Tabs.Content>
          <Tabs.Content value="sincronizar">Sincronizar</Tabs.Content>
          <Tabs.Content value="importar-planilha">
            Importar planilha
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
