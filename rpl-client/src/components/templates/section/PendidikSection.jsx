import React from "react";
import "../../../style/pendidik.css";
const PendidikSection = () => {
  return (
    <section class="pendidik-section">
      <h1>Tenaga Pendidik</h1>
      <div class="grid-foto">
        <div class="nama-dan-foto">
          <img src="/images/kukuh_s.png" alt="Kukuh Suprapto" />
          <div class="nama-guru-dan-info">
            <h3>Kukuh Suprapto, S.Kom</h3>
            <p>Ketua Program Keahlian RPL</p>
          </div>
        </div>
        <div class="nama-dan-foto">
          <img src="/images/anas_fauji.png" alt="Anas Fauji" />
          <div class="nama-guru-dan-info">
            <h3>Anas Fauji, S.Kom,Gr</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
        <div class="nama-dan-foto">
          <img src="/images/faruq_arifin.png" alt="Faruq Arifin" />
          <div class="nama-guru-dan-info">
            <h3>M. Faruq Arifin, S.Kom</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
        <div class="nama-dan-foto">
          <img src="/images/setyo_puji.png" alt="Setyo Puji" />
          <div class="nama-guru-dan-info">
            <h3>Setyo Puji K W, S.Kom</h3>
            <p>Guru Produktif RPL</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendidikSection;
