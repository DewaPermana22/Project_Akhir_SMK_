import { ArrowBigLeftDash, Loader2Icon, UploadIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ActionButton = ({handleSubmit, canSubmit, isSubmitting, className}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        type="submit"
        className={`${
          canSubmit
            ? "bg-[var(--blue)] cursor-pointer text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        } transition-colors duration-300 ease-linear flex gap-2 items-center shadow text-white font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg`}
      >
        {isSubmitting ? (
          <Loader2Icon size={20} className="animate-spin" />
        ) : (
          <UploadIcon size={20} />
        )}
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </button>
      <Link
        to={-1}
        className="bg-red-500 transition-colors duration-300 ease-linear hover:bg-red-600 flex gap-2 items-center shadow cursor-pointer text-white font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg"
      >
        <ArrowBigLeftDash size={20} /> Kembali
      </Link>
    </div>
  );
};

export default ActionButton;
