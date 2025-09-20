import { prestasiImages } from "@/constants/galeri-source-image";
import BentoItem from "../BentoItem";

const PrestasiGrid = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4  mx-auto">
      {/* Row 1: portrait + landscape (2 cols) + portrait */}
      <BentoItem image={prestasiImages[1]} className="col-span-1 row-span-1" />
      <BentoItem image={prestasiImages[0]} className="col-span-2 row-span-1" />
      <BentoItem image={prestasiImages[5]} className="col-span-1 row-span-1" />

      {/* Row 2: landscape (2 cols) + 2 squares */}
      <BentoItem image={prestasiImages[4]} className="col-span-2 row-span-1" />
      <BentoItem
        image={prestasiImages[2]}
        className="col-span-1 row-span-1"
      />
      <BentoItem
        image={prestasiImages[3]}
        className="col-span-1 row-span-1"
      />
    </div>
  );
};
export default PrestasiGrid;
