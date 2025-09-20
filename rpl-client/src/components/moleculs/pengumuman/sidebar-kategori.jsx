import React from "react";
import {
  Bell,
  BookOpen,
  CheckCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import CategorySkeleton from "@/components/templates/loading/pengumuman/loading-category";

const iconComponents = {
  Bell,
  BookOpen,
  CheckCircle,
  Calendar,
  AlertCircle,
};

const getIconByKategori = (namaKategori) => {
  const iconMap = {
    Akademik: "BookOpen",
    Tugas: "CheckCircle",
    Kegiatan: "Calendar",
    Informasi: "AlertCircle",
    default: "Bell",
  };

  const iconName = iconMap[namaKategori] || iconMap.default;
  return iconComponents[iconName] || Bell;
};

const CategorySidebar = React.memo(
  ({ categories, selectedCategory = "all", onSelectCategory, loading = false }) => {
    
    if (loading) {
      return (
        <div className="w-full lg:w-72">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-2">
            <h2 className="text-lg text-gray-600 mb-4">Kategori</h2>
            <CategorySkeleton />
          </div>
        </div>
      );
    }

    if (!categories || !Array.isArray(categories)) {
      return (
        <div className="w-full lg:w-72">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg text-gray-600 mb-4">Kategori</h2>
            <p className="text-gray-500 text-sm">Tidak ada kategori</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full lg:w-72">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-2">
          <h2 className="text-lg text-gray-600 mb-4">Kategori</h2>
          <div className="space-y-2">

            {categories.map((category) => {
              const IconComponent = getIconByKategori(category.nama);

              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200"
                      : "text-gray-700 hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{category.nama}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.count ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

CategorySidebar.displayName = "CategorySidebar";

export default CategorySidebar;