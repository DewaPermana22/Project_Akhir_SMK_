import { GlobeIcon, PencilLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModalConfirmDelete } from "../../../features/modals/ConfirmDeleteModal";
import { Link } from "react-router";

export const ColumnTableManajemenBerita = (options = {}, loading) => {
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
          <div className="flex-shrink-0 p-2 shadow bg-[var(--lime)] rounded-md flex items-center justify-center">
            <GlobeIcon size={20} className="text-[var(--indigo-dark)]" />
          </div>
          <div className="ml-4 min-w-0 flex-1">
            <div className="text-sm font-bold text-[var(--indigo-dark)] truncate">
              {row.judul}
            </div>
            <div className="text-xs text-gray-400 truncate">
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
            className="inline-flex cursor-pointer items-center px-4 py-1 text-xs font-medium text-white  bg-[var(--blue)] rounded-md hover:bg-blue-500 shadow transition-colors duration-200"
            title="Edit berita"
          >
            Edit
          </Link>
          <button
            className="inline-flex cursor-pointer items-center px-3 py-1 text-xs font-medium text-white bg-[var(--red)] rounded-md hover:bg-red-500 shadow transition-colors duration-200"
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
