import apiClient from "./apiClient";

const API = import.meta.env.VITE_API_URL;
// const API = "http://localhost:3000/api"

export const fetchAllIdeas = async () => {
    const res = await apiClient.get(`${API}/ideas`);
    return res.data.data; 
  };

export const fetchIdeaById = async (id) => {
  const res = await apiClient.get(`${API}/ideas/${id}`);
  return res.data;
};

export const voteIdea = async (ideaId, value) => {
  const res = await apiClient.post(
    `${API}/ideas/vote/`,
    { ideaId, value },
  );
  return res.data;
};

export const fetchUserVote = async (userId, ideaId) => {
  const res = await apiClient.get(`${API}/ideas/${ideaId}/votes/user/${userId}`);
  return res.data.value; 
};

export const submitIdea = async (ideaData) => {
  const res = await apiClient.post(`${API}/ideas`, ideaData);
  return res.data;
};

export const fetchMyIdeas = async () => {
  const res = await apiClient.get(`${API}/users/myIdeas`);
  return res.data.data;
};

export const fetchIdeaAnalytics = async (ideaId) => {
  const res = await apiClient.get(`${API}/ideas/analytics/${ideaId}`); // //:id
  console.log(res.data)
  return res.data;
};

export const deleteIdea = async (id) => {
  const res = await apiClient.delete(`${API}/ideas/${id}`);
  return res.data;
};