import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import ReceptorHero from "./ReceptorHero";
import { ReceptorForm } from "./ReceptorForm";

export default function Receptor(props) {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 8, lg: 25 }}
        py={{ base: 10, sm: 20, lg: 27 }}
      >
        <ReceptorHero />
        <ReceptorForm {...props} />
      </Container>
    </Box>
  );
}
