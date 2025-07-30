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
import { UsuariosPage } from "./pages/usuarios/index";
import { AlterarSenha } from "./pages/alterarSenha";
import { RegistrosPage } from "./pages/registros";
import { Listas } from "./pages/listas";
import { SistemaPage } from "./pages/sistema";
import { IntegracaoRpaPage } from "./pages/integracaoRpa";
import { TicketsPagosPage } from "./pages/ticketsPagos";
import { AccessDenied } from "./pages/accessDenied";
import { DocumentosFiscaisList } from "./pages/documentoFiscal";
import { ImportDocumentosFiscaisPage } from "./pages/documentoFiscal/importacao";
import { IntegracaoPrestadorCentralOmieEsteira } from "./pages/integracao/prestador/centralOmie";
import { IntegracaoPrestadorCentralOmieDatagrid } from "./pages/integracao/prestador/centralOmie/datagrid";
import { IntegracaoPrestadorOmieCentralEsteira } from "./pages/integracao/prestador/omieCentral";
import { IntegracaoPrestadorOmieCentralDatagrid } from "./pages/integracao/prestador/omieCentral/datagrid";
import { IntegracaoContaPagarCentralOmieEsteira } from "./pages/integracao/contaPagar/centralOmie";
import { IntegracaoContaPagarCentralOmieDatagrid } from "./pages/integracao/contaPagar/centralOmie/datagrid";
import { IntegracaoArquivosCentralOmieEsteira } from "./pages/integracao/arquivos/centralOmie";
import { IntegracaoContaPagarOmieCentralEsteira } from "./pages/integracao/contaPagar/omieCentral";
import { IntegracaoArquivosCentralOmieDatagrid } from "./pages/integracao/arquivos/centralOmie/datagrid";
import { IntegracaoContaPagarOmieCentralDatagrid } from "./pages/integracao/contaPagar/omieCentral/datagrid";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/servicos-tomados", element: <ServicosTomados /> },
      { path: "/planejamento", element: <PlanejamentoMensal /> },
      { path: "/prestadores", element: <PrestadoresList /> },
      { path: "/prestadores/importacao", element: <ImportPrestadoresPage /> },
      { path: "/servicos/todos", element: <ServicosList /> },
      { path: "/documentos-fiscais", element: <DocumentosFiscaisList /> },
      { path: "/servicos/importacao", element: <ImportServicosPage /> },
      {
        path: "/documentos-fiscais/importacao",
        element: <ImportDocumentosFiscaisPage />,
      },
      { path: "/usuarios", element: <UsuariosPage /> },
      { path: "/registros", element: <RegistrosPage /> },
      { path: "/listas", element: <Listas /> },
      { path: "/sistema", element: <SistemaPage /> },
      { path: "/doc", element: <Doc /> },
      { path: "/integracao-rpa", element: <IntegracaoRpaPage /> },
      { path: "/pagos", element: <TicketsPagosPage /> },

      {
        path: "/integracao/prestador/central-omie",
        element: <IntegracaoPrestadorCentralOmieEsteira />,
      },
      {
        path: "/integracao/prestador/central-omie/todos",
        element: <IntegracaoPrestadorCentralOmieDatagrid />,
      },
      {
        path: "/integracao/prestador/omie-central",
        element: <IntegracaoPrestadorOmieCentralEsteira />,
      },

      {
        path: "/integracao/prestador/omie-central/todos",
        element: <IntegracaoPrestadorOmieCentralDatagrid />,
      },
      {
        path: "/integracao/conta-pagar/central-omie",
        element: <IntegracaoContaPagarCentralOmieEsteira />,
      },
      {
        path: "/integracao/conta-pagar/central-omie/todos",
        element: <IntegracaoContaPagarCentralOmieDatagrid />,
      },
      {
        path: "/integracao/conta-pagar/omie-central",
        element: <IntegracaoContaPagarOmieCentralEsteira />,
      },
      {
        path: "/integracao/conta-pagar/omie-central/todos",
        element: <IntegracaoContaPagarOmieCentralDatagrid />,
      },
      {
        path: "/integracao/anexos/central-omie",
        element: <IntegracaoArquivosCentralOmieEsteira />,
      },
      {
        path: "/integracao/anexos/central-omie/todos",
        element: <IntegracaoArquivosCentralOmieDatagrid />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/alterar-senha", element: <AlterarSenha /> },
      { path: "/acesso-negado", element: <AccessDenied /> },
    ],
  },
]);
