import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

import { Chart } from "../../svg/chart";

import { Users, Settings, LogOut } from "lucide-react";

import { NavLink } from "./navLink";
import { invertedChart } from "../../svg/invertedChart";

import { Link } from "react-router-dom";
import { useConfirmation } from "../../../hooks/useConfirmation";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Chart,
    href: "/",
  },
  {
    title: "Central Serviços Tomados",
    icon: invertedChart,
    href: "/servicos-tomados",
  },
  {
    title: "Serviços",
    href: "/servicos/todos",
  },
  {
    title: "Planejamento",
    href: "/planejamento",
  },
  // {
  //   title: "Pagos",
  //   href: "/pago",
  // },
  {
    title: "Prestadores",
    icon: Users,
    href: "/prestadores",
  },
  {
    title: "Configurações",
    icon: Settings,
    // href: "/configuracoes",
  },
  {
    title: "Usuários",
    href: "/usuarios",
  },
  // {
  //   title: "Base omie",
  //   href: "/base-omie",
  // },
  // {
  //   title: "Listas",
  //   href: "/listas",
  // },
  {
    title: "Arquivados",
    href: "/arquivados",
  },
  {
    title: "Sistema",
    href: "/sistema",
  },
  {
    title: "Doc",
    href: "/doc",
  },
];

export const AuthLayout = () => {
  const { user, isLoading, logout } = useAuth();
  const { requestConfirmation } = useConfirmation();

  if (!user && isLoading === false) {
    return <Navigate to="/login" replace />;
  }

  const handleLogOut = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja sair ?",
      description: "Você tera que fazer o login novamente.",
    });

    if (action === "confirmed") {
      logout();
    }
  };

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
              {/* <Text>oondemand</Text> */}
              <img src="/logo_rakuten_purple.png" alt="RAKUTEN" />
            </Box>
          </Link>
        </Flex>
        {navigationItems.map((item, index) => {
          return (
            <NavLink
              key={`${item.title}-${index}`}
              to={item?.href ?? "#"}
              // {...(item?.href ? {} : { color: "gray.200" })}
              icon={item.icon}
              title={item.title}
              i={index}
            />
          );
        })}
        <Button
          onClick={handleLogOut}
          mt="2"
          unstyled
          display="flex"
          gap="3"
          textAlign="left"
          px="4"
          alignItems="center"
          color="gray.700"
          fontSize="sm"
          cursor="pointer"
        >
          <LogOut color="purple" size={18} /> Sair
        </Button>
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
