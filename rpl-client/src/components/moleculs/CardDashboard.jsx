import * as LucideIcons from "lucide-react";

const CardDashboard = ({ namaIcons, data, judulCard }) => {
  const Icons = LucideIcons[namaIcons];

  return (
    <div className="bg-gradient-to-br from-[var(--indigo-dark)] via-[var(--indigo-dark)] to-[color-mix(in_srgb,var(--indigo-dark)_80%,black_20%)] relative p-5 text-white h-[150px] rounded-2xl w-full shadow-lg shadow-black/25 border border-white/10 backdrop-blur-sm hover:shadow-xl hover:shadow-black/30  transition-all duration-300 ease-out group overflow-hidden">
      {/* Background pattern dengan bulatan dan garis */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        {/* Lingkaran-lingkaran dekoratif */}
        <div className="absolute -top-8 -left-8 w-20 h-20 border-3 border-white/20 rounded-full"></div>
        <div className="absolute top-12 -right-6 w-16 h-16 border border-white/15 rounded-full"></div>
        <div className="absolute -bottom-4 left-1/3 w-12 h-12 border border-white/10 rounded-full"></div>

        {/* Bulatan solid dengan berbagai ukuran */}
        <div className="absolute top-6 right-12 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/25 rounded-full"></div>
        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-12 right-1/4 w-1 h-1 bg-white/15 rounded-full"></div>

        {/* Garis-garis dekoratif */}
        <div className="absolute top-1/4 left-0 w-8 h-[1px] bg-gradient-to-r from-white/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-1/3 right-0 w-12 h-[1px] bg-gradient-to-l from-white/15 to-transparent -rotate-12"></div>
        <div className="absolute top-2/3 left-1/4 w-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12"></div>

        {/* Kurva dekoratif */}
        <div className="absolute -bottom-8 -right-8 w-16 h-16 border-l-2 border-t-2 border-white/15 rounded-tl-full"></div>
        <div className="absolute -top-4 left-1/2 w-8 h-8 border-r border-b border-white/10 rounded-br-full"></div>

        {/* Background blur untuk depth */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--lime)]/5 rounded-full blur-xl"></div>
      </div>

      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative z-10">
        <p className="text-white/80 text-sm font-medium mb-2">{judulCard}</p>
        <h1 className="text-4xl font-bold text-[var(--lime)] drop-shadow-sm">
          {data}
        </h1>
      </div>

      <div className="absolute bg-gradient-to-br from-[rgb(201_173_251/25%)] to-[rgb(201_173_251/15%)] p-3 rounded-full flex justify-center items-center right-5 bottom-5 shadow-lg shadow-black/20 border border-white/10  transition-all duration-300 ease-out backdrop-blur-sm">
        <Icons size={28} className="text-[var(--lavender)] drop-shadow-sm" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
    </div>
  );
};

export default CardDashboard;
