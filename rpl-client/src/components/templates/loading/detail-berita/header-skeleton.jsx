import { ArrowBigLeftDashIcon } from "lucide-react";
import { Link } from "react-router";

const HeaderSkeleton = () => (
  <div className="h-[80px] fixed top-0 left-0 right-0 bg-slate-50 z-50 border-b border-gray-200">
    <Link
      to={"/"}
      className="flex items-center gap-2 linear-purple text-white enhanced-box-shadow px-5 py-2 rounded-md shadow-2xs cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5"
    >
      <ArrowBigLeftDashIcon className="w-5 h-5" />
      <span className="hidden sm:inline">Kembali</span>
    </Link>
  </div>
);

export default HeaderSkeleton;
