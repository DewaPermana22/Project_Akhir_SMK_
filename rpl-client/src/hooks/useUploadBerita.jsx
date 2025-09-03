import { useState, useEffect } from 'react';
import { getBeritaById, getKategoriBerita } from '../api/services/BeritaService';

export const useBeritaData = (id) => {
  const [kategoriBerita, setKategoriBerita] = useState([]);
  const [beritaData, setBeritaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const kategoriResponse = await getKategoriBerita();
        if (kategoriResponse?.data) {
          setKategoriBerita(kategoriResponse.data);
        }

        if (id) {
          const beritaResponse = await getBeritaById(id);
          if (beritaResponse?.data) {
            setBeritaData(beritaResponse.data);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { kategoriBerita, beritaData, isLoading, error };
};