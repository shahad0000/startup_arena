import apiClient from "./apiClient";

const API = import.meta.env.VITE_API_URL;

export const scheduleMeeting = async (data) => {
  const res = await apiClient.post(`${API}/zoom/create-meeting`, data);
  return res.data;
};

export const zoomRecordings = async () => {
  const res = await apiClient.get(`${API}/zoom/recordings`);
  return res.data;
};
