import apiClient from "./apiClient";

const API = import.meta.env.VITE_API_URL;

export const fetchCommentsByIdeaId = async (ideaId) => {
  const res = await apiClient.get(`${API}/comments/idea/${ideaId}`);
  return res.data.data;
};

export const postComment = async (ideaId, text) => {
  const res = await apiClient.post(
    `${API}/comments/idea/${ideaId}`,
    { ideaId, text },
  );
  return res.data.data;
};

export const voteOnComment = async ({ commentId, ideaId, vote, userId }) => {
  const res = await apiClient.post(
    `${API}/comments/vote`,
    {
      commentId,
      ideaId,
      vote,
      userId,
    }
  );

  return res.data;
};

export const reportComment = async (commentId) => {
  const res = await apiClient.post(
    `${API}/comments/report`,
    { commentId },
  );
  return res.data;
};