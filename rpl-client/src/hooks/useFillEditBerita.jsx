import { useState, useEffect } from "react";
import { getBeritaById } from "../api/services/BeritaService";

const useFillEditBerita = (id, formik, setImagePreview) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchBerita = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setEditing(true);

        const resBerita = await getBeritaById(id);
        if (resBerita?.data) {
          const dataBerita = resBerita.data;
          formik.setFieldValue("judul", dataBerita.judul);
          formik.setFieldValue("kategori_id", dataBerita.kategori_id);
          formik.setFieldValue("isi", dataBerita.isi);

          if (dataBerita.gambar && dataBerita.gambar_url) {
            setImagePreview(dataBerita.gambar_url);
          }
        }
      } catch (error) {
        console.error("Error fetching berita:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  return { loading, editing };
};

export default useFillEditBerita;
