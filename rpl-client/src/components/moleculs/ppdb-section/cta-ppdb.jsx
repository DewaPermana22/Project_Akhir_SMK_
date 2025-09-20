import React from "react";
import { Link } from "react-router";
const CtaPPDB = () => {
  return (
    <>
      <h4 className="text-lg md:text-xl font-eudo-bold text-slate-800 mb-1">Siap Bergabung?</h4>
      <p className="text-sm text-slate-600 mb-6">
        Persiapkan dokumen-dokumen yang diperlukan dan pantau terus informasi
        terbaru mengenai jadwal pendaftaran.{" "}
        <Link to={"https://spmbjatim.net/"} className="underline text-indigo-600">Pelajari Lebih Lanjut</Link>
      </p>
    </>
  );
};

export default CtaPPDB;
