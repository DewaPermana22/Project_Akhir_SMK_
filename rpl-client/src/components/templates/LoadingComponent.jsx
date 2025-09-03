import { useState, useEffect } from "react";
import BrandLogo from "../atoms/BrandLogo";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingComponent = ({ isVisible = true, onExit }) => {
  const [mounted, setMounted] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      setShouldExit(false);
    } else {
      setShouldExit(true);
      const timer = setTimeout(() => {
        setMounted(false);
        onExit?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onExit]);

  if (!mounted && !isVisible) return null;

  return (
    <main
      className="
      flex justify-center items-center flex-col gap-10 bg-[var(--indigo-dark)] w-screen h-screen overflow-hidden
      transition-all duration-800 ease-in-out"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`
        transform transition-all duration-1000 ease-out delay-300
        ${
          mounted && !shouldExit
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
      >
        <div className="animate-pulse">
          <BrandLogo />
        </div>
      </div>

      <div
        className={`
        flex flex-col justify-center items-center gap-4
        transform transition-all duration-1000 ease-out delay-500
        ${
          mounted && !shouldExit
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
      >
        <div className="relative">
          <AiOutlineLoading
            size={50}
            className="animate-spin text-[var(--lavender)] drop-shadow-lg"
          />
          <div className="absolute inset-0 animate-ping">
            <AiOutlineLoading
              size={50}
              className="text-[var(--lavender)] opacity-20"
            />
          </div>
        </div>

        <p className="text-white text-lg font-medium animate-pulse">
          Please Wait
        </p>
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.1;
          }
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        }
      `}</style>
    </main>
  );
};

export default LoadingComponent;
