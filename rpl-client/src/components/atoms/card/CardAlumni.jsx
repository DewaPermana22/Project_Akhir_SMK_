const CardAlumni = ({props}) => {
  return (
    <div>
      <div className="card-alumni-slide">
        <div className="header-card-alumni">
          <h2>{props.bidang}</h2>
        </div>
        <div className="body-card-alumni">
          <span>{props.cerita}</span>
        </div>
        <div className="footer-card-alumni">
          <div className="alumni-nama">
            <p>{props.nama}</p>
        </div>
          <div className="alumni-jabatan">{props.angkatan}</div>
        </div>
      </div>
      <div className="absolute-line"></div>
    </div>
  );
};

export default CardAlumni;
