import { admissionPaths } from "@/constants/admission";
import React from "react";

const AdmisionSection = () => {
  return (
    <div className="relative z-10 mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-800 to-purple-600 bg-clip-text text-transparent font-author-bold mb-4">
          Jalur Penerimaan Siswa Baru
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {admissionPaths.map((path, index) => (
          <div key={index} className="group relative">
            {/* Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 border border-white/30 shadow-lg hover:shadow-xl hover:shadow-indigo-100/30 hover:bg-white/80 transition-all duration-500 ease-out hover:scale-105 h-full">
              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${path.color} rounded-full text-white text-2xl shadow-lg mb-4`}
                >
                  {path.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  {path.title}
                </h4>
                <div
                  className={`inline-block bg-gradient-to-r ${path.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  Kuota: {path.quota}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 text-center mb-6 leading-relaxed">
                {path.description}
              </p>

              {/* Requirements */}
              <div className="space-y-3">
                <h5 className="font-semibold text-slate-800 text-sm">
                  Persyaratan:
                </h5>
                <ul className="space-y-2">
                  {path.requirements.map((req, reqIndex) => (
                    <li
                      key={reqIndex}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <span className="text-indigo-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover decoration */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  animation: "gentleFloat 4s ease-in-out infinite",
                  animationDelay: `${index * 0.5}s`,
                }}
              ></div>
            </div>
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 ease-out`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmisionSection;
