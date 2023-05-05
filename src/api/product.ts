import axios from "axios";
import { Category, Product } from "../models";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const createProduct = async (product: unknown) => {
  const response = await axios.post("/products", product);
  return response.data;
};
