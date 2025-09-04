import { useFormik } from "formik";
import * as Yup from "yup";
import { updateBerita, uploadBerita } from "../api/services/BeritaService";

export default function useFormikUploadBerita(
  onFormChange,
  editing = false,
  id = null
) {
  const formik = useFormik({
    initialValues: {
      judul: "",
      kategori_id: "",
      isi: "",
      gambar: null,
    },
    validationSchema: Yup.object({
      judul: Yup.string()
        .required("Judul Berita Wajib Diisi")
        .min(5, "Minimal 5 karakter"),
      kategori_id: Yup.string().required("Kategori Wajib dipilih"),
      isi: Yup.string()
        .required("Konten Berita Wajib diisi")
        .min(20, "Minimal 20 karakter"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("judul", values.judul);
        formData.append("kategori_id", values.kategori_id);
        formData.append("isi", values.isi);

        if (values.gambar) {
          formData.append("gambar", values.gambar);
        }

        if (editing && id) {
          await updateBerita(id, formData);
        } else {
          await uploadBerita(formData);
        }
      } catch (error) {
        console.error("Error Upload/Update Berita:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
}
