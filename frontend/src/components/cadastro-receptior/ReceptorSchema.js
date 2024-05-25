import * as Yup from "yup";

export const ReceptorSchema = Yup.object().shape({
  nome: Yup.string().required("Nome obrigatório"),
  email: Yup.string().required("E-mail obrigatório").email("E-mail invalido"),
  telefone: Yup.string()
    .required("Telefone obrigatório")
    .min(8, "Telefone invalido"),
  residuos: Yup.array().min(1, "Pelo menos um residuo deve ser selecionado"),
  categoria: Yup.mixed().required("Pelo menos um residuo deve ser selecionado"),
  condicao: Yup.boolean(),
  infoVerdadeira: Yup.boolean(),
  cidade: Yup.string().required("Cidade obrigatória"),
  estado: Yup.string().required("Estado obrigatório"),
  cep: Yup.string().required("CEP obrigatório"),
  bairro: Yup.string().required("Bairro obrigatório"),
  rua: Yup.string().required("Rua obrigatória"),
  complemento: Yup.string(),
});
