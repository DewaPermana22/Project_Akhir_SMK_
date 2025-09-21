import { fetchDetailPengumuman } from '@/api/services/PengumumanServices';
import { useState, useEffect } from 'react';

const useFillEditPengumuman = (id, formik) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPengumuman = async () => {
      if (!id) {
        setEditing(false);
        return;
      }

      try {
        setLoading(true);
        setEditing(true);
        const response = await fetchDetailPengumuman(id);
        
        if (response.data.success) {
          const pengumuman = response.data.data;
          
          // Ambil data kelas yang terkait dengan pengumuman
          const kelasResponse = await api.get(`/pengumuman/${id}/kelas`);
          const kelasIds = kelasResponse.data.data.map(kelas => kelas.id.toString());
          
          formik.setValues({
            judul_pengumuman: pengumuman.judul_pengumuman || '',
            kategori_id: pengumuman.kategori_id?.toString() || '',
            isi_pengumuman: pengumuman.isi_pengumuman || '',
            kelas_id: kelasIds,
          });
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat memuat data pengumuman');
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, [id, formik]);

  return { loading, editing, error };
};

export default useFillEditPengumuman;