import { IconButton } from "@chakra-ui/react";
import { Download } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { Tooltip } from "../../ui/tooltip";
import { TicketService } from "../../../service/ticket";
import { saveAs } from "file-saver";

export const DownloadFileAction = ({ id }) => {
  const { mutateAsync: restaurarTicketMutation, isPending } = useMutation({
    mutationFn: async () =>
      await TicketService.getFile({
        id,
      }),

    onSuccess: ({ data }) => {
      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    },

    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao baixar arquivo!",
        type: "error",
      });
    },
  });

  const handleDownloadFile = async () => {
    await restaurarTicketMutation();
  };

  return (
    <Tooltip
      content="Baixar arquivo"
      positioning={{ placement: "top" }}
      openDelay={700}
      closeDelay={50}
      contentProps={{
        css: {
          "--tooltip-bg": "white",
          color: "gray.600",
        },
      }}
    >
      <IconButton
        disabled={isPending}
        variant="surface"
        colorPalette="gray"
        size="2xs"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDownloadFile();
        }}
      >
        <Download />
      </IconButton>
    </Tooltip>
  );
};
