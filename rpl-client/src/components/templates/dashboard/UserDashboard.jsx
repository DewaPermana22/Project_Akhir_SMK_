import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { getTodayDate } from "../../../app/utils/get-today";
import CardDashboard from "../../moleculs/CardDashboard";
import QuickAccessCards from "../../moleculs/QuickAcsessCard";

const UserDashboard = () => {
  const quickAccess = [
    {
      id: "kalender",
      title: "Kalender Akademik",
      icon: "Calendar",
      content: "Konten Kalender Akademik",
    },
    {
      id: "jadwal",
      title: "Jadwal Pelajaran",
      icon: "Clock",
      content: "Konten Jadwal Mata Pelajaran",
    },
    {
      id: "absensi",
      title: "Rekap Absensi",
      icon: "UserCheck",
      content: "Konten Rekap Absensi",
    },
    {
      id: "jurnal",
      title: "Jurnal Kelas",
      icon: "BookOpen",
      content: "Konten Jurnal Kelas",
    },
  ];

  const mainCard = [
    { id: "absensi", title: "Penugasan", icon: "Highlighter", data: 20 },
    {
      id: "jurnal",
      title: "Ujian / Penilaian Harian",
      icon: "FilePen",
      data: 20,
    },
    {
      id: "rata-rata-nilai",
      title: "Rata-Rata Nilai",
      icon: "FileBadge",
      data: 20,
    },
  ];

  const componentsMap = {
    kalender: React.lazy(() =>
      import("../../templates/quickaccess/kalender-akademik")
    ),
    jadwal: React.lazy(() =>
      import("../../templates/quickaccess/jadwal-pelajaran")
    ),
    absensi: React.lazy(() =>
      import("../../templates/quickaccess/rekap-absensi-siswa")
    ),
    jurnal: React.lazy(() =>
      import("../../templates/quickaccess/jurnal-kelas")
    ),
  };
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-around gap-2 xl:gap-5">
        <div className="flex xl:hidden justify-between p-4">
          <h1 className="text-xl font-eudo-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--indigo-dark)] bg-[rgba(201,250,117,0.95)] px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
              {user.role}
            </span>{" "}
            /
            <span className="text-xs text-[var(--indigo-dark)] bg-[rgba(201,250,117,0.95)] px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
              {getTodayDate()}
            </span>
          </div>
        </div>
        {mainCard.map((card) => (
          <CardDashboard
            key={card.id}
            judulCard={card.title}
            namaIcons={card.icon}
            data={card.data}
          />
        ))}
      </div>

      <h1 className="text-lg font-eudo-bold mt-10">Akses Cepat</h1>
      <div className="flex gap-3">
        <QuickAccessCards
          menuItems={quickAccess}
          renderContent={(activeId) => {
            if (!activeId) return null;
            const Component = componentsMap[activeId];
            return Component ? (
              <Suspense fallback={<p>Loading...</p>}>
                <Component />
              </Suspense>
            ) : null;
          }}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
