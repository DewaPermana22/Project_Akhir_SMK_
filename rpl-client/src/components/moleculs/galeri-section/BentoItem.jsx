const BentoItem = ({ image, className = "" }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative w-full h-full">
        <img
          loading="lazy"
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-sm  leading-tight">{image.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoItem;
