import { IconButton } from "@chakra-ui/react";
import { Upload } from "lucide-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { Tooltip } from "../../ui/tooltip";
import { TicketService } from "../../../service/ticket";
import { FileUploadRoot, FileUploadTrigger } from "../../ui/file-upload";
import { queryClient } from "../../../config/react-query";

export const AnexarArquivoAoTicketAction = ({ ticket }) => {
  const { mutateAsync: uploadFileMutation, isPending } = useMutation({
    mutationFn: async ({ files }) =>
      await TicketService.uploadFiles({ ticketId: ticket?._id, files }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["listar-tickets-pagos"]);
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

  return (
    <FileUploadRoot
      onFileAccept={async (e) => {
        await uploadFileMutation({ files: e.files });
      }}
    >
      <FileUploadTrigger
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Tooltip
          content="Anexar arquivo"
          positioning={{ placement: "top" }}
          openDelay={500}
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
          >
            <Upload />
          </IconButton>
        </Tooltip>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
};
