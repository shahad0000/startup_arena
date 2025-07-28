import apiClient from "./apiClient";

const API = import.meta.env.VITE_API_URL;

export const signIn = async (email, password) => {
  const response = await apiClient.post(
    `${API}/auth/signin`,
    { email, password }
  );
  const data = response.data;
  if (data?.data) {
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
  }
  return data;
};

export const signUp = async (formData) => {
  const response = await apiClient.post(
    `${API}/auth/signup`,
    {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      age: Number(formData.age),
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
    }
  );
  const data = response.data;
  if (data?.data) {
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
  }
  return data;
};

export const getCurrentUser = async () => {
  try {
    const res = await apiClient.get(`${API}/users/me`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch current user", err);
    return null;
  }
};

// profilePic
export const updateProfile = async (profilePic) => {
  // console.log(profilePic)
  const response = await apiClient.put(
    `${API}/users/updateProfile`,
    { profilePic }
  );
  console.log(response.data)
  return response.data;
};

export const logOut = async () => {
  try {
      const res = await apiClient.post(
        `${API}/auth/signout`,
        {}
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    console.log(res.data)
  } catch (err) {
    console.error(err)
  }
}