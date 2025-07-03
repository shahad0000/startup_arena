import axios from "axios";

// const API = import.meta.env.VITE_API_URL;
const API = "http://localhost:3000/api"


export const fetchAllIdeas = async () => {
    const res = await axios.get(`${API}/ideas`);
    return res.data.data; 
  };
  

export const fetchIdeaById = async (id) => {
  const res = await axios.get(`${API}/ideas/${id}`);
  return res.data;
};
