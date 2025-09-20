import * as LucideIcons from "lucide-react";

const CardDashboard = ({ namaIcons, data, judulCard }) => {
  const Icons = LucideIcons[namaIcons];

  return (
    <div className="bg-gradient-to-r from-[var(--blue)] to-indigo-500 relative p-5 h-[150px] rounded-2xl w-full border backdrop-blur-sm shadow-xs transition-all duration-300 ease-out group overflow-hidden hover:shadow-blue-300/50">
      {/* Background pattern dengan bulatan dan garis */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        {/* Lingkaran-lingkaran dekoratif */}
        <div className="absolute -top-8 -left-8 w-20 h-20 border-3 border-[var(--blue)]/20 rounded-full"></div>
        <div className="absolute top-12 -right-6 w-16 h-16 border border-blue-500/25 rounded-full"></div>
        <div className="absolute -bottom-4 left-1/3 w-12 h-12 border border-blue-200/15 rounded-full"></div>

        {/* Bulatan solid dengan berbagai ukuran */}
        <div className="absolute top-6 right-12 w-2 h-2 bg-blue-400/30 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-300/25 rounded-full"></div>
        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-400/20 rounded-full"></div>
        <div className="absolute bottom-12 right-1/4 w-1 h-1 bg-blue-300/15 rounded-full"></div>

        {/* Garis-garis dekoratif */}
        <div className="absolute top-1/4 left-0 w-8 h-[1px] bg-gradient-to-r from-blue-300/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-1/3 right-0 w-12 h-[1px] bg-gradient-to-l from-blue-400/15 to-transparent -rotate-12"></div>
        <div className="absolute top-2/3 left-1/4 w-6 h-[1px] bg-gradient-to-r from-transparent via-blue-300/10 to-transparent rotate-12"></div>

        {/* Kurva dekoratif */}
        <div className="absolute -bottom-8 -right-8 w-16 h-16 border-l-2 border-t-2 border-blue-200/15 rounded-tl-full"></div>
        <div className="absolute -top-4 left-1/2 w-8 h-8 border-r border-b border-blue-300/10 rounded-br-full"></div>

        {/* Background blur untuk depth */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--blue)]/8 rounded-full blur-xl"></div>
      </div>

      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>

      <div className="relative z-10">
        <p className="text-gray-50 text-sm font-medium mb-2">{judulCard}</p>
        <h1 className="text-4xl font-bold text-white drop-shadow-sm">
          {data}
        </h1>
      </div>

      <div className="absolute bg-gray-50 p-3 rounded-full flex justify-center items-center right-5 bottom-5 shadow-sm shadow-[var(--blue)]/20">
        <Icons size={28} className="text-indigo-400 drop-shadow-sm" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
    </div>
  );
};

export default CardDashboard;