import { useState, useEffect, useCallback } from "react";
import InputData from "../../atoms/InputData";
import SelectDropdown from "../../atoms/SelectDropdown";
import MultiSelectDropdown from "../../atoms/MultiSelectDropdown";
import { X } from "lucide-react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useParams } from "react-router";
import { Skeleton } from "../../ui/skeleton";
import useKelas from "@/hooks/useKelas";
import useFormikUploadPengumuman from "@/hooks/useFormikUploadPengumuman";
import useFillEditPengumuman from "@/hooks/useFillEditPengumuman";
import TiptapEditor from "../editor-richtext-editor/TipTapEditor";
import usePengumuman from "@/hooks/usePengumuman";

const BodyUploadPengumuman = forwardRef(({ onFormChange }, ref) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formik = useFormikUploadPengumuman(onFormChange, isEditing, id);
  const { arrayKategoriPengumuman } = usePengumuman();
  const { kelas, loading: loadingKelas } = useKelas();
  const [isKategoriDropdownOpen, setIsKategoriDropdownOpen] = useState(false);
  const [isKelasDropdownOpen, setIsKelasDropdownOpen] = useState(false);
  const { loading, editing: editingMode } = useFillEditPengumuman(id, formik);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      await formik.submitForm();
      return formik.isValid && Object.keys(formik.errors).length === 0;
    },
    resetForm: () => {
      formik.resetForm();
    },
    getFormState: () => ({
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
    }),
  }));


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
    },
    getFormState: () => ({
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
    }),
  }));

  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        values: formik.values,
        errors: formik.errors,
        touched: formik.touched,
        isValid: formik.isValid,
      });
    }
  }, [formik.values, formik.errors, formik.touched, formik.isValid]);

  const handleEditorUpdate = useCallback(
    ({ html }) => {
      if (formik.values.isi_pengumuman !== html) {
        setTimeout(() => {
          formik.setFieldValue("isi_pengumuman", html);
        }, 0);
      }
    },
    [formik.values.isi_pengumuman]
  );

  const renderEditorSkeleton = () => (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-3 bg-gray-50 border-b">
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded" />
          ))}
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-64 w-full rounded" />
      </div>
    </div>
  );

  return (
    <div className="space-y-3 mt-0 xl:mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {loading && editingMode ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Judul Pengumuman
              </label>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ) : (
            <>
              <InputData
                label="Judul Pengumuman"
                placeholder="Masukkan judul pengumuman"
                type="text"
                name="judul_pengumuman"
                value={formik.values.judul_pengumuman}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.judul_pengumuman &&
                formik.errors.judul_pengumuman && (
                  <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                    {formik.errors.judul_pengumuman}
                  </p>
                )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Kategori Pengumuman
          </label>
          {loading && editingMode ? (
            <Skeleton className="h-10 w-full rounded-xl" />
          ) : (
            <>
              <SelectDropdown
                placeholder="Pilih kategori Pengumuman"
                className="rounded-xl lg:relative static top-0"
                name="kategori_id"
                options={arrayKategoriPengumuman.map((item) => ({
                  id: item.id,
                  label: item.nama,
                }))}
                size="w-full"
                selectedValue={formik.values.kategori_id}
                onToggle={() =>
                  setIsKategoriDropdownOpen(!isKategoriDropdownOpen)
                }
                isOpen={isKategoriDropdownOpen}
                onSelect={(val) => {
                  formik.setFieldValue("kategori_id", val);
                  setIsKategoriDropdownOpen(false);
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Kelas Tujuan
        </label>
        {loading && editingMode ? (
          <Skeleton className="h-10 w-full rounded-xl" />
        ) : (
          <>
            <MultiSelectDropdown
              placeholder="Pilih kelas tujuan"
              name="kelas_id"
              options={kelas.map((item) => ({
                id: item.id,
                label: item.nama_kelas,
              }))}
              size="w-sm"
              selectedValues={formik.values.kelas_id || []}
              onToggle={() => setIsKelasDropdownOpen(!isKelasDropdownOpen)}
              isOpen={isKelasDropdownOpen}
              onSelect={(values) => {
                formik.setFieldValue("kelas_id", values);
              }}
            />
            {formik.touched.kelas_id && formik.errors.kelas_id && (
              <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                {formik.errors.kelas_id}
              </p>
            )}
          </>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Konten Pengumuman
        </label>
        {loading && editingMode ? (
          renderEditorSkeleton()
        ) : (
          <>
            <TiptapEditor
              key={`editor-${formik.values.id || "new"}`}
              content={formik.values.isi_pengumuman || ""}
              onUpdate={handleEditorUpdate}
              placeholder="Mulai menulis konten pengumuman..."
              className="w-full"
              readOnly={false}
            />
            {formik.touched.isi_pengumuman && formik.errors.isi_pengumuman && (
              <p className="text-xs text-red-500 font-bold pt-1 ml-2">
                {formik.errors.isi_pengumuman}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default BodyUploadPengumuman;
