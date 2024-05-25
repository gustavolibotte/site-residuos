import { api } from "./api";

export async function getCategories(simple = false) {
  if (simple) {
    const res = await api.get(`/api/categorias`);
    return res.data;
  }
  const resPopulated = await api.get(`/api/categorias?populate=*`);
  return resPopulated.data;
}
