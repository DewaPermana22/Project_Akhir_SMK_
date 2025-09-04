import { useState, useEffect } from "react";
import InputData from "../atoms/InputData";
import SelectDropdown from "../atoms/SelectDropdown";
import { X, ImageUpIcon } from "lucide-react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useImageUpload from "../../hooks/useImageUpload";
import useKategoriBerita from "../../hooks/useKategoriBerita";
import useFormikUploadBerita from "../../hooks/useFormikUploadBerita";
import useFillEditBerita from "../../hooks/useFillEditBerita";

const BodyUploadBerita = forwardRef(({ onFormChange }, ref) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formik = useFormikUploadBerita(onFormChange, isEditing, id);
  const {
    imagePreview,
    selectedFile,
    isDragActive,
    handleFileChange,
    handleDragEnter,
    setImagePreview,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeImage,
  } = useImageUpload({
    onFileSelect: (file) => formik.setFieldValue("gambar", file),
  });
  const { kategoriBerita } = useKategoriBerita();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loading, editing: editingMode } = useFillEditBerita(
    id,
    formik,
    setImagePreview
  );

  useEffect(() => {
    if (editingMode) {
      setIsEditing(true);
    }
  }, [editingMode]);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      await formik.submitForm();
      return formik.isValid && Object.keys(formik.errors).length === 0;
    },
    resetForm: () => {
      formik.resetForm();
      removeImage();
    },
    getFormState: () => ({
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
      gambar: selectedFile,
    }),
  }));

  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        values: formik.values,
        errors: formik.errors,
        touched: formik.touched,
        isValid: formik.isValid,
        gambar: selectedFile,
      });
    }
  }, [
    formik.values,
    formik.errors,
    formik.touched,
    formik.isValid,
    selectedFile,
  ]);

  return (
    <div className="space-y-3 mt-5">
      <div className="space-y-2">
        <label
          htmlFor="gambar"
          className="block text-sm font-medium text-gray-700"
        >
          Gambar Berita
        </label>
        <div
          className={`relative bg-white border rounded-lg p-6 transition-colors duration-200 ${
            isDragActive
              ? "border-[var(--violet)] bg-purple-50"
              : "border-gray-300"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!imagePreview ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <ImageUpIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Drag & drop gambar di sini, atau{" "}
                <label className="text-violet-500 cursor-pointer hover:underline">
                  pilih file
                  <input
                    name="gambar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-400">
                Format yang didukung: JPG, PNG, GIF (Max: 5MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                loading="lazy"
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="mt-2 text-sm text-gray-600 text-center">
                {selectedFile?.name} (
                {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {loading && editingMode ? (
            <>
              <label className="text-sm text-gray-700">Judul Berita</label>
              <Skeleton height={40} className="rounded-md" />
            </>
          ) : (
            <>
              <InputData
                label="Judul Berita"
                placeholder="Masukkan judul berita"
                type="text"
                name="judul"
                value={formik.values.judul}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.judul && formik.errors.judul && (
                <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                  {formik.errors.judul}
                </p>
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Kategori Berita
          </label>
          {loading && editingMode ? (
            <Skeleton className="rounded-xl p-3" />
          ) : (
            <>
              <SelectDropdown
                placeholder="Pilih kategori Berita"
                className="rounded-xl lg:relative static top-0"
                name="kategori_id"
                options={kategoriBerita.map((item) => ({
                  id: item.id,
                  label: item.kategori,
                }))}
                size="w-full"
                selectedValue={formik.values.kategori_id}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                isOpen={isDropdownOpen}
                onSelect={(val) => {
                  formik.setFieldValue("kategori_id", val);
                  setIsDropdownOpen(false);
                }}
              />
              {formik.touched.kategori_id && formik.errors.kategori_id && (
                <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                  {formik.errors.kategori_id}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konten Berita
        </label>
        {loading && editingMode ? (
          <Skeleton className="h-32 rounded-lg" />
        ) : (
          <>
            <textarea
              name="isi"
              value={formik.values.isi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tulis konten berita di sini..."
              rows={8}
              className="w-full px-3 max-h-32 py-2 border border-gray-200 bg-white rounded-lg focus:outline-none resize-none"
            />
            {formik.touched.isi && formik.errors.isi && (
              <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                {formik.errors.isi}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default BodyUploadBerita;
