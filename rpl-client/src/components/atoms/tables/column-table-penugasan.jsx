import { Calendar, Clock, PencilLine, Eye, Download } from "lucide-react";
import { DaysRemainingBadge, StatusBadge } from "./badge-table";

export const PenugasanTableColumns = () => [
  {
    key: "title",
    header: "Tugas",
    render: (row) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 bg-[var(--lime)] rounded-lg flex items-center justify-center">
          <PencilLine size={20} className="text-[var(--indigo-dark)]" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-eudo-bold text-[var(--violet)]">
            {row.title}
          </div>
          <div className="text-xs text-gray-500">Oleh: {row.teacher}</div>
        </div>
      </div>
    ),
  },
  {
    key: "subject",
    header: "Mata Pelajaran",
    render: (row) => (
      <div className="text-sm text-[var(--indigo-dark)]">{row.subject}</div>
    ),
  },
  {
    key: "deadline",
    header: "Deadline",
    render: (row) => (
      <>
        <div className="flex items-center text-xs text-[var(--indigo-dark)]">
          <Calendar size={16} className="mr-1 text-gray-400" />
          {new Date(row.deadline).toLocaleDateString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock size={14} className="mr-1 text-gray-400" />
          {row.time} • <DaysRemainingBadge deadline={row.deadline} />
        </div>
      </>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "score",
    header: "Nilai",
    render: (row) =>
      row.score ? (
        <span className="font-bold text-sm text-green-500">{row.score}</span>
      ) : (
        <span className="text-gray-400">-</span>
      ),
  },
  {
    key: "actions",
    header: "",
    headerStyle: { textAlign: "right" },
    cellStyle: { textAlign: "right" },
    render: (row) => (
      <div className="flex justify-end space-x-2">
        <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
          <Eye size={18} />
        </button>
        <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Download size={18} />
        </button>
      </div>
    ),
  },
];
