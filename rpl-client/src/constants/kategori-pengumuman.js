export const categoryColors = {
  akademik: "bg-blue-100 text-blue-800",
  tugas: "bg-purple-100 text-purple-800",
  kegiatan: "bg-orange-100 text-orange-800",
  informasi: "bg-gray-100 text-gray-800",
};

export const kategoriPengumuman = (pengumuman) => [
  { value: "all", label: "Semua", icon: "Bell", count: pengumuman.length },
  {
    value: "akademik",
    label: "Akademik",
    icon: "BookOpen",
    count: pengumuman.filter((p) => p.kategori === "akademik").length,
  },
  {
    value: "tugas",
    label: "Tugas",
    icon: "CheckCircle",
    count: pengumuman.filter((p) => p.kategori === "tugas").length,
  },
  {
    value: "kegiatan",
    label: "Kegiatan",
    icon: "Calendar",
    count: pengumuman.filter((p) => p.kategori === "kegiatan").length,
  },
  {
    value: "informasi",
    label: "Informasi",
    icon: "AlertCircle",
    count: pengumuman.filter((p) => p.kategori === "informasi").length,
  },
];
