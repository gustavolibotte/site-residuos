import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useRouter } from "next/router";

import { registerUser } from "../lib/auth";
import { useAuthContext } from "../context/AuthContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFiMail = chakra(FiMail);

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, updateData] = useState({ user: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const authContext = useAuthContext();
  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, [authContext.isAuthenticated, router]);

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser(data.user, data.email, data.password)
      .then((res) => {
        setLoading(false);
        authContext.setUser(res.data.user);
      })
      .catch((error) => {
        setError("Credenciais inválidas");
        setLoading(false);
      });
  };

  return (
    <Flex
      flex={1}
      overflow="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Cadastro</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {error !== "" ? (
                <Text color="red.300" align={"center"} fontSize="sm">
                  Dados inválidos
                </Text>
              ) : null}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Nome"
                    id="user"
                    name="user"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={submit}
              >
                Cadastrar-se
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
