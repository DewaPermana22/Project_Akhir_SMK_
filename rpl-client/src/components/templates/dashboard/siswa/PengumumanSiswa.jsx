import HeaderDashboardPages from "@/components/atoms/header-dashboard-pages";
import CategorySidebar from "@/components/moleculs/pengumuman/sidebar-kategori";
import { DummyDataPengumuman } from "@/constants/dumy-data-pengumuman";
import { kategoriPengumuman } from "@/constants/kategori-pengumuman";
import WrapperLayout from "../WrapperLayout";
import { useMemo, useState } from "react";
import AnnouncementItem from "@/components/moleculs/pengumuman/item-pengumuman";
import usePengumuman from "@/hooks/usePengumuman";
import { Bell } from "lucide-react";

const PengumumanSiswa = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {kategoriPengumuman, Pengumuman, LoadingKategori} = usePengumuman();

  const pengumuman = DummyDataPengumuman;
  // const categories = useMemo(() => kategoriPengumuman(pengumuman), [pengumuman]);
 

  // Filter pengumuman
  // const Pengumuman = useMemo(() => 
  //   pengumuman
  //     .filter(p => selectedCategory === 'all' || p.kategori === selectedCategory)
  //     .filter(p => 
  //       p.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //       p.konten.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       p.guru.toLowerCase().includes(searchTerm.toLowerCase())
  //     ),
  //   [pengumuman, selectedCategory, ]
  // );

  return (
    <WrapperLayout>
      <div className='gap-7 flex-col flex'>
        <HeaderDashboardPages 
          descriptionText={"Lihat pengumuman terbaru dari sekolah"} 
          mainHeader={"Pengumuman"}
        />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <CategorySidebar
            loading={LoadingKategori}
            categories={kategoriPengumuman}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Main Content */}
          <div className="flex-1">
            
            <div className="space-y-4">
              {Pengumuman.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <span className="text-7xl">🏖️</span>
                  <h3 className="text-lg font-eudo-bold text-gray-700 mt-2">Santai Aja Dulu</h3>
                  <p className="text-indigo-600 text-sm">Belum ada Pengumuman untuk saat ini!</p>
                </div>
              ) : (
                Pengumuman.map((item) => (
                  <AnnouncementItem key={item.id} item={item} />
                ))
              )}
            </div>

            {/* Load More Button */}
            {Pengumuman.length > 10 && (
              <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-[var(--blue)] text-white border border-gray-300 rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors">
                  Muat Lebih Banyak
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
};

export default PengumumanSiswa;