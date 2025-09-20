import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -right-32 w-64 h-64 bg-gradient-to-bl from-blue-400/25 to-indigo-500/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 left-1/3 w-2 h-2 bg-indigo-400/60 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400/70 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center lg:flex-row gap-10 container mx-auto px-6">
        <div className="flex flex-col pt-32 xl:pt-40 justify-start gap-5 md:gap-10">
          <div className="flex flex-col justify-start gap-5">
            <span className="text-[15px] bg-indigo-100/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-indigo-700 font-eudoxsussans-regular max-w-fit border border-indigo-200/50 hover:bg-indigo-200/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200/50">
              100+ Alumni Sukses
            </span>
            <h1 className="font-author-bold text-[40px] md:text-[54px] leading-[44px] md:leading-[64px] text-indigo-900 drop-shadow-sm">
              Temukan Bakatmu dalam Teknologi, Kami Mendampingi Setiap Langkahmu
            </h1>
          </div>
          <p className="text-[15px] md:text-[18px] leading-[28px] md:leading-[32px] text-slate-600">
            Mulai dari{" "}
            <strong className="text-indigo-700 drop-shadow-sm">
              Pemrograman dasar
            </strong>{" "}
            hingga sistem kompleks, kami mengembangkan keterampilan dan inovasi
            siswa melalui proyek nyata.
          </p>
          <button className="group relative linear-purple cursor-pointer text-white font-medium font-eudoxsussans-medium text-[15px] md:text-[18px] px-5 py-4 md:py-5 max-w-[250px] md:max-w-[300px] rounded-[16px] enhanced-box-shadow transition-all duration-300 hover:scale-100 hover:shadow-2xl hover:shadow-indigo-500/30 backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="absolute inset-0 linear-purple  backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <HashLink to="#ppdb" className="relative z-10">Bergabung bersama Kami!</HashLink>
            <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-indigo-400/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
        <div className="relative w-full h-full xl:pt-20">
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-indigo-400/30 rounded-full blur-lg animate-pulse"></div>
          <div
            className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-400/25 rounded-full blur-md animate-bounce"
            style={{ animationDuration: "2s" }}
          ></div>
          <object
            className="relative z-10 w-sm lg:w-md mx-auto lg:mx-0 h-auto drop-shadow-lg"
            data="/svg/3.svg"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-3xl blur-2xl opacity-60"></div>
        </div>
      </div>
      <div className="relative my-10">
        <hr className="border-none h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent blur-sm h-[1px]"></div>
      </div>
    </>
  );
};

export default HeroSection;
