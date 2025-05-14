import axios from "axios";

const baseURL = "http://localhost:2000/api/v1/todo";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
