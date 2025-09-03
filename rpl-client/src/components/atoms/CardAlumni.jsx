const CardAlumni = ({props}) => {
  return (
    <div>
      <div class="card-alumni-slide">
        <div class="header-card-alumni">
          <h2>{props.bidang}</h2>
        </div>
        <div class="body-card-alumni">
          <span>{props.cerita}</span>
        </div>
        <div class="footer-card-alumni">
          <div class="alumni-nama">
            <p>{props.nama}</p>
        </div>
          <div class="alumni-jabatan">{props.angkatan}</div>
        </div>
      </div>
      <div class="absolute-line"></div>
    </div>
  );
};

export default CardAlumni;
