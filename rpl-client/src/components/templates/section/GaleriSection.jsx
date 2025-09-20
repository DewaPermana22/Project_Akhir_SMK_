import TabsGaleri from "@/components/moleculs/galeri-section/tabs-galeri";
import React from "react";

const GaleriSection = () => {
  return (
    <main
      className="relative py-14 bg-gradient-to-b from-indigo-50/60 via-white to-purple-50/40 overflow-hidden"
      id="gallery"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-l from-blue-400/25 to-purple-500/25 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute top-1/3 -left-12 w-40 h-40 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute -bottom-20 -right-24 w-80 h-80 bg-gradient-to-tl from-purple-500/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Glowing lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent blur-sm"></div>
        <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent blur-sm"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 drop-shadow-sm">
            Get Involved with Us!
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Ingin foto atau videomu tampil di sini? Tag & mention kami di
            Instagram{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">
              @rpl_smkdj
            </span>
          </p>
        </div>

        <div className="flex justify-center mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-indigo-100/20 to-blue-100/20 rounded-3xl blur-xl scale-110"></div>
          <TabsGaleri />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(3px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes bounce-delayed {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-delayed {
          animation: bounce-delayed 2s infinite;
          animation-delay: 1s;
        }
        
        .blur-3xl {
          filter: blur(64px);
        }
      `}</style>
    </main>
  );
};

export default GaleriSection;

