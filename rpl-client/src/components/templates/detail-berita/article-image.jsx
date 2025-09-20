import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CameraOffIcon } from "lucide-react";

const ArticleImage = ({ detailBerita }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!detailBerita?.gambar_url || imageError) {
    return (
      <div className="mb-8 relative">
        <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200" />
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center">
              <CameraOffIcon/>
            </div>
            <p className="text-sm">No image available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 relative group">
      <div className="relative overflow-hidden rounded-xl shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <img
          loading="lazy"
          src={detailBerita.gambar_url}
          alt={detailBerita.judul || "Article image"}
          className={`w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>
      {detailBerita.judul && (
        <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white text-sm font-medium truncate">
              {detailBerita.judul}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
