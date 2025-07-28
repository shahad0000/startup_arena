import apiClient from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllUsers = async () => {
  const response = await apiClient.get(`${API_URL}/api/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(
    `${API_URL}/users/${id}`
  );
  return response.data;
};