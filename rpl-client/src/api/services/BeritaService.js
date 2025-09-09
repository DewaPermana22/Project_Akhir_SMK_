import { axiosInstance } from "../AxiosInstance";

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
    return res.data.message;
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

export const updateBerita = async (id, data) => {
  try {
    const res = axiosInstance.post(`/news/edit/${id}`, data,{
      headers :{
         "Content-Type": "multipart/form-data",
      }
    });
    return res.data;
  } catch (error) {
    console.error(error)
  }
};

export const getBeritaById = async (id) => {
  try {
    const res = await axiosInstance.get(`/news/detail/${id}`);
    return res.data.message;
  } catch (error) {
    console.error(error)
  }
}

export const getBeritaTerbaru = async () => {
  try {
    const res = await axiosInstance.get("/news/latest");
    return res.data.message;
  } catch (error) {
    console.error(error)
  }
}

export const hasLikedBerita = async (news_id, token_berita) => {
  try {
    const res = await axiosInstance.post(`/news/${news_id}/has-liked`, {
      like_token: token_berita
    });
    return res.data;
  } catch (error) {
    console.error("Error checking like status:", error.response?.data);
    throw error;
  }
}

export const likeBerita = async (news_id, token_berita) => {
  try {
    const res = await axiosInstance.post(`/like-post/${news_id}`, {
      like_token: token_berita
    });
    return res.data;
  } catch (error) {
    console.error("Error liking berita:", error.response?.data);
    throw error;
  }
}