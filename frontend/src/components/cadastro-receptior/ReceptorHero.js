import { Box, Heading, Stack, Text, Image } from "@chakra-ui/react";

export default function ReceptorHero() {
  return (
    <Stack spacing={{ base: 8, md: 20 }}>
      <Heading
        lineHeight={1.1}
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
      >
        Seja você também um{" "}
        <Text
          as={"span"}
          bgGradient="linear(to-r, green.400,green.600)"
          bgClip="text"
        >
          Receptor
        </Text>{" "}
        no processo de logística reversa
      </Heading>
      <Box boxSize="padding-box">
        <Image
          src="https://cdn.pixabay.com/photo/2018/04/03/05/31/personal-3285993_960_720.png"
          alt="sustentabilidade"
          position="center"
        />
      </Box>
    </Stack>
  );
}
