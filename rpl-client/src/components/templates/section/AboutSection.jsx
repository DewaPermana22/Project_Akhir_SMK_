const AboutSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/15 to-indigo-500/10 rounded-full blur-3xl"
          style={{
            animation: "gentleFloat 8s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tl from-purple-400/12 to-blue-400/8 rounded-full blur-2xl"
          style={{
            animation: "gentleFloat 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-indigo-300/15 to-cyan-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-indigo-400/30 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 12s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-blue-400/40 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 9s ease-in-out infinite",
            animationDelay: "3s",
          }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-2 h-2 bg-purple-400/50 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 7s ease-in-out infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>
      <section
        id="about"
        className="relative z-10 bg-gradient-to-br from-slate-50/80 via-white/60 to-indigo-50/40 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-evenly gap-0 lg:gap-[90px] px-10 md:px-15 py-12 md:py-20 lg:py-24 text-slate-800"
      >
        <div className="relative h-full object-contain group">
          <div
            className="absolute -top-6 -right-6 w-12 h-12 bg-blue-400/20 rounded-full blur-lg"
            style={{
              animation: "gentleFloat 6s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-400/25 rounded-full blur-md"
            style={{
              animation: "gentleFloat 8s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
          ></div>
          <div
            className="absolute top-1/3 -left-6 w-6 h-6 bg-purple-400/20 rounded-full blur-sm"
            style={{
              animation: "gentleFloat 10s ease-in-out infinite",
              animationDelay: "3s",
            }}
          ></div>
          <object
            className="w-[250px] lg:w-sm drop-shadow-lg transform transition-transform duration-700 ease-out"
            data="/svg/2.svg"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 ease-out"></div>
        </div>
        <div className="w-full flex flex-col gap-6 justify-start px-0 md:px-10 lg:px-0">
          <div className="relative">
            <h1 className="text-[28px] lg:text-[36px] font-bold leading-[38px] lg:leading-[54px] bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent font-author-bold drop-shadow-sm">
              Tentang Jurusan RPL SMKN 8 JEMBER
            </h1>
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-70"></div>
          </div>
          <p className="text-[14px] lg:text-[16px] text-slate-600 text-justify leading-[28px] lg:leading-[32px] font-eudoxsussans-regular">
            Di SMKN 8, jurusan{" "}
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Rekayasa Perangkat Lunak (RPL)
            </span>{" "}
            membekali siswa dengan keterampilan dalam merancang, mengembangkan,
            dan mengelola solusi perangkat lunak sesuai standar industri. Dengan
            dasar yang kuat pada pemrograman, manajemen basis data, dan
            perancangan sistem, siswa dipersiapkan menjadi profesional yang siap
            menghadapi tantangan di era digital.
          </p>
          <ul className="hidden lg:flex flex-col gap-6 justify-start mt-4">
            <li className="flex gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 transition-transform duration-300 ease-out">
                  <img
                    src="/svg/trophy.svg"
                    alt="Trophy"
                    className="w-6 h-6 drop-shadow-sm"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] text-slate-800 leading-[28px] font-eudoxsussans-bold mb-1 flex items-center gap-2">
                  🏆 Berorientasi Inovasi:
                </span>
                <span className="text-[16px] text-slate-600 leading-[26px] font-eudoxsussans-medium">
                  Membentuk siswa agar mampu menciptakan aplikasi modern sesuai
                  kebutuhan nyata.
                </span>
              </div>
            </li>
            <li className="group flex gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                  <img
                    src="/svg/brain-circuit.svg"
                    alt="Brain Circuit"
                    className="w-6 h-6 drop-shadow-sm"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] text-slate-800 leading-[28px] font-eudoxsussans-bold mb-1 flex items-center gap-2">
                  🧠 Pembelajaran Terpadu:
                </span>
                <span className="text-[16px] text-slate-600 leading-[26px] font-eudoxsussans-medium">
                  Menggabungkan teori dan praktik dengan pendekatan
                  project-based learning.
                </span>
              </div>
            </li>
            <li className="group flex gap-4 ">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <img
                    src="/svg/briefcase-business.svg"
                    alt="Briefcase"
                    className="w-6 h-6 drop-shadow-sm"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] text-slate-800 leading-[28px] font-eudoxsussans-bold mb-1 flex items-center gap-2">
                  💼 Siap Kerja:
                </span>
                <span className="text-[16px] text-slate-600 leading-[26px] font-eudoxsussans-medium">
                  Lulusan siap terjun ke dunia industri dengan sertifikasi
                  kompetensi.
                </span>
              </div>
            </li>
          </ul>
          <div className="lg:hidden flex flex-col gap-4 mt-4">
            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏆</span>
                <span className="text-[16px] text-slate-800 font-eudoxsussans-bold">
                  Berorientasi Inovasi
                </span>
              </div>
              <p className="text-[14px] text-slate-600 leading-[24px] font-eudoxsussans-medium">
                Membentuk siswa agar mampu menciptakan aplikasi modern sesuai
                kebutuhan nyata.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧠</span>
                <span className="text-[16px] text-slate-800 font-eudoxsussans-bold">
                  Pembelajaran Terpadu
                </span>
              </div>
              <p className="text-[14px] text-slate-600 leading-[24px] font-eudoxsussans-medium">
                Menggabungkan teori dan praktik dengan pendekatan project-based
                learning.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💼</span>
                <span className="text-[16px] text-slate-800 font-eudoxsussans-bold">
                  Siap Kerja
                </span>
              </div>
              <p className="text-[14px] text-slate-600 leading-[24px] font-eudoxsussans-medium">
                Lulusan siap terjun ke dunia industri dengan sertifikasi
                kompetensi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-15px) translateX(-3px);
          }
          75% {
            transform: translateY(-5px) translateX(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutSection;
