import React, { useRef, useState } from "react";
import WrapperLayout from "../../WrapperLayout";
import HeaderDashboardPages from "@/components/atoms/header-dashboard-pages";
import ActionButton from "@/components/atoms/button/action-button";
// import BodyUploadPengumuman from "@/components/moleculs/uploader/BodyUploadPengumuman";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import BodyUploadPengumuman from "@/components/moleculs/uploader/BodyBuatPengumuman";

const BuatPengumuman = () => {
  const showToast = () => toast.success("Pengumuman berhasil dibuat!");
  const { id } = useParams();
  const formRef = useRef();
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (formRef.current) {
      setIsSubmitting(true);
      try {
        const success = await formRef.current.submitForm();

        if (success) {
          showToast();
          formRef.current.resetForm();
        } else {
          if (formState.errors) {
            const errorMessages = Object.values(formState.errors).join(", ");
            toast.error(`Mohon lengkapi form dengan benar: ${errorMessages}`);
          } else {
            toast.error("Mohon lengkapi form dengan benar");
          }
        }
      } catch (error) {
        console.error("Error submit:", error);
        toast.error("Terjadi kesalahan saat mengirim form");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const canSubmit = formState.isValid && !isSubmitting;

  return (
    <WrapperLayout>
      <div className="flex flex-col gap-7">
        <div className="flex-col flex lg:space-y-0 space-y-5 lg:flex-row items-center justify-between">
          <HeaderDashboardPages
            mainHeader={id ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
            descriptionText={
              id
                ? "Ubah informasi pengumuman dengan mengedit pengumuman ini."
                : "Buat pengumuman untuk kelas yang anda ajar"
            }
          />
          <ActionButton
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            handleSubmit={handleSubmit}
            className={"hidden lg:flex p-2 lg:p-0"}
            label={id ? "Edit Pengumuman" : "Buat Pengumuman"}
          />
        </div>
        <BodyUploadPengumuman onFormChange={setFormState} ref={formRef} />
        <Toaster position="top-right" />
      </div>
      <ActionButton
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        className="lg:hidden flex p-2 lg:p-0 mt-4"
        label={id ? "Edit Pengumuman" : "Buat Pengumuman"}
      />
    </WrapperLayout>
  );
};

export default BuatPengumuman;