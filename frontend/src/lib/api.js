import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

const govApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/",
});

export const apiFetcher = (url) => api.get(url).then((res) => res.data);

export const govApiFetcher = (url) => govApi.get(url).then((res) => res.data);
