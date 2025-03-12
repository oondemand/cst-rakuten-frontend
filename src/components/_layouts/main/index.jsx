import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Box h="svh" w="svw">
      <Outlet />
    </Box>
  );
};
