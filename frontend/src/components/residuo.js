import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Residuo({
  Title,
  Subtitle,
  Button: ButtonData,
  Image: ImageData,
  Description,
  Content,
}) {
  const router = useRouter();
  return (
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 8, lg: 25 }}
      py={{ base: 10, sm: 20, lg: 27 }}
    >
      <Flex>
        {ImageData.data ? (
          <Image
            rounded={"md"}
            alt={ImageData.data.attributes.alternativeText}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ImageData.data.attributes.url}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%"}}
          />
        ) : null}
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={"header"}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
          >
            {Title}
          </Heading>
          <Text
            color={useColorModeValue("gray.900", "gray.400")}
            fontWeight={300}
            fontSize={"2xl"}
          >
            {Subtitle}
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={"column"}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />
          }
        >
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"2xl"}
              fontWeight={"300"}
            >
              {Description}
            </Text>
            <Text fontSize={"lg"}>{Content}</Text>
          </VStack>
        </Stack>

        <Button
          rounded={"none"}
          w={"full"}
          mt={8}
          size={"lg"}
          py={"7"}
          onClick={() => {
            router.push(ButtonData.link);
          }}
          bg={useColorModeValue("gray.900", "gray.50")}
          color={useColorModeValue("white", "gray.900")}
          textTransform={"uppercase"}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
        >
          {ButtonData.buttonContent}
        </Button>
      </Stack>
    </Container>
  );
}
