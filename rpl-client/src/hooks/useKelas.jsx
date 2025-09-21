import { fetchKelasYangDiajar } from "@/api/services/KelasServices";
import { useState, useEffect } from "react";

const useKelas = () => {
  const [kelas, setKelas] = useState([]); // Data Kelas yang di ajar oleh guru
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        setLoading(true);
        const response = await fetchKelasYangDiajar();
        if (response.success) {
            setKelas(response.data);
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat memuat data kelas");
      } finally {
        setLoading(false);
      }
    };

    fetchKelas();
  }, []);

  return { kelas, loading, error };
};

export default useKelas;
