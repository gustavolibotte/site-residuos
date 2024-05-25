import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import "reactjs-popup/dist/index.css";
import { useAuthContext } from "../context/AuthContext";

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const authContext = useAuthContext();

  const { residuos } = props;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6} // espaçamento entre as letras e a borda
      bg="teal.600" //cor do fundo do header
      color="white" //cor do texto do header
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/"  >
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Logística Reversa
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={8}
        mt={{ base: 8, md: 0 }}
        spacing={4}
        align="center"
      >
        <Button colorScheme="teal.500" variant="outline">
          <Link   href="/logisticareversa">
            O que é Logística Reversa
          </Link>
        </Button>
        <Menu>
          <MenuButton>
            <Button colorScheme="teal.500" variant="outline">
              Resíduos
            </Button>
          </MenuButton>
          <MenuList bg="teal.600">
            {residuos
              ? residuos.map((r) =>
                  r.attributes.Slug ? (
                    <Link
                      key={r.id}
                      href={`/residuo/${r.attributes.Slug}`}
                       
                    >
                      <MenuItem _hover={{ bg: "gray.400" }}>
                        {r.attributes.Title}
                      </MenuItem>
                    </Link>
                  ) : null
                )
              : null}
          </MenuList>
        </Menu>
        <Button colorScheme="teal.500" variant="outline">
          <Link   href="/cadastro-receptor">
            <a>Desejo ser um Receptor</a>
          </Link>
        </Button>
        <Button colorScheme="teal.500" variant="outline">
          <Link   href="/devolucao">
            <a>Minhas Devoluções</a>
          </Link>
        </Button>
      </Stack>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Stack direction="row" spacing={4}>
          {authContext.user ? (
            <Button
              leftIcon={<Avatar src="https://bit.ly/broken-link" />}
              colorScheme="teal.600"
              variant="solid"
            >
              {authContext.user.username}
            </Button>
          ) : (
            <Link   href="/login">
              <Button
                leftIcon={<Avatar src="https://bit.ly/broken-link" />}
                colorScheme="teal.600"
                variant="solid"
              >
                Entrar
              </Button>
            </Link>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
