import { Box, Text, Flex, Grid, GridItem, Button } from "@chakra-ui/react";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toaster } from "../../ui/toaster";
import { CircleX, Download, Paperclip } from "lucide-react";
import { FileUploadRoot, FileUploadTrigger } from "../../ui/file-upload";
import { TicketService } from "../../../service/ticket";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { saveAs } from "file-saver";

export const FilesForm = ({ onlyReading, defaultValues, ticketId }) => {
  const [files, setFiles] = useState(defaultValues);
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: uploadFileMutation } = useMutation({
    mutationFn: async ({ files }) =>
      await TicketService.uploadFiles({ ticketId, files }),
    onSuccess: ({ data }) => {
      const { nomeOriginal, mimetype, size, tipo, _id } = data?.arquivos[0];
      setFiles((prev) => [
        ...prev,
        { nomeOriginal, mimetype, size, tipo, _id },
      ]);
      toaster.create({
        title: "Arquivo anexado com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro ao anexar arquivo!",
        type: "error",
      });
    },
  });

  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationFn: async ({ id }) => await TicketService.deleteFile({ id }),
    onSuccess: ({ data }) => {
      const filteredFiles = files.filter((e) => e?._id !== data?._id);
      setFiles(filteredFiles);
      toaster.create({
        title: "Arquivo deletado com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Ouve um erro ao deletar arquivo!",
        type: "error",
      });
    },
  });

  const FileTypeMap = {
    generico: "",
    rpa: "RPA",
  };

  const handleDeleteFileFromTicket = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja remover arquivo?",
      description: "Essa ação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await deleteFileMutation({ id });
    }
  };

  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await TicketService.getFile({ id });

      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap="4">
        <GridItem colSpan={1} mt="7">
          <Text
            fontSize="14px"
            display="flex"
            alignItems="center"
            gap="2"
            color="gray.500"
          >
            Anexos
          </Text>
        </GridItem>
        <GridItem colSpan={3} mt="6">
          <Box
            mt="4"
            w="full"
            h="1"
            borderBottom="2px solid"
            borderColor="gray.100"
          />

          <Box w="full" mt="6">
            {files?.map((item) => (
              <Flex justifyContent="space-between" mt="4" key={item?._id}>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontWeight="normal"
                  display="flex"
                  gap="1.5"
                  alignItems="center"
                >
                  <Paperclip color="purple" size={12} />{" "}
                  {FileTypeMap[item?.tipo]} {item?.nomeOriginal}
                  {"  "}
                  {(item?.size / 1024).toFixed(1)} KB
                </Text>
                <Flex gap="2">
                  <Button
                    onClick={async () =>
                      await handleDownloadFile({ id: item?._id })
                    }
                    cursor="pointer"
                    unstyled
                  >
                    <Download size={16} />
                  </Button>
                  {!onlyReading && (
                    <Button
                      disabled={!ticketId}
                      onClick={async () =>
                        await handleDeleteFileFromTicket({ id: item?._id })
                      }
                      color="red"
                      cursor="pointer"
                      unstyled
                    >
                      <CircleX size={16} />
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))}

            {!onlyReading && (
              <FileUploadRoot
                onFileAccept={async (e) => {
                  await uploadFileMutation({ files: e.files });
                }}
              >
                <FileUploadTrigger>
                  <Button
                    disabled={!ticketId}
                    mt="4"
                    size="2xs"
                    variant="surface"
                    color="gray.600"
                  >
                    Anexar arquivo
                  </Button>
                </FileUploadTrigger>
              </FileUploadRoot>
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
