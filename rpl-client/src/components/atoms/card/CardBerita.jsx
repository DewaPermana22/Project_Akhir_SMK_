import { formatLongWithZone } from "@/app/utils/formater-date";
import Dompurify from "dompurify";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

const CardBerita = ({ props }) => {
  const navigate = useNavigate();
  const maxJudul = 50;
  const slug = props.slug;
  const judul = props.judul.length > maxJudul 
    ? props.judul.substring(0, maxJudul) + "..."
    : props.judul;

    const handleToDetaiil = () => {
      try {
        navigate(`/news/${slug}/${props.id}`)
      } catch (error) {
        console.error("error when get news detail : ", error)
      }
    }

  return (
    <div onClick={() => handleToDetaiil()} className="w-full max-w-full h-[300px] lg:w-[300px] lg:max-w-full lg:h-[400px] bg-white backdrop-blur-[0] rounded-lg shadow-[0_25px_45px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col mx-auto hover:shadow-[0_35px_60px_rgba(0,0,0,0.15)] transition-all duration-300">
      <div className="w-full h-[120px] lg:h-[180px] overflow-hidden relative flex-shrink-0">
        <img
          loading="lazy"
          src={props.gambar_url}
          alt={props.judul}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow relative">
        <div className="flex justify-between items-center mb-2 lg:mb-3">
          <span className="text-purple-600 text-[10px] sm:text-xs">
            {formatLongWithZone(props.created_at, true)}
          </span>
          <span className="bg-indigo-100 text-purple-700 px-2 py-1 lg:px-3 lg:py-1 rounded-[15px] text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider">
            {props.kategori}
          </span>
        </div>
        <h2 className="text-black font-bold flex-wrap mb-2 lg:mb-3 leading-[1.3] text-sm sm:text-base lg:text-base">
          {judul}
        </h2>
        <p 
          className="text-gray-400 text-xs text-wrap flex-grow"
          dangerouslySetInnerHTML={{__html: Dompurify.sanitize(props.excerpt)}}
        />
        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5">
          <Link 
            to={`/news/${slug}/${props.id}`}
            className="hidden lg:flex items-center gap-1 sm:gap-2 linear-purple text-white enhanced-box-shadow px-3 py-2 sm:px-4 sm:py-2 rounded-[25px] no-underline text-[10px] sm:text-xs uppercase cursor-pointer tracking-wider transition-all duration-300 ease-in-out border border-white/20 hover:shadow-lg"
          >
            <span className="hidden sm:inline">Selengkapnya</span>
            <span className="sm:hidden">Baca</span>
            <FaArrowRightLong className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5'/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;