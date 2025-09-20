import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  kegiatanImages,
  prestasiImages,
} from "@/constants/galeri-source-image";
import MobileGrid from "./bento/mobile-grid";
import PrestasiGrid from "./bento/prestasi-grid";
import KegiatanGrid from "./bento/kegiatan-grid";

const TabsGaleri = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Tabs defaultValue="kegiatan" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-100 p-1 rounded-lg z-10">
            <TabsTrigger
              value="kegiatan"
              className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-200 cursor-pointer select-none"
            >
              Kegiatan Sekolah
            </TabsTrigger>
            <TabsTrigger
              value="prestasi"
              className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-200 cursor-pointer select-none"
            >
              Prestasi Siswa
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="kegiatan" className="focus-visible:outline-none">
          {/* Desktop Grid */}
          <div className="hidden md:block">
            <KegiatanGrid />
          </div>
          
          {/* Mobile Grid */}
          <div className="block md:hidden">
            <MobileGrid images={kegiatanImages} />
          </div>
        </TabsContent>

        <TabsContent value="prestasi" className="focus-visible:outline-none">
          {/* Desktop Grid */}
          <div className="hidden md:block">
            <PrestasiGrid />
          </div>
          
          {/* Mobile Grid */}
          <div className="block md:hidden">
            <MobileGrid images={prestasiImages} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsGaleri;
