import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Select,
  Button,
  HStack,
  RadioGroup,
  Radio,
  Box,
  UnorderedList,
  ListItem,
  Link,
  Grid,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { IoIosHome } from "react-icons/io";
import { IoIosMap } from "react-icons/io";
import { MdChangeCircle } from "react-icons/md";
import { govApiFetcher } from "../lib/api";
import { getPontosCaptacao } from "../lib/pontosCaptacao";
import { Feature } from "./feature";
import { useSimpleForm } from "../hooks/useSimpleForm";
import { useRouter } from "next/router";

export default function Logistica(props) {
  const [data, onChange] = useSimpleForm({
    cidade: "",
    stateSelected: null,
  });

  const router = useRouter();
  const [residuo, setResiduo] = useState("");
  const [results, setResults] = useState([]);
  const [alreadySearch, setAlreadySearch] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const { residuos = [] } = props; // Default to empty array if undefined

  const linkElements = useRef(null);
  const iframeRef = useRef(null);

  const { data: states, error: errorState } = useSWR(
    "/api/v1/localidades/estados",
    govApiFetcher
  );
  const { data: cities, error: errorCities } = useSWR(
    () =>
      data.stateSelected
        ? `/api/v1/localidades/estados/${data.stateSelected}/municipios`
        : null,
    govApiFetcher
  );
  console.log(router.query);

  const search = async () => {
    const res = await getPontosCaptacao(data.cidade, residuo);
    setAlreadySearch(true);
    setResults(res);
    linkElements.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  return (
    <Container maxW={"5x1"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Seja Bem vindo!
          </Text>
          <Heading>Logística Reversa</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            A Logística Reversa é um conjunto de procedimentos e meios para
            recolher e dar encaminhamento pós-venda ou pós-consumo ao setor
            empresarial, para reaproveitamento ou destinação correta de
            resíduos. Aqui iremos te ajudar a descartar corretamente o seu
            material.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={MdChangeCircle} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Selecione o seu material"}
            />
            <RadioGroup onChange={setResiduo} name="residuos" value={residuo}>
              <Grid
                templateColumns={{
                  md: "repeat(3, 1fr)",
                  base: "repeat(2, 1fr)",
                }}
                gap={3}
              >
                {residuos.map((residuoData) => {
                  const residuo = residuoData.attributes;
                  return (
                    <Radio
                      key={residuoData.id}
                      value={residuoData.id.toString()}
                    >
                      {residuo.Title}
                    </Radio>
                  );
                })}
              </Grid>
            </RadioGroup>
            <Feature
              icon={<Icon as={IoIosHome} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Selecione a cidade para descarte"}
            />
            <HStack spacing={2} size="sm">
              <Select
                placeholder="Estado"
                width={200}
                name="stateSelected"
                onChange={onChange}
              >
                {!errorState && !states ? <option>Carregando...</option> : null}
                {states
                  ? states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.sigla}
                      </option>
                    ))
                  : null}
              </Select>
              <Select
                placeholder="Escolha sua cidade"
                name="cidade"
                onChange={onChange}
              >
                {!data.stateSelected ? (
                  <option>Escolha um estado primeiro</option>
                ) : null}

                {cities
                  ? cities.map((city) => (
                      <option key={city.nome} value={city.nome}>
                        {city.nome}
                      </option>
                    ))
                  : null}
              </Select>
            </HStack>
            <Feature
              icon={<Icon as={IoIosMap} color={"purple.500"} w={5} h={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Visualize os pontos de entrega"}
            />
            <Button
              color={"green.500"}
              disabled={data.cidade === "" && residuo === ""}
              onClick={search}
            >
              Buscar
            </Button>
          </Stack>
        </Stack>
        <Box>
          <UnorderedList ref={linkElements}>
            {alreadySearch ? (
              <>
                {results.length > 0 ? (
                  results.map((result) => {
                    return (
                      <ListItem key={result.id} pb={4}>
                        <Text>
                          <Link onClick={(_) => {
                            setSelectedResult(result);
                            setTimeout(() => {
                              iframeRef.current?.scrollIntoView({
                                block: "end",
                                behavior: "smooth",
                              });
                            }, 1000);
                          }}>
                            {result.nome} - {result.bairro} {result.rua},{" "}
                            {result.numero}
                          </Link>
                        </Text>
                      </ListItem>
                    );
                  })
                ) : (
                  <Text p={2}>
                    Nenhum local de descarte encontrado na sua região
                  </Text>
                )}
              </>
            ) : null}
          </UnorderedList>
          <div className="google-maps">
            {selectedResult ? (
              <iframe
                src={selectedResult.link}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ref={iframeRef}
              ></iframe>
            ) : (
              <img label="logistica reversa imagem" alt="logistica reversa imagem" src="https://cdn.pixabay.com/photo/2018/04/05/23/59/nature-3294632_960_720.jpg"></img>
            )}
          </div>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
