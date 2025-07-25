import { Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { TicketDetailsModal } from "../modal";
import { Tooltip } from "../../../../../components/ui/tooltip";
import { Eye } from "lucide-react";

export const VerDetalhesCell = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Tooltip
        content="Visualizar detalhes"
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
          onClick={() => setOpen(true)}
          variant="surface"
          colorPalette="gray"
          size="2xs"
        >
          <Eye />
        </IconButton>
      </Tooltip>
      {open && (
        <TicketDetailsModal
          onlyReading={true}
          open={open}
          setOpen={setOpen}
          ticket={props.row.original}
        />
      )}
    </Box>
  );
};
