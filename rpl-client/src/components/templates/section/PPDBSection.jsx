import React, { useState, useEffect } from "react";
import AdmisionSection from "../../moleculs/ppdb-section/admision-section";
import QuickInfoPPDB from "../../moleculs/ppdb-section/quick-info-ppdb";
import CtaPPDB from "../../moleculs/ppdb-section/cta-ppdb";

const PPDBSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-01T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      id="ppdb"
      className="relative bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-bl from-blue-400/12 to-indigo-500/8 rounded-full blur-3xl"
          style={{
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-400/12 to-pink-400/8 rounded-full blur-2xl animate-pulse"
          style={{
            animationDuration: "6s",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-indigo-400/30 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 9s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-purple-400/35 rounded-full blur-sm"
          style={{
            animation: "gentleFloat 7s ease-in-out infinite",
            animationDelay: "3s",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex justify-center flex-col lg:flex-row py-14 gap-12 lg:gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start gap-8">
          {/* SVG Container */}
          <div className="relative group">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-indigo-400/20 rounded-full blur-lg animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-400/25 rounded-full blur-md"
              style={{
                animation: "gentleFloat 6s e  ase-in-out infinite",
                animationDelay: "2s",
              }}
            ></div>

            <object
              className="relative z-10 w-full max-w-[250px] h-auto drop-shadow-lg"
              data="/svg/1.svg"
              type=""
            />

            <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/10 to-purple-200/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 ease-out"></div>
          </div>

          <div className="text-center lg:text-left">
            <div className="relative mb-4">
              <h1 className="text-3xl md:text-4xl leading-tight text-indigo-900 font-author-bold drop-shadow-sm">
                Penerimaan Siswa Baru
              </h1>
              <h2 className="text-xl md:text-2xl leading-tight text-gray-500 font-author-bold">
                Jurusan RPL SMKN 8 JEMBER
              </h2>
              <div className="absolute -bottom-2 left-0 lg:left-0 right-0 lg:right-auto w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm mx-auto lg:mx-0"></div>
            </div>
            <p className="text-slate-600 leading-relaxed pt-3">
              Bergabunglah dengan jurusan{" "}
              <strong className="text-indigo-700">
                Rekayasa Perangkat Lunak
              </strong>{" "}
              dan wujudkan impian menjadi programmer profesional. Kami membuka
              berbagai jalur penerimaan untuk memberikan kesempatan terbaik bagi
              calon siswa.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl gap-1 flex items-center justify-center font-bold text-slate-800 mb-2">
                <img className="w-12" src="/svg/alarm.svg" alt="" /> Pendaftaran
                Dimulai
              </h3>
              <p className="text-lg text-slate-600">Juni 2026</p>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="linear-purple enhanced-box-shadow rounded-2xl p-4 text-white shadow-lg"
                >
                  <div className="text-2xl md:text-3xl font-bold">
                    {item.value}
                  </div>
                  <div className="text-sm opacity-90">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <QuickInfoPPDB />
          <CtaPPDB />
        </div>
      </div>

      {/* <AdmisionSection/> */}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(1deg);
          }
          66% {
            transform: translateY(-6px) rotate(-0.5deg);
          }
        }

        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-5px) translateX(2px);
          }
          50% {
            transform: translateY(-8px) translateX(-1px);
          }
          75% {
            transform: translateY(-2px) translateX(3px);
          }
        }
      `}</style>
    </main>
  );
};

export default PPDBSection;
