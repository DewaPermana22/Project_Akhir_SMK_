import { kegiatanImages } from "@/constants/galeri-source-image";
import BentoItem from "../BentoItem";

const KegiatanGrid = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mx-auto">
      <BentoItem image={kegiatanImages[0]} className="col-span-2 row-span-1" />
      <BentoItem image={kegiatanImages[2]} className="col-span-1 row-span-1" />
      <BentoItem image={kegiatanImages[3]} className="col-span-1 row-span-1" />

      {/* Row 2: portrait + landscape (2 cols) + portrait */}
      <BentoItem
        image={kegiatanImages[1]}
        className="col-span-1 row-span-2"
      />
      <BentoItem image={kegiatanImages[4]} className="col-span-2 row-span-2" />
      <BentoItem
        image={kegiatanImages[5]}
        className="col-span-1 row-span-2"
      />
    </div>
  );
};

export default KegiatanGrid;
