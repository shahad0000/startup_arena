import axios from "axios";

const BASE_URL = "http://localhost:3000/api/zoom";

export const scheduleMeeting = async (data) => {
  const response = await axios.post(`${BASE_URL}/create-meeting`, data, {
    withCredentials: true,
  });
  return response.data;
};
