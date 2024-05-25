import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Heading, Radio, RadioGroup, Stack, Text, Checkbox, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { Formik } from "formik";
import { valoresIniciais } from "../../constants/ReceptorConstants";
import { createReceptor } from "./ReceptorRequest";
import { ReceptorSchema } from "./ReceptorSchema";
import { CepInput } from "../UI/form/CepInput";
import { CustomInput } from "../UI/form/CustomInput";
import { formValuesToRequest } from "./ReceptorDataMapper";

export function ReceptorForm(props) {
  const [customError, setCustomError] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const router = useRouter();

  const { residuos, categorias } = props;

  const submit = async (values, { setSubmitting }) => {
    if (!values.condicao || !values.infoVerdadeira) {
      setCustomErrorMessage("As condições acima são obrigatórias");
      setCustomError(true);
      setSubmitting(false);
      return;
    }
    const data = formValuesToRequest(values, categorias, residuos);

    const res = await createReceptor({
      data,
    });
    console.log(res);
    setSubmitting(false);
    if (res.error) {
      setCustomErrorMessage(res.error.message);
      setCustomError(true);
      return;
    }
    router.push("/confirmacao");
  };

  return (
    <Formik
      onSubmit={submit}
      validationSchema={ReceptorSchema}
      initialValues={valoresIniciais}
    >
      {(props) => (
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Junte-se a nós neste projeto
              <Text
                as={"span"}
                bgGradient="linear(to-r, green.400,green.600)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Para que o projeto logística reversa possa funcionar com sucesso,
              precisamos da sua ajuda! Faça o seu cadastro e seja um receptor de
              resíduos.
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <CustomInput
                label="Nome"
                name="nome"
                id="nome"
                placeholder="Nome"
              />
              <CustomInput
                label="E-mail"
                name="email"
                id="email"
                placeholder="E-mail de contato"
              />
              <CustomInput
                label="Telefone"
                name="telefone"
                id="telefone"
                placeholder="+55 (___) __-___-___"
              />
              <CepInput name="cep" label="CEP" id="cep" />
              <CustomInput
                label="Estado"
                placeholder="Estado"
                name="estado"
                id="estado"
              />{" "}
              <CustomInput
                label="Cidade"
                placeholder="Cidade"
                name="cidade"
                id="cidade"
              />{" "}
              <CustomInput
                label="Bairro"
                placeholder="Bairro"
                name="bairro"
                id="bairro"
              />{" "}
              <CustomInput label="Rua" placeholder="Rua" name="rua" id="rua" />{" "}
              <CustomInput
                label="Número"
                placeholder="000"
                name="numero"
                id="numero"
              />{" "}
              <CustomInput
                label="Complemento"
                placeholder="Complemento"
                name="complemento"
                id="complemento"
              />{" "}
            </Stack>
            <Box as={"form"} mt={4}>
              <Box spacing={4}>
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>Resíduos que você recebe</Text>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "16px" }}>
                  {residuos.map((residuo) => (
                    <Checkbox
                      key={residuo.id}
                      name="residuos"
                      value={residuo.id.toString()}
                    >
                      {residuo.attributes.Title}
                    </Checkbox>
                  ))}
                </div>
              </Box>
            </Box>
            <Box as={"form"} mt={4}>
              <Box spacing={4}>
                <Text color={"gray.500"}>Qual a sua categoria?</Text>
              </Box>
              <RadioGroup name="categoria" id="categoria" spacing={3}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "16px" }}>
                  {categorias.map((categoria) => (
                    <Radio
                      key={categoria.id}
                      value={categoria.id.toString()}
                      colorScheme="green"
                    >
                      {categoria.attributes.nome}
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </Box>
            <Box as="form" mt={4}>
              <Stack fontFamily="heading" mt={8} color="gray.500" spacing={3}>
                {/* <Text color="gray.600">Selecione:</Text> */}
                <Box> 
                  <FormControl display="flex" alignItems="center">
                    <Switch
                      name="infoVerdadeira"
                      id="infoVerdadeira"
                      colorScheme="green"
                      size="lg"
                    />
                    <FormLabel htmlFor="infoVerdadeira" mb={0} ml={2}>
                      Declaro que todas as informações inclusas acima são verdadeiras.
                    </FormLabel>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl display="flex" alignItems="center">
                    <Switch
                      name="condicao"
                      id="condicao"
                      colorScheme="green"
                      size="lg"
                    />
                    <FormLabel htmlFor="condicao" mb={0} ml={2}>
                      Concordo com os Termos e Condições ao enviar os meus dados.
                    </FormLabel>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
            {customError ? (
              <Text color={"red.300"} pt={2}>
                {customErrorMessage}
              </Text>
            ) : (
              ""
            )}
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, green.400,green.600)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, green.400,green.600)",
                boxShadow: "xl",
              }}
              onClick={() => {
                props.submitForm();
              }}
            >
              Enviar
            </Button>
          </Box>
        </Stack>
      )}
    </Formik>
  );
}
