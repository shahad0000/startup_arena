import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const scheduleMeeting = async (data) => {
  const response = await axios.post(`${API}/zoom/create-meeting`, data, {
    withCredentials: true,
  });
  return response.data;
};
