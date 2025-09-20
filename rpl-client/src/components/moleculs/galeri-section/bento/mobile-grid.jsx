import BentoItem from "../BentoItem";

const MobileGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.slice(0, 6).map((image, index) => (
        <BentoItem
          key={image.id}
          image={image}
          className={`aspect-[4/3] ${index === 0 ? "col-span-2" : ""}`}
        />
      ))}
    </div>
  );
};

export default MobileGrid;
