import { NewspaperIcon } from "lucide-react";
import React from "react";

const NewsEmpty = (text) => {
    console.log(text)
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <NewspaperIcon size={64} className="text-blue-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        {text
          ? "Hasil pencarian tidak ditemukan"
          : "Tidak Ada Berita"}
      </h2>
      <p className="text-gray-500">
        {text
          ? `Tidak ada berita yang sesuai dengan "${text.text}"`
          : "Maaf, tidak ada berita yang tersedia saat ini."}
      </p>
    </div>
  );
};

export default NewsEmpty;
