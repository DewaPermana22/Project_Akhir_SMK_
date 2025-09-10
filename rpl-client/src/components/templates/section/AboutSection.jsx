import { useEffect, useState } from "react";
import "../../../style/about.css";
import Lottie from "lottie-react";
const AboutSection = () => {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch("/lottie/pc-with-language.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);
  return (
    <section id="about" className="about">
      <div className="container-computer">
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
      <div className="right-content-about">
        <h1>Tentang Jurusan RPL SMKN 8 JEMBER</h1>
        <p>
          Di SMKN 8, jurusan Rekayasa Perangkat Lunak (RPL) membekali siswa
          dengan keterampilan dalam merancang, mengembangkan, dan mengelola
          solusi perangkat lunak sesuai standar industri. Dengan dasar yang kuat
          pada pemrograman, manajemen basis data, dan perancangan sistem, siswa
          dipersiapkan menjadi profesional yang siap menghadapi tantangan di era
          digital.
        </p>
        <ul className="list-point-about">
          <li>
            <img src="/svg/trophy.svg" alt="" />
            <span className="point-about">
              <b>Berorientasi Inovasi:</b>
              <span>
                Membentuk siswa agar mampu menciptakan aplikasi modern sesuai
                kebutuhan nyata.
              </span>
            </span>
          </li>
          <li>
            <img src="/svg/brain-circuit.svg" alt="" />
            <span className="point-about">
              <b>Berorientasi Inovasi:</b>
              <span>
                Membentuk siswa agar mampu menciptakan aplikasi modern sesuai
                kebutuhan nyata.
              </span>
            </span>
          </li>
          <li>
            <img src="/svg/briefcase-business.svg" alt="" />
            <span className="point-about">
              <b>Berorientasi Inovasi:</b>
              <span>
                Membentuk siswa agar mampu menciptakan aplikasi modern sesuai
                kebutuhan nyata.
              </span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;
