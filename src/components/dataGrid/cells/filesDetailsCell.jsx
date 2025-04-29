import { Flex, Text, Popover, Portal, Button } from "@chakra-ui/react";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { useMutation } from "@tanstack/react-query";
import { TicketService } from "../../../service/ticket";
import { saveAs } from "file-saver";

import { Paperclip, Download, CircleX, Eye } from "lucide-react";
import { toaster } from "../../ui/toaster";

export const FilesDetailsCell = (props) => {
  const { requestConfirmation } = useConfirmation();

  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationFn: async ({ id }) =>
      await TicketService.deleteFile({ id, ticketId: props.row.original?._id }),
    onSuccess: ({ data }) => {
      props.row.original.arquivos = props.row.original?.arquivos?.filter(
        (e) => e?._id !== data?._id
      );

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
    <Popover.Root positioning={{ placement: "top" }}>
      <Popover.Trigger w="full" h="full">
        <Flex
          gap="1"
          alignItems="center"
          cursor="pointer"
          color="gray.500"
          justifyContent="center"
        >
          <Text color="gray.700" alignSelf="center" fontSize="sm" truncate>
            {props.row.original?.arquivos?.length}
          </Text>
          <Eye size={18} />
        </Flex>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto">
            <Popover.Arrow />
            <Popover.Body
              maxW="1440px"
              overflow="auto"
              className="custom-scrollbar"
            >
              <Popover.Title>Anexos</Popover.Title>
              <Flex flexDirection="column" minH="8" justifyContent="center">
                {props.row.original?.arquivos?.map((item) => {
                  console.log(item);

                  return (
                    <Flex
                      gap="8"
                      justifyContent="space-between"
                      mt="4"
                      key={item?._id}
                    >
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

                        <Button
                          onClick={async () =>
                            await handleDeleteFileFromTicket({ id: item?._id })
                          }
                          color="red"
                          cursor="pointer"
                          unstyled
                        >
                          <CircleX size={16} />
                        </Button>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
