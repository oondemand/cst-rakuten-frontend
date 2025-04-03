import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { env } from "../../../config/env";

export const Footer = () => {
  return (
    <Box p={4} textAlign="center" bg="gray.50" color="gray.800">
      <Text>
        &copy; Central de Serviços OonDemand vs {env.VITE_SERVICE_VERSION}
      </Text>
    </Box>
  );
};
