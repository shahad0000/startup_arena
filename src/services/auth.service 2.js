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

export const signUp = async (formData) => {
    const response = await axios.post(
      `http://localhost:3000/api/auth/signup`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        age: Number(formData.age),
        gender: formData.gender,
        country: formData.country,
        city: formData.city,
      },
      { withCredentials: true }
    );
  
    return response.data;
  };
  