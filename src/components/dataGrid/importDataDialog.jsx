import { Button, Box, Icon } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogActionTrigger,
} from "../../components/ui/dialog";

import {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadList,
} from "../../components/ui/file-upload";

import { useState } from "react";
import { Oondemand } from "../svg/oondemand";

export const ImportDataDialog = ({
  accept,
  btnTitle = "Importar arquivo",
  handleImport,
  ...props
}) => {
  const [files, setFiles] = useState({});

  return (
    <DialogRoot size="lg" placement="center">
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="subtle"
          color="brand.500"
          colorPalette="gray"
          fontWeight="semibold"
          {...props}
        >
          {btnTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        overflow="auto"
        scrollbarWidth="thin"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogHeader mt="-4" py="2" px="4">
          <DialogTitle>Importar arquivo</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <FileUploadRoot
            accept={accept}
            onFileAccept={(e) => {
              setFiles(e.files);
            }}
            maxW="full"
            alignItems="stretch"
            maxFiles={1}
          >
            <FileUploadList showSize clearable />
            <FileUploadDropzone
              label="Arraste ou click para selecionar"
              description=""
            />
          </FileUploadRoot>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger>
            <Button colorPalette="gray" variant="subtle">
              Cancelar
            </Button>
          </DialogActionTrigger>
          {/* <DialogActionTrigger asChild> */}
          <Button
            disabled={!files}
            onClick={async (e) => {
              await handleImport({ files });
            }}
            colorPalette="gray"
            variant="subtle"
            color="brand.500"
          >
            Enviar
          </Button>
          {/* </DialogActionTrigger> */}
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
