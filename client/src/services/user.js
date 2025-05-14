import { axiosInstance } from "./axios";

export const register = async (payload) => {
  const response = await axiosInstance.post("/user/register", payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await axiosInstance.post("/user/login", payload);
  return response.data;
};

export const getProfileDetails = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/logout");
  return response.data;
};

export const whoAmI = async () => {
  const response = await axiosInstance.get("/who-am-i");
  return response.data;
};
