import EmptyStateTable from "../../../atoms/EmptyStateTable";
import Table from "../../../moleculs/Table";
import {assignments} from "../../../../constants/asssignment";
import { UjianTableColumns } from "../../../atoms/tables/column-table-ujian";

const UjianSiswa = () => {
  const PenugasanColumns = UjianTableColumns();
  return (
    <div className="flex flex-col gap-6">
        <h1>Klik <a href="">Disini</a> untuk membaca panduan</h1>
      <div className="h-[calc(100vh-190px)] rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            data={assignments}
            columns={PenugasanColumns}
            emptyMessage={<EmptyStateTable />}
          />
        </div>
      </div>
    </div>
  );
};

export default UjianSiswa;
