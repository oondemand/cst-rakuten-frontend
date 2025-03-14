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

export const ImportDataDialog = ({ handleImport }) => {
  const [files, setFiles] = useState({});

  return (
    <DialogRoot size="lg" placement="center">
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="subtle"
          color="brand.500"
          colorPalette="gray"
        >
          Importar arquivo
        </Button>
      </DialogTrigger>
      <DialogContent
        overflow="auto"
        scrollbarWidth="thin"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogHeader>
          <DialogTitle>Importar arquivo</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <FileUploadRoot
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
          <Button
            disabled={!files}
            onClick={() => {
              handleImport({ files });
            }}
            colorPalette="gray"
            variant="subtle"
            color="brand.500"
          >
            Enviar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
