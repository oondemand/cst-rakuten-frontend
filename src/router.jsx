import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { MainLayout } from "./components/_layouts/main";
import { LoginPage } from "./pages/login";
import { AuthLayout } from "./components/_layouts/auth";
import { PrestadoresList } from "./pages/prestadores/list";
import { ServicosList } from "./pages/servicos/list";

import { ServicoDialogProvider } from "./hooks/useServicosForm";
import { PrestadorDialogProvider } from "./hooks/usePrestadorForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/servicos-tomados",
        element: <Home />,
      },
      {
        path: "/prestadores",
        element: (
          <PrestadorDialogProvider>
            <PrestadoresList />
          </PrestadorDialogProvider>
        ),
      },
      {
        path: "/servicos/todos",
        element: (
          <ServicoDialogProvider>
            <ServicosList />
          </ServicoDialogProvider>
        ),
      },
      {
        path: "/servicos/provisionamento",
        element: <div>Serviços/Provisionamento</div>,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);
