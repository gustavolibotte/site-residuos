import { api } from "../../lib/api";

export const createReceptor = async (receptor) => {
  try {
    const response = await api.post("/api/captacao-de-receptores", receptor);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        error: { message: "Server falhou, tente novamente mais tarde" },
      };
    }
  }
};
