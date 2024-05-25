import qs from "qs";
import { api } from "./api";

export async function getResiduos(simple = false) {
  if (simple) {
    const res = await api.get(`/api/residuos`);
    return res.data;
  }
  const resPopulated = await api.get(`/api/residuos?populate=*`);
  return resPopulated.data;
}

export async function getResiduoBySlug(slug) {
  const query = qs.stringify(
    {
      filters: {
        Slug: {
          $eq: slug,
        },
      },
      populate: "*",
      publicationState: "live",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await api.get(`/api/residuos?${query}`);
  return res.data;
}
