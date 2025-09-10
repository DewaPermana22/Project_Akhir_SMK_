import "@/style/berita-section.css";
import { FaArrowRightLong } from "react-icons/fa6";
import CardBerita from "@/components/atoms/card/CardBerita";
import useBerita from "@/hooks/useBerita";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const BeritaTerbaruSection = () => {
  const { newsLatest, loading } = useBerita();
  return (
    <section id="news-latest" className="berita-terbaru">
      <div className="wrapp-berita-dan-tombol">
        <h1>Berita Terbaru</h1>
        <Link to="/news" className="tombol-berita">
          Lihat Semua Berita{" "}
          <FaArrowRightLong className="hidden xl:block xl:w-5 xl:h-5" />
        </Link>
      </div>
      <div className="grid-berita">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-[300px] h-[400px] bg-white/15 backdrop-blur-[20px] rounded-[20px] border border-white/20 shadow-[0_25px_45px_rgba(0,0,0,0.1)]"
              />
            ))
          : newsLatest.map((item) => <CardBerita key={item.id} props={item} />)}
      </div>
    </section>
  );
};

export default BeritaTerbaruSection;
