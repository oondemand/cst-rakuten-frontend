import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Box,
} from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
} from "../../components/ui/dialog";
import { queryClient } from "../../config/react-query";

import { Oondemand } from "../../components/svg/oondemand";
import { PrestadorForm } from "./form/prestador";
import { TicketActions } from "./actions";

export const TicketDetailsModal = ({
  open,
  setOpen,
  defaultValues,
  onlyReading,
}) => {
  return (
    <DialogRoot
      size="cover"
      open={open}
      onOpenChange={({ open }) => {
        queryClient.invalidateQueries(["listar-tickets"]);
        setOpen(open);
      }}
    >
      <DialogContent
        overflow="hidden"
        w="1000px"
        h="95%"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogTitle
          asChild
          borderBottom="1px solid"
          w="full"
          borderColor="gray.200"
        >
          <Flex gap="4" alignItems="center" mt="-4" py="2" px="4">
            <Oondemand />
            <Heading fontSize="sm">Detalhes</Heading>
          </Flex>
        </DialogTitle>
        <DialogBody
          pb="16"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          overflowY="auto"
          className="dialog-custom-scrollbar"
        >
          <Flex mt="7" w="full" gap="4" justifyContent="space-between">
            <Input
              autoComplete="off"
              fontSize="md"
              borderBottom="none"
              focusRing="transparent"
              focusRingColor="transparent"
              outline="none"
              name="titulo"
              bg="white"
              variant="subtle"
              size="sm"
              px="0"
              defaultValue={`Prestador > Omie : ${defaultValues?.prestador?.nome}`}
              disabled={onlyReading}
            />
          </Flex>
          <PrestadorForm
            prestador={defaultValues?.prestador}
            onlyReading={onlyReading}
          />
          <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={1} mt="6">
              <Box w="100px">
                <Text color="gray.600" fontSize="sm">
                  Detalhes da requisicao
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3} mt="6">
              <Box
                w="full"
                h="1"
                borderBottom="2px solid"
                borderColor="gray.100"
              />
            </GridItem>
          </Grid>
        </DialogBody>
        <DialogFooter justifyContent="start">
          <TicketActions integracaoId={defaultValues?._id} />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
