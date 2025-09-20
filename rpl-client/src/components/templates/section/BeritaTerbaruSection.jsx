import { FaArrowRightLong } from "react-icons/fa6";
import CardBerita from "@/components/atoms/card/CardBerita";
import useBerita from "@/hooks/useBerita";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyNewsLatest from "@/components/templates/empty-state/empty-news-latest";

const BeritaTerbaruSection = () => {
  const { newsLatest, latestNewsLoading } = useBerita({});

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
          className="absolute top-1/2 -right-40 w-72 h-72 bg-gradient-to-bl from-purple-400/10 to-blue-500/6 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-400/12 to-cyan-400/8 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl blur-xl"></div>
          <h1 className="relative text-4xl sm:text-5xl font-bold linear-purple bg-clip-text text-transparent font-author-bold drop-shadow-sm">
            Berita Terbaru
          </h1>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm"></div>
        </div>
        <Link
          to="/news"
          className="group relative flex items-center gap-3 linear-purple enhanced-box-shadow text-white font-medium text-sm md:text-base lg:text-lg px-4 md:px-6 py-3 md:py-4 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden font-eudoxsussans-medium"
        >
          <div className="absolute inset-0 linear-purple backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          <span className="relative z-10">Lihat Semua Berita</span>
          <FaArrowRightLong className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/30 to-purple-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>
      </div>

      <div className="relative z-10">
        {latestNewsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                className="w-full max-w-[300px] h-[400px] rounded-lg"
              />
            ))}
          </div>
        ) : (
          <>
            {newsLatest && newsLatest.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {newsLatest.map((item) => (
                  <CardBerita key={item.id} props={item} />
                ))}
              </div>
            ) : (
              <EmptyNewsLatest />
            )}
          </>
        )}
      </div>

      <style jsx>{`
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
      `}</style>
    </section>
  );
};

export default BeritaTerbaruSection;
