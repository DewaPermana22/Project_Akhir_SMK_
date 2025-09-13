import React from "react";
import { useParams } from "react-router";
import WrapperLayout from "../../WrapperLayout";
import HeaderDashboardPages from "@/components/atoms/header-dashboard-pages";
import { Link } from "react-router";
import { ArrowBigLeftDashIcon } from "lucide-react";

const DaftarSiswaPerKelas = () => {
  const { idkelas } = useParams();
  return (
    <WrapperLayout>
      <div className="flex items-center justify-between">
        <HeaderDashboardPages
          mainHeader={`Data Siswa Kelas ${idkelas}`}
          descriptionText={`Lihat dan kelola data siswa yang terdaftar pada kelas ${idkelas}.`}
        />
        <Link
          to={-1}
          className="bg-[var(--blue)] transition-colors ease-linear hover:bg-indigo-700 flex gap-2 items-center shadow cursor-pointer text-white font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg"
        >
          <ArrowBigLeftDashIcon size={20} /> Kembali
        </Link>
      </div>
    </WrapperLayout>
  );
};

export default DaftarSiswaPerKelas;
