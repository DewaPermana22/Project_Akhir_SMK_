import React from "react";

const NavbarNews = ({children}) => {
  return (
    <nav>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/40 via-white/60 to-purple-50/40 backdrop-blur-xl"></div>
      <div className="relative px-3 py-4 justify-between z-10 flex items-center">
        <div className="flex">
          <object
            className="max-w-[45px] lg:max-w-[65px] w-full h-auto object-contain drop-shadow-sm"
            data="/svg/NewLogoRPL.svg"
            type=""
          ></object>
          <div className="flex-col flex justify-start ml-2">
            <p className="lg:text-base text-transparent font-eudo-bold sm:text-[var(--blue)] text-sm drop-shadow-lg">
              Rekayasa Perangkat Lunak.
            </p>
            <span className="text-[10px] text-transparent sm:text-gray-500 lg:text-xs">
              SMKN 8 JEMBER
            </span>
          </div>
        </div>
        {children}
      </div>
    </nav>
  );
};

export default NavbarNews;
