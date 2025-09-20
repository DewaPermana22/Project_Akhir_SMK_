import { axiosInstance } from "../AxiosInstance";

export const fetchKategoriPengumuman = async () => {
  try {
    const res = await axiosInstance.get("/kategori-pengumuman");
    return res.data;
  } catch (error) {
    console.error("Error in service when call KategoriPengumuman");
    throw error;
  }
};

export const fetchPengumuman = async (filters = {}) => {
  try {
    const res = await axiosInstance.get("/pengumuman", {
      params: filters,
    });
    return res.data;
  } catch (error) {
    console.error("Error in service when call Pengumuman:", error);
    throw error;
  }
};
