import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/_layouts/main";
import { LoginPage } from "./pages/login";
import { AuthLayout } from "./components/_layouts/auth";
import { PrestadoresList } from "./pages/prestadores/list";
import { ServicosList } from "./pages/servicos/list";
import { ServicosTomados } from "./pages/servicosTomados";
import { Dashboard } from "./pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/servicos-tomados",
        element: <ServicosTomados />,
      },
      {
        path: "/prestadores",
        element: <PrestadoresList />,
      },
      {
        path: "/servicos/todos",
        element: <ServicosList />,
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
