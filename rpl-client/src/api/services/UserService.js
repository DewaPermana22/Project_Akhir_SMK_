import { axiosInstance } from "../AxiosInstance";

export const getUserById = async (userId) => {
  try {
    const res = await axiosInstance.get(`/users/detail/${userId}`);
    return res.data.user;
  } catch (error) {
    console.error("error mengambil detail user", error.response?.data);
    throw error;
  }
};