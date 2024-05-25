export const formValuesToRequest = (values) => {
  console.log("values: ", values);

  return {
    categoria: values.categoriaSelecionada,
    condicao: values.condicao,
    email: values.email,
    infoVerdadeira: values.infoVerdadeira,
    nome: values.nome,
    residuos: values.residuosSelecionados,
    telefone: values.telefone,
    cidade: values.cidade,
    estado: values.estado,
    cep: values.cep.replace("-", "").replace("_", "").trim(),
    bairro: values.bairro,
    rua: values.rua,
    numero: values.numero,
    complemento: values.complemento,
  };
};
