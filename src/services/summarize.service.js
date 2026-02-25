import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getIdeaSummary = async (id) => {
  try {
    const response = await axios.get(`${API}/ideas/${id}/summary`);
    const summary = response.data.summary;

    if (!summary) {
      throw new Error("No summary found in response");
    }

    return summary;
  } catch (error) {
    console.error("Error in getIdeaSummary:", error);
    console.error("Response data:", error.response?.data);
    throw error;
  }
};
