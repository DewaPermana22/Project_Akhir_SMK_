import { X } from "lucide-react";
import React from "react";

const SidebarHeader = ({ eventClick, classnames }) => {
  return (
    <div className={`flex items-center flex-shrink-0 ${classnames}`}>
      <object
        className="max-w-[50px] w-full h-auto object-contain"
        data="/svg/NewLogoRPL.svg"
        type=""
      />
      <div className="flex flex-col justify-start">
        <p className="font-bold text-[var(--blue)] text-sm">
          SIA RPLSMKDJ.
        </p>
        <span className="text-xs text-neutral-700">
          SISTEM INFORMASI AKADEMIK
        </span>
      </div>
      <X
        onClick={eventClick}
        size={20}
        className="absolute xl:hidden block top-5 right-5 text-[var(--blue)] cursor-pointer"
      />
    </div>
  );
};

export default SidebarHeader;
