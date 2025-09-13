import { ChevronRight, GraduationCapIcon, User, Users } from "lucide-react";
import React from "react";

const CardKelas = ({
  namaKelas = "12 RPL 1",
  jumlahSiswa = 32,
  waliKelas = "Agus Sugihartono, S.E",
  onDetail = () => console.log("Detail clicked"),
}) => {
  return (
    <div className="bg-white rounded-xl xl:max-w-sm w-full shadow-xs transition-all duration-300 p-5 border border-indigo-100 hover:border-indigo-200 transform ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-eudo-bold text-lg text-shadow-indigo-600">
              <GraduationCapIcon size={25}/>
            </span>
          </div>
          <div>
            <h3 className=" font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
              {namaKelas}
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-1"></div>
          </div>
        </div>

        
      </div>

     
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Siswa</p>
            <p className="text-sm font-semibold text-gray-700">
              {jumlahSiswa} Siswa
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-600">Wali Kelas</p>
            <p className="text-sm font-semibold text-gray-700 truncate">
              {waliKelas}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onDetail}
        className="w-full bg-[var(--blue)] text-white py-3 px-4 rounded-md transition-all duration-300 hover:bg-indigo-700 cursor-pointer flex items-center justify-center space-x-2 group"
      >
        <span className="text-sm">Lihat Detail</span>
        <ChevronRight className="w-5 h-5 duration-200" />
      </button>
    </div>
  );
};

export default CardKelas;
