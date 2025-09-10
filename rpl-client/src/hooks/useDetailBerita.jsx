import { getBeritaById } from "@/api/services/BeritaService";
import { useEffect, useState } from "react";

const useDetailBerita = (idBerita) => {
  const [loading, setLoading] = useState(false);
  const [detailBerita, setDetailBerita] = useState({});

  const fetchDetailBerita = async () => {
    setLoading(true);
    try {
      const beritaId = Number(idBerita);
      const response = await getBeritaById(beritaId);
      if (response) {
        setDetailBerita(response.data);
      }
    } catch (error) {
      console.error("Error fetching berita detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailBerita();
  }, [idBerita]);

  return { detailBerita, loading };
};

export default useDetailBerita;
