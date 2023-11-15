import axios from "axios";
import { Sneaker, SneakerData } from "../types";

export const BASE_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const getSneakers = () => {
  return api.get<SneakerData[]>("/sneakers").then((res) => res.data);
};

export const addSneaker = (payload: Partial<Sneaker>) => {
  return api.post<Sneaker>("/sneakers", payload);
};

export const updateSneaker = (payload: Partial<SneakerData>) => {
  const { _id, ...data } = payload;
  return api.put(`/sneakers/${payload._id}`, data);
};

export const deleteSneaker = (id: string) => {
  return api.delete(`/sneakers/${id}`);
};

export const sneakerApi = {
  getSneakers,
  addSneaker,
  updateSneaker,
  deleteSneaker,
};
