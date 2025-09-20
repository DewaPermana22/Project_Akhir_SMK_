import React from "react";
import "../../../style/pendidik.css";
const PendidikSection = () => {
  return (
    <section id="educators" className="pendidik-section">
      <h1 className="title-pndidik bg-clip-text text-transparent">
        Tenaga Pendidik
      </h1>
      <div className="grid-foto">
        <div className="nama-dan-foto">
          <img loading="lazy" src="/images/kukuh_s.png" alt="Kukuh Suprapto" />
          <div className="nama-guru-dan-info">
            <h3>Kukuh Suprapto, S.Kom</h3>
            <p>Ketua Program Keahlian RPL</p>
          </div>
        </div>
        <div className="nama-dan-foto">
          <img loading="lazy" src="/images/anas_fauji.png" alt="Anas Fauji" />
          <div className="nama-guru-dan-info">
            <h3>Anas Fauji, S.Kom,Gr</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
        <div className="nama-dan-foto">
          <img loading="lazy" src="/images/faruq_arifin.png" alt="Faruq Arifin" />
          <div className="nama-guru-dan-info">
            <h3>M. Faruq Arifin, S.Kom</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
        <div className="nama-dan-foto">
          <img loading="lazy" src="/images/setyo_puji.png" alt="Setyo Puji" />
          <div className="nama-guru-dan-info">
            <h3>Setyo Puji K W, S.Kom</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendidikSection;
