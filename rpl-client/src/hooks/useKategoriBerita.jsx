import { useEffect, useState } from "react";
import { getKategoriBerita } from "../api/services/BeritaService";

export default function useKategoriBerita() {
  const [kategoriBerita, setKategoriBerita] = useState([]);
  const [loadingKategori, setLoadingKategori] = useState(true);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await getKategoriBerita();
        setKategoriBerita(res.data);
      } catch (err) {
        console.error("Error fetch kategori:", err);
      } finally {
        setLoadingKategori(false);
      }
    };

    fetchKategori();
  }, []);

  return { kategoriBerita, loadingKategori };
}
