
import { useParams } from "react-router";
import BodyUploadBerita from "../../../../moleculs/BodyUploadBerita";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import WrapperLayout from "../../WrapperLayout";
import ActionButton from "@/components/moleculs/upload-berita/action-button";

const TambahBerita = () => {
  const showToast = () => toast.success("Berita berhasil diunggah!");
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
          alert("Mohon lengkapi form dengan benar");
        }
      } catch (error) {
        console.error("Error submit:", error);
        alert("Terjadi kesalahan saat mengirim form");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("Form ref is undefined");
    }
  };

  const canSubmit = formState.isValid && !isSubmitting;

  return (
    <WrapperLayout>
      <div className="space-y-2">
        <div className="flex-col flex lg:space-y-0 space-y-5 lg:flex-row items-center justify-between">
          <div className="w-full">
            <h1 className="text-gray-600 text-xl font-eudo-bold">
              {id ? "Edit Berita" : "Unggah Berita Baru"}
            </h1>
            <p className="text-indigo-600 text-xs lg:text-sm">
              {id
                ? "Ubah informasi berita dengan mengedit berita ini."
                : "Mulai bagikan informasi terbaru dengan menambahkan berita baru disini."}
            </p>
          </div>

          <ActionButton
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            handleSubmit={handleSubmit}
            className={"hidden lg:flex p-2 lg:p-0"}
          />
        </div>
        <BodyUploadBerita onFormChange={setFormState} ref={formRef} />
        <Toaster />
      </div>
        <ActionButton
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          className="lg:hidden flex p-2 lg:p-0"
        />
    </WrapperLayout>
  );
};

export default TambahBerita;
