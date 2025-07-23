import { Box, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { Footer } from "./footer";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

import { Chart } from "../../svg/chart";

import {
  Users,
  Settings,
  LogOut,
  ListChecks,
  CalendarSync,
  TicketCheckIcon,
  NotepadText,
  Rotate3D,
} from "lucide-react";

import { NavLink } from "./navLink";
import { invertedChart } from "../../svg/invertedChart";

import { Link } from "react-router-dom";
import { useConfirmation } from "../../../hooks/useConfirmation";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../ui/accordion";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Chart,
    href: "/",
    rules: ["admin", "tomador", "contabilidade"],
  },
  {
    title: "Central Serviços Tomados",
    icon: invertedChart,
    href: "/servicos-tomados",
    rules: ["admin", "tomador", "contabilidade"],
  },
  {
    title: "Serviços",
    href: "/servicos/todos",
    icon: ListChecks,
    rules: ["admin", "tomador"],
  },
  {
    title: "Documentos Fiscais",
    href: "/documentos-fiscais",
    icon: NotepadText,
    rules: ["admin", "tomador"],
  },
  {
    title: "Planejamento",
    href: "/planejamento",
    icon: CalendarSync,
    rules: ["admin", "tomador"],
  },
  {
    title: "Pagos",
    href: "/pagos",
    icon: TicketCheckIcon,
    rules: ["admin", "tomador", "contabilidade"],
  },
  {
    title: "Prestadores",
    icon: Users,
    href: "/prestadores",
    rules: ["admin", "tomador"],
  },
  {
    title: "Integrações",
    icon: Rotate3D,
    rules: ["admin"],
    subLinks: [
      {
        title: "Prestador central -> Omie",
        href: "/integracao/prestador/central-omie",
      },
      // {
      //   title: "Prestador omie -> central",
      //   href: "/integracao/omie-prestador",
      // },
    ],
  },
  {
    title: "Configurações",
    icon: Settings,
    rules: ["admin"],
    subLinks: [
      {
        title: "Usuários",
        href: "/usuarios",
      },
      {
        title: "Listas",
        href: "/listas",
      },
      {
        title: "Registros",
        href: "/registros",
      },
      {
        title: "Sistema",
        href: "/sistema",
      },
      {
        title: "Doc",
        href: "/doc",
      },
    ],
  },
];

export const AuthLayout = () => {
  const { user, isLoading, logout } = useAuth();
  const { requestConfirmation } = useConfirmation();
  const location = useLocation();

  const route = navigationItems.find((e) => {
    if (e?.subLinks) {
      return e?.subLinks?.some((e) => location.pathname === e.href);
    }

    return location.pathname === e.href;
  });

  if (
    user &&
    isLoading === false &&
    route?.rules &&
    !route.rules.includes(user.tipo)
  ) {
    return <Navigate to="/login" />;
  }

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
          <Link to="/" viewTransition>
            <Box w="120px">
              <img src="/logo_rakuten_purple.png" alt="RAKUTEN" />
            </Box>
          </Link>
        </Flex>
        {navigationItems.map((item, index) => {
          if (!item?.rules.includes(user?.tipo)) return;

          if (item?.subLinks) {
            return (
              <AccordionRoot key={`${item.title}-${index}`} collapsible>
                <AccordionItem border="none">
                  <AccordionItemTrigger
                    cursor="pointer"
                    gap="1"
                    px="3"
                    border="none"
                  >
                    <Flex rounded="40%" gap="3" bg="white" alignItems="center">
                      <Icon
                        as={item?.icon}
                        w="18px"
                        h="18px"
                        color="brand.500"
                      />
                      <Text
                        fontSize="12px"
                        color="gray.500"
                        fontWeight="semibold"
                      >
                        {item?.title}
                      </Text>
                    </Flex>
                  </AccordionItemTrigger>
                  <AccordionItemContent w="full">
                    {item?.subLinks.map((item, i) => (
                      <Box key={`${item.title}-${index}`} w="full" pb="2">
                        <NavLink
                          to={item?.href ?? "#"}
                          icon={item.icon}
                          title={item.title}
                          i={index}
                        />
                      </Box>
                    ))}
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            );
          }

          return (
            <NavLink
              key={`${item.title}-${index}`}
              to={item?.href ?? "#"}
              icon={item.icon}
              title={item.title}
              i={index}
            />
          );
        })}
        {user?.tipo && (
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
            data-state="open"
            _open={{
              animation: "fade-in 300ms ease-out",
            }}
          >
            <LogOut color="#8528CE" size={18} /> Sair
          </Button>
        )}
      </Flex>

      <Flex
        flex="1"
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
