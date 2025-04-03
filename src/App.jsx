import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./styles/theming";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { queryClient } from "./config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfirmationProvider } from "./hooks/useConfirmation";
import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider value={system}>
        <AuthProvider>
          <ConfirmationProvider>
            <Toaster />
            <RouterProvider router={router} />
          </ConfirmationProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
