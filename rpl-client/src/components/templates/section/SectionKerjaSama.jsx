import React from "react";
import '../../../style/KerjaSama.css';

const SectionKerjaSama = () => {
  return (
    <div className="container-kerjasama">
      <h4>KERJASAMA INDUSTRI</h4>
      <div className="logo-industri">
        <div className="logo-wrapp">
          <img
            src="/images/hummatech.png"
            alt="logo-hummatech"
          />
          <img src="/images/ubig.png" alt="logo-ubig" />
          <img src="/images/ITS.png" alt="logo-ITS" />
          <img src="/images/LogoMascitra.png" alt="logo-Mascitra" />
          <img src="/images/elecomp.png" alt="logo-elecomp" />
          <img src="/images/pringapus.png" alt="logo-pringapus" />
        </div>
      </div>
    </div>
  );
};

export default SectionKerjaSama;
