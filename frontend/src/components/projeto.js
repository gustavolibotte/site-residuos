import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Sobre este projeto
            <br />
          </Heading>
          <Text color={"gray.500"}>
            Este site nasceu de um projeto final desenvovido para a conclusão do
            curso de graduação em Engenharia da Computação e tem como foco
            conscientizar e aproximar pessoas que desejem descartar ou receber
            resíduos.
          </Text>
        </Stack>
      </Container>
    </>
  );
}