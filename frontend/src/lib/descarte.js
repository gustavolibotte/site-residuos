import { api } from "./api";
import qs from "qs";

export const createDescarte = async ({ data, token, user }) => {
  try {
    const res = await api.request({
      method: "POST",
      url: `api/descartes`,
      data: {
        data: {
          ...data,
          user: user.id,
        },
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const findAllUserDescarte = async ({ token, user }) => {
  try {
    const query = qs.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await api.request({
      url: `/api/descartes/?populate=%2A`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
