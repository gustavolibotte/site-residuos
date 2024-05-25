export const formValuesToRequest = (values, categorias, residuos) => {
  const categoria = categorias.find((c) => c.id == values.categoria);
  return {
    categoria: {
      id: categoria.id,
      ...categoria.attributes,
    },
    condicao: values.condicao,
    email: values.email,
    infoVerdadeira: values.infoVerdadeira,
    nome: values.nome,
    residuos: values.residuos.map((rId) => {
      const id = parseInt(rId);
      const residuo = residuos.find((r) => r.id === id);
      return {
        id: residuo.id,
        ...residuo.attributes,
      };
    }),
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
