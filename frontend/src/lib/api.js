import axios from "axios";

// Função para decidir qual URL usar dinamicamente
const getBaseUrl = () => {
  // Se "window" é undefined, significa que estamos rodando no SERVIDOR (dentro do Docker)
  if (typeof window === "undefined") {
    // Tenta pegar uma variável interna ou usa o nome do serviço Docker direto
    return process.env.API_INTERNAL_URL || "http://backend:1337";
  }
  
  // Se estamos no NAVEGADOR, usa a variável pública (localhost)
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  }
});

const govApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/",
});

export const apiFetcher = (url) => api.get(url).then((res) => res.data);

export const govApiFetcher = (url) => govApi.get(url).then((res) => res.data);