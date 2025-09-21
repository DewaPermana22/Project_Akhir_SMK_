import axiosInstance from "../AxiosInstance";


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

export const CreatePengumuman = async (data) => {
  try {
    const res = await axiosInstance.post('/pengumuman', data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in service when create Pengumuman:", error);
    throw error;
  }
}

export const fetchDetailPengumuman = async (id) => {
  try {
    const res = await axiosInstance.get(`/pengumuman/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error in service when call Detail :", error);
    throw error;
  }
}