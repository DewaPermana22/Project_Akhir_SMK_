import { DownloadIcon, FileTextIcon } from "lucide-react";
import React from "react";

const CardMateri = ({judul, mapel}) => {
  return (
    <div className="border flex justify-between items-center w-full border-gray-200 p-5  bg-[var(--white)] rounded-2xl ">
      <div className="flex gap-4">
      <div className="flex mb-4 items-center gap-2 bg-[var(--lime)] w-fit rounded-full p-2">
        <FileTextIcon size={20} className="text-[var(--purple)]" />
      </div>
      <div className="flex flex-col justify-start gap-2">
        <h1 className="font-eudo-bold text-[var(--purple)]">{judul}</h1>
        <p className="text-xs text-gray-400">{mapel}</p>
      </div>
      </div>
      <div className="flex gap-5 justify-end">
        <button className="bg-green-500 p-2 cursor-pointer hover:bg-green-600 transition-colors ease-linear duration-200 rounded-sm text-sm text-white">Buka Materi</button>
        <button className="bg-blue-500 p-2 cursor-pointer rounded-sm hover:bg-blue-600 transition-colors ease-linear duration-200 text-sm text-white">
          <DownloadIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardMateri;
