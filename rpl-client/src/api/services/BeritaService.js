import axios from "axios";
import { axiosInstance } from "../axiosInstance";

export const getKategoriBerita = async () => {
  try {
    const res = await axiosInstance.get("/kategori-berita");
    return res.data;
  } catch (error) {
    console.error("Error Get Kategori Berita:", error.response?.data);
    throw error;
  }
};

export const uploadBerita = async (data) => {
  try {
    const res = await axiosInstance.post("/news", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error Saat Mengunggah Berita", error.response?.data);
    throw error;
  }
};

export const getMyBerita = async (
  pages = 1,
  per_pages = 5,
  query_search = ""
) => {
  try {
    const params = new URLSearchParams({
      page: pages,
      per_page: per_pages,
      ...(query_search && { search: query_search }),
    });

    const res = await axiosInstance.get(`/news/my-news?${params}`);
    return res.data;
  } catch (error) {
    console.error("error mengambil berita saya", error.response?.data);
    throw error;
  }
};

export const deleteBerita = async (id) => {
  try {
    const res = await axiosInstance.delete(`/news/delete/${id}`);
    return res;
  } catch (error) {
    console.error("error menghapus berita", error.response?.data);
    throw error;
  }
};