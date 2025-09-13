import React from "react";
import WrapperLayout from "../../WrapperLayout";
import HeaderDashboardPages from "@/components/atoms/header-dashboard-pages";
import CardKelas from "@/components/atoms/card/CardKelas";
import { kelasData } from "@/constants/dummy-data-kelas";
import { useNavigate } from "react-router";

const DaftarKelas = () => {
  const navigate = useNavigate();
  const handleDetail = (kelas) => {
    navigate(`kelas/${kelas}`);
  };
  return (
    <WrapperLayout>
      <div className="gap-7 flex-col flex">
        <HeaderDashboardPages
          mainHeader={"Daftar Kelas Tersedia"}
          descriptionText={"Tambahkan, ubah, atau hapus data siswa di kelas yang anda ajar."}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
          {kelasData.map((kelas) => (
            <CardKelas
              onDetail={() => handleDetail(kelas.namaKelas)}
              key={kelas.id}
              namaKelas={kelas.namaKelas}
              jumlahSiswa={kelas.jumlahSiswa}
              waliKelas={kelas.waliKelas}
            />
          ))}
        </div>
      </div>
    </WrapperLayout>
  );
};

export default DaftarKelas;
