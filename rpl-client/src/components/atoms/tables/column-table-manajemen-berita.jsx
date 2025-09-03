import { PencilLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModalConfirmDelete } from "../../../features/modals/ConfirmDeleteModal";
import { Link } from "react-router";

export const ColumnTableManajemenBerita = (options = {}) => {
  const dispatch = useDispatch();
  return [
    {
      key: "judul",
      header: "Judul Berita",
      headerClassName: "text-left",
      width: "40%",
      minWidth: "300px",
      render: (row, rowIndex) => (
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 h-10 w-10 bg-[var(--lime)] rounded-lg flex items-center justify-center">
            <PencilLine size={20} className="text-[var(--indigo-dark)]" />
          </div>
          <div className="ml-4 min-w-0 flex-1">
            <div className="text-sm font-bold text-[var(--violet)] truncate">
              {row.judul}
            </div>
            <div className="text-xs text-gray-500 truncate">
              Oleh: {row.author || row.judul}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "kategori",
      header: "Kategori",
      width: "15%",
      minWidth: "100px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (row) => (
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100 whitespace-nowrap">
            {row.kategori}
          </span>
        </div>
      ),
    },
    {
      key: "created_at",
      header: "Tanggal Dibuat",
      width: "20%",
      minWidth: "120px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (row) => (
        <div className="text-sm text-gray-900 whitespace-nowrap">
          {new Date(row.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      width: "15%",
      minWidth: "50px",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (row) => (
        <div className="flex gap-2 justify-center items-center">
          <Link
          to={`update/${row.id}`}
            className="inline-flex cursor-pointer items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200"
            title="Edit berita"
          >
            Edit
          </Link>
          <button
            className="inline-flex cursor-pointer items-center px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 transition-colors duration-200"
            title="Hapus berita"
            onClick={() =>
              dispatch(
                openModalConfirmDelete({
                  title: "Hapus Berita",
                  message: `Apakah Anda yakin ingin menghapus berita "${row.judul}"?`,
                  data: row.id,
                })
              )
            }
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];
};
