import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";

import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import { CircleAlert } from "lucide-react";

export const ConfirmationModal = ({
  visible,
  title,
  description,
  handleConfirm,
  handleClose,
}) => {
  return (
    <DialogRoot placement="center" lazyMount open={visible}>
      <DialogContent alignItems="center" rounded="lg" pb="4" pt="1">
        <DialogHeader display="flex" flexDir="column" alignItems="center">
          <CircleAlert size={100} />
          <DialogTitle mt="6" asChild>
            <Heading>{title}</Heading>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          textAlign="center"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
        >
          {description}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={handleClose}
              fontWeight="semibold"
              fontSize="md"
              variant="surface"
            >
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleConfirm}
            fontWeight="semibold"
            fontSize="md"
            colorPalette="red"
          >
            Confirmar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleClose} />
      </DialogContent>
    </DialogRoot>
  );
};
