import { FaArrowRightLong } from "react-icons/fa6";
import CardBerita from "@/components/atoms/card/CardBerita";
import useBerita from "@/hooks/useBerita";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const BeritaTerbaruSection = () => {
  const { newsLatest, loading } = useBerita();

  return (
    <section
      id="news-latest"
      className="relative bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/40 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400/12 to-indigo-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-40 w-72 h-72 bg-gradient-to-bl from-purple-400/10 to-blue-500/6 rounded-full blur-3xl"
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-400/12 to-cyan-400/8 rounded-full blur-2xl animate-pulse"
          style={{
            animationDuration: "7s",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-400/25 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 8s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-indigo-400/30 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 10s ease-in-out infinite",
            animationDelay: "3s",
          }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl blur-xl"></div>
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold linear-purple bg-clip-text text-transparent font-author-bold drop-shadow-sm">
            Berita Terbaru
          </h1>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm"></div>
        </div>
        <Link
          to="/news"
          className="group relative flex items-center gap-3 linear-purple text-white font-medium text-sm md:text-base lg:text-lg px-4 md:px-6 py-3 md:py-4 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden font-eudoxsussans-medium"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          <span className="relative z-10">Lihat Semua Berita</span>
          <FaArrowRightLong className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/30 to-purple-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>
      </div>
      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 place-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="group w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[300px]"
              >
                <div className="relative overflow-hidden">
                  <Skeleton className="w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[400px] bg-white/40 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/30 shadow-lg shadow-indigo-100/20" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"
                    style={{
                      animation: "shimmer 2s ease-in-out infinite",
                    }}
                  ></div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-400/20 rounded-full blur-md"
                    style={{
                      animation: "gentleFloat 4s ease-in-out infinite",
                      animationDelay: `${index * 0.2}s`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8  place-items-center">
            {newsLatest.map((item, index) => (
              <div
                key={item.id}
                className="group w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[300px]"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-105"></div>
                  <div
                    className="absolute -top-2 -right-2 w-4 h-4 md:w-6 md:h-6 bg-indigo-400/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      animation: "gentleFloat 6s ease-in-out infinite",
                      animationDelay: `${index * 0.3}s`,
                    }}
                  ></div>
                  <div className="relative z-10">
                    <CardBerita props={item} />
                  </div>
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-indigo-200/10 to-purple-200/10 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ease-out"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-8px) rotate(-0.5deg);
          }
        }
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-6px) translateX(3px);
          }
          50% {
            transform: translateY(-10px) translateX(-2px);
          }
          75% {
            transform: translateY(-3px) translateX(4px);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default BeritaTerbaruSection;
