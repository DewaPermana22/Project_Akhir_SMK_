import { GlobeIcon, PencilLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModalConfirmDelete } from "../../../features/modals/ConfirmDeleteModal";
import { Link } from "react-router";

export const ColumnTableManajemenPengumuman = (options = {}, loading) => {
  const dispatch = useDispatch();
  return [
    {
      key: "judul",
      header: "Nama Pengumuman",
      headerClassName: "text-left",
      width: "40%",
      minWidth: "300px",
      render: (row, rowIndex) => (
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 p-2 shadow bg-indigo-100 rounded-md flex items-center justify-center">
            <GlobeIcon
              size={20}
              className="text-indigo-600 text-shadow-indigo-600"
            />
          </div>
          <div className="ml-4 min-w-0 flex-1">
            <div className="text-sm font-bold text-gray-700 truncate">
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
          <span className="px-3 py-1 rounded-full text-xs font-medium text-indigo-600 bg-indigo-200 whitespace-nowrap">
            {row.kategori || "Pengumuman"}
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
            title="Edit pengumuman"
          >
            Edit
          </Link>
          <button
            className="inline-flex cursor-pointer items-center px-3 py-1 text-xs font-medium text-white bg-[var(--red)] rounded-md hover:bg-red-500 shadow transition-colors duration-200"
            title="Hapus pengumuman"
            onClick={() =>
              dispatch(
                openModalConfirmDelete({
                  title: "Hapus Pengumuman",
                  message: `Apakah Anda yakin ingin menghapus pengumuman "${row.judul}"?`,
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