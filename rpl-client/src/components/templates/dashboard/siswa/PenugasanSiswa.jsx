import { useState } from "react";
import EmptyStateTable from "../../../atoms/EmptyStateTable";
import SearchInput from "../../../atoms/SearchInput";
import SelectDropdown from "../../../atoms/SelectDropdown";
import Table from "../../../moleculs/Table";
import {
  filterAssignments,
  sortAssignments,
} from "../../../../app/utils/penugasan";
import {
  assignments,
  sortLabels,
  sortOptions,
  statusLabels,
  statusOptions,
} from "../../../../constants/asssignment";
import { PenugasanTableColumns } from "../../../atoms/tables/column-table-penugasan";

const PenugasanSiswa = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const PenugasanColumns = PenugasanTableColumns();

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    setIsStatusDropdownOpen(false);
  };

  const handleSortSelect = (sort) => {
    setSortBy(sort);
    setIsSortDropdownOpen(false);
  };

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
    setIsSortDropdownOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    setIsStatusDropdownOpen(false);
  };

  const filteredAssignments = sortAssignments(
    filterAssignments(assignments, searchValue, statusFilter),
    sortBy
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={clearSearch}
          placeholder="Cari tugas atau mata pelajaran..."
          className="flex-1"
        />

        <div className="flex gap-3 w-full md:w-auto">
          <SelectDropdown
            options={statusOptions.map((option) => statusLabels[option])}
            selectedValue={statusLabels[statusFilter]}
            onSelect={(selectedLabel) => {
              const status = Object.keys(statusLabels).find(
                (key) => statusLabels[key] === selectedLabel
              );
              handleStatusSelect(status);
            }}
            isOpen={isStatusDropdownOpen}
            onToggle={toggleStatusDropdown}
            placeholder="Pilih Status"
            className="w-full md:w-48"
          />

          <SelectDropdown
            options={sortOptions.map((option) => sortLabels[option])}
            selectedValue={sortLabels[sortBy]}
            onSelect={(selectedLabel) => {
              const sort = Object.keys(sortLabels).find(
                (key) => sortLabels[key] === selectedLabel
              );
              handleSortSelect(sort);
            }}
            isOpen={isSortDropdownOpen}
            onToggle={toggleSortDropdown}
            placeholder="Urutkan"
            className="w-full md:w-48"
          />
        </div>
      </div>

      <div className="h-[calc(100vh-190px)] rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            data={filteredAssignments}
            columns={PenugasanColumns}
            emptyMessage={<EmptyStateTable />}
          />
        </div>
      </div>
    </div>
  );
};

export default PenugasanSiswa;
