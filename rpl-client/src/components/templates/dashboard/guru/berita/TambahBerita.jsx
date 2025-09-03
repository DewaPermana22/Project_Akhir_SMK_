import { ArrowBigLeftDash, Loader2Icon, Plug, UploadIcon } from "lucide-react";
import { Link } from "react-router";
import BodyUploadBerita from "../../../../moleculs/BodyUploadBerita";
import { useRef, useState } from "react";

const TambahBerita = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (formRef.current) {
      setIsSubmitting(true);
      try {
        const success = await formRef.current.submitForm();

        if (success) {
          alert("Berita berhasil diunggah!");
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
    <div className="space-y-2">
      <div className="flex-col flex lg:space-y-0 space-y-5 lg:flex-row items-center justify-between">
        <div>
          <h1 className="text-[var(--deep-purple)] text-xl font-eudo-bold">
            Unggah Berita Baru
          </h1>
          <p className="text-[var(--violet)] text-xs lg:text-sm">
            Mulai bagikan informasi terbaru dengan menambahkan berita baru di
            sini.
          </p>
        </div>

        <div className="flex gap-2 p-2 lg:p-0">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            type="submit"
            className={`${
              canSubmit
                ? "bg-[var(--lime)] hover:bg-[var(--lavender)]"
                : "bg-gray-300 cursor-not-allowed"
            } transition-colors duration-300 ease-linear flex gap-2 items-center shadow text-[var(--indigo-dark)] cursor-pointer font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg`}
          >
            {isSubmitting ? (
              <Loader2Icon size={20} className="animate-spin" />
            ) : (
              <UploadIcon size={20} />
            )}
            {isSubmitting ? "mengunggah..." : "Unggah"}
          </button>
          <Link
            to={-1}
            className="bg-red-500 transition-colors duration-300 ease-linear hover:bg-red-600 flex gap-2 items-center shadow cursor-pointer text-white font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg"
          >
            <ArrowBigLeftDash size={20} /> Kembali
          </Link>
        </div>
      </div>
      <main className="overflow-y-scroll h-[calc(100vh-170px)]">
        <BodyUploadBerita onFormChange={setFormState} ref={formRef} />
      </main>
    </div>
  );
};

export default TambahBerita;
