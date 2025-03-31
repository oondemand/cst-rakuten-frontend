import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/_layouts/main";
import { LoginPage } from "./pages/login";
import { AuthLayout } from "./components/_layouts/auth";
import { PrestadoresList } from "./pages/prestadores/list";
import { ServicosList } from "./pages/servicos/list";
import { ServicosTomados } from "./pages/servicosTomados";
import { Dashboard } from "./pages/dashboard";
import { Doc } from "./pages/doc";
import { PlanejamentoMensal } from "./pages/planejamentoMensal";
import { ImportServicosPage } from "./pages/servicos/importacao";
import { ImportPrestadoresPage } from "./pages/prestadores/importacao";
import { UsuariosPage } from "./pages/usuarios";

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
        path: "/planejamento",
        element: <PlanejamentoMensal />,
      },
      {
        path: "/prestadores",
        element: <PrestadoresList />,
      },
      {
        path: "/prestadores/importacao",
        element: <ImportPrestadoresPage />,
      },
      {
        path: "/servicos/todos",
        element: <ServicosList />,
      },
      {
        path: "/servicos/importacao",
        element: <ImportServicosPage />,
      },
      {
        path: "/usuarios",
        element: <UsuariosPage />,
      },
      {
        path: "/doc",
        element: <Doc />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);
