import React from "react";
import { User, BookOpen, Calendar } from "lucide-react";
import { formatDate } from "@/app/utils/formater-date";
import { categoryColors } from "@/constants/kategori-pengumuman";



const AnnouncementItem = React.memo(({ item }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all">
      <div className="p-6">
        <div className="flex items-start flex-1">
          <div className="flex-1">
            <h3 className="text-lg mb-2 font-eudo-bold text-gray-600">
              {item.judul}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs ${
                categoryColors[item.kategori]
              }`}
            >
              {item.kategori.charAt(0).toUpperCase() + item.kategori.slice(1)}
            </span>

            <p className="text-gray-600 mt-4 leading-relaxed mb-4 line-clamp-3">
              {item.konten}
            </p>

            <div className="flex mb-4 items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{item.guru}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{item.mata_pelajaran}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm flex items-center text-gray-500">
            <Calendar className="w-4 h-4 inline mr-1" />
            {formatDate(item.tanggal)} • {item.waktu} WIB
          </div>

          <button className="px-4 py-2 bg-[var(--blue)] text-white hover:bg-indigo-700 cursor-pointer rounded-md text-sm transition-colors">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
});

AnnouncementItem.displayName = "AnnouncementItem";

export default AnnouncementItem;
