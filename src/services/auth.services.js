import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const signIn = async (email, password) => {
  const response = await axios.post(
    `${API}auth/signin`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const signUp = async (email, password, role) => {
  const response = await axios.post(
    `http://localhost:3000/api/auth/signup`,
    { email, password, role },
    { withCredentials: true }
  );
  return response.data;
};
