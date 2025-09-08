import { formatLongWithZone } from "@/app/utils/formater-date";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const CardBerita = ({props}) => {
  const maxJudul = 50;
  const maxIsi = 70;
  const slug = props.slug;
  const judul = props.judul.length > maxJudul 
    ? props.judul.substring(0, maxJudul) + "..." 
    : props.judul;

  const isi = props.isi.length > maxIsi 
    ? props.isi.substring(0, maxIsi) + "..." 
    : props.isi;

  return (
    <div className="w-[300px] h-[400px] bg-white/15 backdrop-blur-[20px] rounded-[20px] border border-white/20 shadow-[0_25px_45px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ease-in-out hover:transform hover:shadow-lg flex flex-col">
      <div className="w-full h-[180px] overflow-hidden relative flex-shrink-0">
        <img
          loading="lazy"
          src={props.gambar_url}
          alt={props.judul}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[rgba(255,255,255,0.7)] text-xs font-medium">
            {formatLongWithZone(props.created_at, true)}
          </span>
          <span className="bg-[var(--lime)] text-[var(--indigo-dark)] px-3 py-1 rounded-[15px] text-[10px] font-semibold uppercase tracking-wider">
            {props.kategori.kategori}
          </span>
        </div>
        <h2 className="text-white font-eudo-bold flex-wrap mb-3 leading-[1.3]">
          {judul}
        </h2>
        <p className="text-[rgba(255,255,255,0.8)] text-sm text-wrap leading-[1.5] mb-4 flex-grow">
          {isi}
        </p>
        <div className="flex justify-end fixed bottom-5 right-5">
          <Link 
            to={`/news/${slug}/${props.id}`} 
            className="flex items-center gap-2 bg-[var(--lime)] text-[var(--indigo-dark)] px-4 py-2 rounded-[25px] no-underline text-xs font-semibold uppercase cursor-pointer tracking-wider transition-all duration-300 ease-in-out border border-white/20 hover:bg-[var(--lavender)]"
          >
            Read More
            <FaArrowRightLong className='hidden xl:block xl:w-5 xl:h-5'/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;