import "@/style/alumni-section.css";
import CardAlumni from "@/components/atoms/card/CardAlumni";
import { dataAlumni } from "@/constants/alumni-data";

const AlumniSection = () => {
  return (
    <section id="alumni" className="alumni-section">
      <h1 className="text-gray-600">
        Kisah Sukses <span className="gradient-alumni">Alumni RPL</span>
      </h1>
      <div className="slide-wrapper">
        {dataAlumni.map((alumni, index) => (
          <CardAlumni props={alumni} key={index} />
        ))}
        {dataAlumni.map((alumni, index) => (
          <CardAlumni props={alumni} key={index} />
        ))}
      </div>
    </section>
  );
};

export default AlumniSection;
