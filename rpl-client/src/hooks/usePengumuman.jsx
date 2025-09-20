import {
  fetchKategoriPengumuman,
  fetchPengumuman,
} from "@/api/services/PengumumanServices";
import { useState, useEffect, useCallback } from "react";

const usePengumuman = () => {
  const [LoadingKategori, setLoadingKategori] = useState(false);
  const [LoadingPengumuan, setLoadingPengumuman] = useState(false);
  const [errors, setErrors] = useState(false);
  const [kategoriPengumuman, setKategoriPengumuman] = useState([]);
  const [Pengumuman, setPengumuman] = useState([]);
  const [filterKategori, setFilterKategori] = useState({
    kategori_id: "all",
    sort_by: "created_at",
    sort_order: "desc",
    per_page: 10,
  });

  const getPengumuman = useCallback(async (currentFilters) => {
    setLoadingPengumuman(true);
    setErrors(null);
    try {
      const cleanFilters = { ...currentFilters };
      if (cleanFilters.kategori_id === "all") {
        delete cleanFilters.kategori_id;
      }

      const response = await fetchPengumuman(cleanFilters);
      console.log(response);
    } catch (error) {
      setErrors(error.message);
      console.error("Error in get pengumuman", error);
      throw error;
    } finally {
      setLoadingPengumuman(false);
    }
  }, []);

  const getKategoriPengumuman = useCallback(async () => {
    try {
      setLoadingKategori(true);
      setErrors(null);
      const response = await fetchKategoriPengumuman();
      if (response.success) {
        setKategoriPengumuman(response.data);
      }
    } catch (error) {
      setErrors(error.message);
      console.error("Error in get kategori pengumuman", error);
      throw error;
    } finally {
      setLoadingKategori(false);
    }
  }, []);

  const getFormattedKategori = () => {
    if (!kategoriPengumuman.length) return [];

    return [
      {
        value: "all",
        label: "Semua",
        icon: "Bell",
        count: Pengumuman.length,
      },
      ...kategoriPengumuman.map((kategori) => ({
        value: kategori.id.toString(),
        label: kategori.nama_kategori,
        count: Pengumuman.filter((p) => p.kategori?.id === kategori.id).length,
      })),
    ];
  };

  const categoryColors = {
    Akademik: "bg-blue-100 text-blue-800",
    Tugas: "bg-purple-100 text-purple-800",
    Kegiatan: "bg-orange-100 text-orange-800",
    Informasi: "bg-gray-100 text-gray-800",
    default: "bg-gray-100 text-gray-800",
  };

  const getCategoryColor = (kategoriName) => {
    return categoryColors[kategoriName] || categoryColors.default;
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getKategoriPengumuman(), getPengumuman()]);
    };

    loadData();
  }, [getKategoriPengumuman, filterKategori]);

  return {
    kategoriPengumuman: getFormattedKategori(),
    getCategoryColor,
    kategoriPengumuman,
    Pengumuman,
    LoadingKategori,
  };
};

export default usePengumuman;
