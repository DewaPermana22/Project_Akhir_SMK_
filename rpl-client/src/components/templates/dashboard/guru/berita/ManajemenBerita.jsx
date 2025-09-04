import EmptyStateTable from "../../../../atoms/EmptyStateTable";
import Table from "../../../../moleculs/Table";
import { ColumnTableManajemenBerita } from "../../../../atoms/tables/column-table-manajemen-berita";
import {
  PlusCircleIcon,
  RotateCw,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
} from "lucide-react";
import { Link } from "react-router";
import useBeritaSaya from "../../../../../hooks/useBeritaSaya";
import SelectDropdown from "../../../../atoms/SelectDropdown";
import SearchInput from "../../../../atoms/SearchInput";
import ConfirmationDeleteModal from "../../../../moleculs/ConfDeleteModal";
import { deleteBerita } from "../../../../../api/services/BeritaService";

const ManajemenBerita = () => {
  const {
    berita,
    pagination,
    loading,
    error,
    searchTerm,
    handleSearchChange,
    handlePageChange,
    handlePerPageSelect,
    refreshData,
    toggleDropdwon,
    setToggleDropdwon,
  } = useBeritaSaya();

  const ManajemenBeritaCols = ColumnTableManajemenBerita({
    onRefresh: refreshData,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[var(--deep-purple)] text-xl font-eudo-bold">
              Kelola Data Berita
            </h1>
            <p className="text-[var(--violet)] text-sm">
              Sistem terpusat untuk mengelola konten berita dengan cepat dan
              terstruktur.
            </p>
          </div>

          <Link
            to="tambah"
            className="bg-[var(--lime)] flex gap-2 items-center shadow cursor-pointer text-[var(--indigo-dark)] font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg"
          >
            <PlusCircleIcon size={20} /> Tambah
          </Link>
        </div>

        <div className="flex w-full flex-col sm:flex-row gap-4 max-w-2xl items-start sm:items-center">
          <SearchInput
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onClear={refreshData}
            placeholder="Cari berita..."
          />

          <SelectDropdown
            isOpen={toggleDropdwon}
            onToggle={() => setToggleDropdwon(!toggleDropdwon)}
            options={[
              { id: 5, label: "5 per halaman" },
              { id: 10, label: "10 per halaman" },
              { id: 20, label: "20 per halaman" },
              { id: 50, label: "50 per halaman" },
            ]}
            selectedValue={pagination.perPage}
            onSelect={handlePerPageSelect}
            placeholder="Items per page"
            size="max-w-[150px]"
          />

          <button
            onClick={refreshData}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            title="Refresh data"
          >
            <RotateCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="w-full rounded-lg shadow-md overflow-hidden">
          
              <div className="overflow-x-auto max-h-[calc(100vh-307px)]">
                <Table
                  loading={loading}
                  data={berita}
                  columns={ManajemenBeritaCols}
                  emptyMessage={<EmptyStateTable />}
                />
              </div>

              {berita.length > 0 && (
                <div className="flex justify-between items-center p-4 border-t bg-[var(--indigo-dark)] border-gray-300">
                  <div className="text-sm text-white">
                    Menampilkan {berita.length} dari {pagination.total} berita
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                      disabled={pagination.currentPage === 1}
                      className="p-1 bg-[var(--lime)] shadow rounded-lg disabled:bg-neutral-400 text-sm"
                    >
                      <ChevronLeftIcon size={20} />
                    </button>

                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.min(5, pagination.lastPage) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1  text-white rounded text-sm ${
                                pagination.currentPage === page
                                  ? "bg-[var(--lime)] !text-[var(--indigo-dark)]"
                                  : "hover:bg-[var(--lime)]/30"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}

                      {pagination.lastPage > 5 && (
                        <span className="px-2 py-1">...</span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                      disabled={pagination.currentPage === pagination.lastPage}
                      className="p-1  bg-[var(--lime)] shadow rounded-lg disabled:bg-neutral-400 text-sm"
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </div>
                </div>
              )}
           
        
        </div>
      </div>

      <ConfirmationDeleteModal
        onConfirm={async (id) => {
          try {
            const res = await deleteBerita(id);
            if (res.status === 200) {
              alert("Berita berhasil dihapus!");
              refreshData();
            }
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </>
  );
};

export default ManajemenBerita;
