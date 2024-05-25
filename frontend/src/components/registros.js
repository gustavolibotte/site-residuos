import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { findAllUserDescarte } from "../lib/descarte";

export default function Registros() {
  const [descartes, setDescartes] = useState([]);
  const authContext = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    findAllUserDescarte({
      token,
      user: authContext.user,
    }).then((res) => {
      console.log(res);
      const descarte = res.map((d) => ({
        id: d.id,
        data: d.data,
        title: `${d.residuo.Title} - ${d.local.nome}`,
        text: d.descricao_descarte,
      }));
      setDescartes(descarte);
    });
  }, [authContext]);

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Registros de devoluções</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Mantenha os seus registros atualizados e tenha o controle de suas
          devoluções.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {descartes.map((descarte) => (
            <HStack key={descarte.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{descarte.title}</Text>
                <Text color={"gray.900"}>{descarte.text}</Text>
                <Text fontSize="xs" color={"gray.600"}>
                  {descarte.data}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
