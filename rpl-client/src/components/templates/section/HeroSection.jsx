import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("/lottie/animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center md:flex-row gap-10 container mx-auto px-6">
        <div className="flex flex-col pt-32 xl:pt-40 justify-start gap-5 md:gap-10">
          <div className="flex flex-col justify-start gap-5">
            <span className="text-[15px] md:text-[15px] text-[var(--lime)] bg-[rgba(201,250,117,0.15)] px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
              100+ Alumni Sukses
            </span>
            <h1 className="font-author-bold text-[40px] md:text-[54px] leading-[44px] md:leading-[64px]">
              Temukan Bakatmu dalam Teknologi, Kami Mendampingi Setiap Langkahmu
            </h1>
          </div>

          <p className="text-[15px] md:text-[18px] leading-[28px] md:leading-[32px] text-[var(--gray-3)]">
            Mulai dari <strong>Pemrograman dasar</strong> hingga sistem
            kompleks, kami mengembangkan keterampilan dan inovasi siswa melalui
            proyek nyata.
          </p>

          <button className="bg-[var(--lime)] text-[var(--indigo-dark)] font-medium font-eudoxsussans-medium text-[15px] md:text-[18px] px-5 md:px-5 py-2.5 md:py-5 max-w-[200px] md:max-w-[300px] rounded-lg transition-colors duration-300 hover:bg-[var(--lavender)]">
            Bergabung bersama Kami!
          </button>
        </div>

        <div className="relative w-full h-full xl:pt-20">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>
      </div>

      <hr className="border-none h-[1px] bg-[var(--gray-2)] my-10" />
    </>
  );
};

export default HeroSection;
