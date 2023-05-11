import axios from "axios";
import { Product } from "../models";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const createProduct = async (product: unknown) => {
  const response = await axios.post<Product>("/products", product);
  return response.data;
};

export const deleteProduct = async (product: Product) => {
  const response = await axios.delete<Product>("/products/" + product.id);
  return response.data;
};
