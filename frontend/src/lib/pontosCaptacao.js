import qs from "qs";
import { api } from "./api";

export async function getPontosCaptacao(cidade, residuos) {
  const res = await api.get(
    `/api/captacao-de-receptores?cidade=${cidade}&residuos=${residuos}`
  );
  return res.data;
}
