import React from "react";
import '../../../style/KerjaSama.css';

const SectionKerjaSama = () => {
  return (
    <div className="container-kerjasama">
      <h4>KERJASAMA INDUSTRI</h4>
      <div className="logo-industri">
        <div className="logo-wrapp">
          <img loading="lazy"
            src="/images/hummatech.png"
            alt="logo-hummatech"
          />
          <img loading="lazy" src="/images/ubignew.png" alt="logo-ubig" />
          <img loading="lazy" src="/images/ITS.png" alt="logo-ITS" />
          <img loading="lazy" src="/images/LogoMascitra.png" alt="logo-Mascitra" />
          <img loading="lazy" src="/images/elecomp.png" alt="logo-elecomp" />
          <img loading="lazy" src="/images/pringapus.png" alt="logo-pringapus" />
        </div>
      </div>
    </div>
  );
};

export default SectionKerjaSama;
