import React from "react";

const QuickInfoPPDB = () => {
  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      <div className="flex flex-col justify-start">
        <h4 className="font-eudo-bold text-slate-800 py-1 text-sm md:text-base">Kuota Tersedia</h4>
        <p className="text-xl md:text-2xl font-eudo-bold text-indigo-600">72 Siswa</p>
        <p className="text-xs md:text-sm text-slate-600">2 Kelas @ 36 siswa</p>
      </div>

      <div className="flex flex-col justify-start">
        <h4 className="font-eudo-bold text-slate-800 py-1 text-sm md:text-base">Jalur Pendaftaran</h4>
        <p className="text-xl md:text-2xl text-purple-600 font-eudo-bold">4 Jalur</p>
        <p className="text-xs md:text-sm text-slate-600">
          Prestasi, Domisili, Afirmasi, Mutasi
        </p>
      </div>
    </div>
  );
};

export default QuickInfoPPDB;
