import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

import { Chart } from "../../svg/chart";

import { Users, Settings } from "lucide-react";

import { NavLink } from "./navLink";
import { invertedChart } from "../../svg/invertedChart";

import { Link } from "react-router-dom";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Chart,
    href: "/",
  },
  {
    title: "Serviços Tomados",
    icon: invertedChart,
    href: "/servicos-tomados",
  },
  {
    title: "Todos Serviços",
    href: "/servicos/todos",
  },
  {
    title: "Planejamento",
    href: "/planejamento",
  },
  {
    title: "Pagos",
    href: "/pago",
  },
  {
    title: "Prestadores",
    icon: Users,
    href: "/prestadores",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/configuracoes",
  },
  {
    title: "Usuários",
    href: "/usuarios",
  },
  {
    title: "Base omie",
    href: "/base-omie",
  },
  {
    title: "Listas",
    href: "/listas",
  },
  {
    title: "Arquivados",
    href: "/arquivados",
  },
  {
    title: "Sistema",
    href: "/sistema",
  },
];

export const AuthLayout = () => {
  const { user, isLoading } = useAuth();

  if (!user && isLoading === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Flex direction="row" minHeight="100vh" minW="100vw">
      <Flex
        pt="4"
        flexDir="column"
        maxW="160px"
        minW="160px"
        w="160px"
        borderRight="1px solid"
        borderColor="gray.100"
        gap="2"
      >
        <Flex
          pb="2"
          mb="1"
          w="full"
          alignItems="center"
          justifyContent="center"
          borderBottom="1px solid"
          borderColor="gray.50"
        >
          <Link to="/">
            <Box w="120px">
              <Text>oondemand</Text>
              {/* <img src="/logo_rakuten_purple.png" alt="RAKUTEN" /> */}
            </Box>
          </Link>
        </Flex>
        {navigationItems.map((item, index) => {
          return (
            <NavLink
              key={`${item.title}-${index}`}
              to={item.href}
              icon={item.icon}
              title={item.title}
              i={index}
            />
          );
        })}
      </Flex>

      <Flex
        flex="1"
        // py="8"
        // px="6"
        flexDir="column"
        height="calc(100vh)"
        paddingBottom="0"
        overflow="hidden"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
