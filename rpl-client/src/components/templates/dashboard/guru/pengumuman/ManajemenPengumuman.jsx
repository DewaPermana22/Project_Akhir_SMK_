import React from "react";
import WrapperLayout from "../../WrapperLayout";
import HeaderDashboardPages from "@/components/atoms/header-dashboard-pages";
import { Link } from "react-router-dom";
import { PlusCircleIcon, RotateCwIcon } from "lucide-react";
import SelectDropdown from "@/components/atoms/SelectDropdown";
import SearchInput from "@/components/atoms/SearchInput";
import EmptyNewsStateTable from "@/components/templates/empty-state/empty-news-table";
import { DummyDataPengumuman } from "@/constants/dumy-data-pengumuman";
import { ColumnTableManajemenPengumuman } from "@/components/atoms/tables/column-table-pengumuman";
import Table from "@/components/moleculs/Table";

const ManajemenPengumuman = () => {
    const ManajemenBeritaCols = ColumnTableManajemenPengumuman();
  return (
    <WrapperLayout>
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <HeaderDashboardPages
            mainHeader={"Pengumuman Untuk Siswa"}
            descriptionText={
              "Buat Pengumuman untuk siswa di kelas yang anda ajar!"
            }
          />
          <Link
            to="buat"
            className="bg-[var(--blue)] flex gap-2 items-center shadow cursor-pointer text-white font-medium font-eudoxsussans-medium text-[15px] px-4 py-2 rounded-lg"
          >
            <PlusCircleIcon size={20} /> Buat Baru
          </Link>
        </div>

        <div className="flex w-full flex-col sm:flex-row gap-4 max-w-2xl items-start sm:items-center">
          <SearchInput
            // value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            // onClear={handleClear}
            placeholder="Cari berita..."
          />

          {/* <SelectDropdown
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
            className="p-2 text-gray-700 hover:text-gray-800 disabled:opacity-50"
            title="Refresh data"
          >
            <RotateCwIcon size={20} className={loading ? "animate-spin" : ""} />
          </button> */}
        </div>

        <div
          className="w-full rounded-lg shadow-md overflow-hidden"
          style={{ minHeight: "calc(100vh - 300px)" }}
        >
          <Table
            sortable={true}
            // loading={loading}
            data={DummyDataPengumuman}
            // pagination={pagination}
            // onPageChange={handlePageChange}
            showPagination={true}
            columns={ManajemenBeritaCols}
            emptyMessage={<EmptyNewsStateTable />}
          />
        </div>
      </div>
    </WrapperLayout>
  );
};

export default ManajemenPengumuman;
