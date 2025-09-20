import { FileText } from "lucide-react";

const EmptyNewsStateTable = ({
  icon: Icon = FileText,
  title = "Tidak ada data yang ditemukan",
  message = "Coba ubah kata kunci pencarian atau filter",
  iconSize = 48,
  iconClassName = "text-gray-300 mb-4",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Icon size={iconSize} className={iconClassName} />
      <p className="text-gray-500 text-lg mb-1">{title}</p>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default EmptyNewsStateTable;
