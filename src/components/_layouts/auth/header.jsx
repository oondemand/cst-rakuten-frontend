import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../../ui/menu";
import { Settings, User } from "lucide-react";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { useAuth } from "../../../hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();
  const { requestConfirmation } = useConfirmation();
  const { logout } = useAuth();

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
    <Flex
      shadow="md"
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg="white"
    >
      <Link to="/">
        <Box as="span" fontSize="xl" fontWeight="bold" color="brand.500">
          <img src="/logo_rakuten_purple.png" alt="RAKUTEN" />
        </Box>
      </Link>

      <Flex align="center" gap="4">
        <Text color="gray.500">Menu</Text>
        <MenuRoot>
          <MenuTrigger
            color="brand.500"
            focusRing="none"
            cursor="pointer"
            alignItems="baseline"
          >
            <Box p="1" rounded="full" bg="brand.50">
              <User size="28" />
            </Box>
          </MenuTrigger>
          <MenuContent cursor="pointer">
            <MenuItem onClick={handleLogOut} cursor="pointer">
              Sair
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Flex>
  );
};

export default Header;
