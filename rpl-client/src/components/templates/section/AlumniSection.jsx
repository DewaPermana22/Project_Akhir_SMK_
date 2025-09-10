import "@/style/alumni-section.css";
import CardAlumni from "@/components/atoms/card/CardAlumni";
import { dataAlumni } from "@/constants/alumni-data";

const AlumniSection = () => {
  return (
    <section id="alumni" class="alumni-section">
      <h1>
        Kisah Sukses <span class="gradient-alumni">Alumni RPL</span>
      </h1>
      <div class="slide-wrapper">
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
