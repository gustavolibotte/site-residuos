import {
  Container,
  Flex,
  Box,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  useToast,
  Select,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSimpleForm } from "../hooks/useSimpleForm";
import { createDescarte } from "../lib/descarte";
import useSWR from "swr";
import { govApiFetcher } from "../lib/api";
import { getPontosCaptacao } from "../lib/pontosCaptacao";

export default function (props) {
  const toast = useToast();
  const authContext = useAuthContext();
  const router = useRouter();
  const [locais, setLocais] = useState(null);
  const [cidade, setCidade] = useState("");
  const [residuo, setResiduo] = useState("");
  const [data, handleOnChange] = useSimpleForm({
    local: "",
    data: "",
    descricao_descarte: "",
    stateSelected: null,
  });

  const { residuos } = props;

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

  useEffect(() => {
    search();

    async function search() {
      if (cidade == "" && residuo == "") return;
      const res = await getPontosCaptacao(cidade, residuo);
      setLocais(res);
    }
  }, [cidade, residuo]);

  const submit = async () => {
    const token = localStorage.getItem("token");
    const res = await createDescarte({
      data: {
        ...data,
        cidade,
        residuo,
      },
      token,
      user: authContext.user,
    });
    if (Reflect.has(res, "error")) {
      return toast({
        title: "Erro",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    toast({
      title: "Descarte salvo",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    router.push("/devolucao");
  };

  return (
    <Container
      bg="green.400"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
    >
      <Flex>
        <Box p={6}>
          <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
            <WrapItem>
              <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                  <VStack spacing={5}>
                    <FormControl id="data">
                      <FormLabel>Digite a data de descarte</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <input
                          type="date"
                          size="md"
                          name="data"
                          onChange={handleOnChange}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="residuo">
                      <FormLabel>Selecione o Resíduo</FormLabel>
                      <Select
                        placeholder="Selecione um resíduo"
                        name="residuo"
                        onChange={(e) => setResiduo(e.target.value)}
                      >
                        {residuos.map((residuo) => {
                          return (
                            <option key={residuo.id} value={residuo.id}>
                              {residuo.attributes.Title}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl id="local">
                      <FormLabel>Selecione a Cidade</FormLabel>
                      <HStack spacing={2} size="sm">
                        <Select
                          placeholder="Estado"
                          width={200}
                          name="stateSelected"
                          onChange={handleOnChange}
                        >
                          {!errorState && !states ? (
                            <option>Carregando...</option>
                          ) : null}
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
                          onChange={(e) => setCidade(e.target.value)}
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
                    </FormControl>
                    <FormControl id="local">
                      <FormLabel>Selecione o local de descarte</FormLabel>
                      <Select
                        placeholder="Escolha o local"
                        name="local"
                        onChange={handleOnChange}
                      >
                        <Locais locais={locais} />
                      </Select>
                    </FormControl>
                    <FormControl id="informacao">
                      <FormLabel>Relate a sua devolução</FormLabel>
                      <Textarea
                        borderColor="gray.300"
                        _hover={{
                          borderRadius: "gray.300",
                        }}
                        onChange={handleOnChange}
                        name="descricao_descarte"
                        placeholder="informações sobre o descarte"
                      />
                    </FormControl>
                    <FormControl id="name" float="right">
                      <Button
                        bg={"green.400"}
                        color={"white"}
                        _hover={{
                          bg: "green.500",
                        }}
                        onClick={submit}
                      >
                        Salvar devolução
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>
    </Container>
  );
}

const Locais = ({ locais }) => {
  if (!locais) return <option>Escolha a cidade</option>;

  if (locais.length === 0) return <option>Nenhum local encontrado</option>;

  return locais.map((local) => (
    <option key={local.id} value={local.id}>
      {local.nome} - {local.bairro} {local.rua}, {local.numero}
    </option>
  ));
};
