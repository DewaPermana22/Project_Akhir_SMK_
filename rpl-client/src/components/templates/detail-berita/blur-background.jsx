import React, { useEffect, useState } from 'react';

const BlurBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-700 ease-out"
          style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-15 blur-2xl animate-ping" style={{ animationDuration: '4s' }} />
      </div>

      <div 
        className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none -z-5 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
    </>
  );
};

export default BlurBackground;