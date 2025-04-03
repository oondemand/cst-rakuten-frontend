import { Text, Icon, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const NavLink = ({ to, title, icon, i, ...props }) => {
  const location = useLocation();

  return (
    <ChakraLink
      asChild
      w="full"
      py="1"
      gap="2"
      cursor="pointer"
      alignItems="center"
      textDecoration="none"
      px={icon ? "2" : "4"}
      focusRingColor="transparent"
      _hover={{ backgroundColor: "gray.50" }}
      bg={location.pathname == to ? "gray.50" : "white"}
      color={
        location.pathname == to ? "gray.800" : icon ? "gray.500" : "gray.500"
      }
      {...props}
    >
      <Link to={to} viewTransition>
        {icon && (
          <Flex
            p="5px"
            rounded="40%"
            bg={i == 0 && "brand.500"}
            color={i == 0 ? "white" : "inherit"}
          >
            <Icon
              as={icon}
              w="18px"
              h="18px"
              color={i == 0 ? "white" : "brand.500"}
            />
          </Flex>
        )}
        <Text fontSize="12px" fontWeight="semibold">
          {title}
        </Text>
      </Link>
    </ChakraLink>
  );
};
