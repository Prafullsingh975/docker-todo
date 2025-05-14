import { axiosInstance } from "./axios";

export const createTodo = async (payload) => {
  const response = await axiosInstance.post("/todos/create", payload);
  return response.data;
};

export const updateTodo = async (payload, id) => {
  const response = await axiosInstance.put(`/todos/update/${id}`, payload);
  return response.data;
};

export const toggleTodoStatus = async (id) => {
  const response = await axiosInstance.patch(`/todos/toggle-status/${id}`);
  return response.data;
};

export const getTodos = async () => {
  const response = await axiosInstance.get("/todos/all");
  return response.data;
};
