import axios from "axios";
import { User } from "../models";

export const getUserInfo = async (userId: string) => {
  const response = await axios.get<User>("customers/" + userId);
  return response.data;
};

export const getAdminInfo = async (userId: string) => {
  const response = await axios.get<User>("administrators/" + userId);
  return response.data;
};
