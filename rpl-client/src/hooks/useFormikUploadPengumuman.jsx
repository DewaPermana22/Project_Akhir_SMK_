import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreatePengumuman } from '@/api/services/PengumumanServices';

const useFormikUploadPengumuman = (onFormChange, isEditing, id) => {
  const initialValues = {
    judul_pengumuman: '',
    kategori_id: '',
    isi_pengumuman: '',
    kelas_id: [],
  };

  const validationSchema = Yup.object({
    judul_pengumuman: Yup.string()
      .required('Judul pengumuman harus diisi')
      .max(255, 'Judul pengumuman maksimal 255 karakter'),
    kategori_id: Yup.string()
      .required('Kategori pengumuman harus dipilih'),
    isi_pengumuman: Yup.string()
      .required('Konten pengumuman harus diisi')
      .min(10, 'Konten pengumuman minimal 10 karakter'),
    kelas_id: Yup.array()
      .min(1, 'Minimal pilih satu kelas tujuan')
      .required('Kelas tujuan harus dipilih'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let response;
      
      if (isEditing && id) {
        response = await api.put(`/pengumuman/${id}`, values);
      } else {
        response = await CreatePengumuman(values);
      }

      if (response.data.success) {
        if (!isEditing) {
          resetForm();
        }
        return true;
      } else {
        throw new Error(response.data.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error submitting pengumuman:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return formik;
};

export default useFormikUploadPengumuman;