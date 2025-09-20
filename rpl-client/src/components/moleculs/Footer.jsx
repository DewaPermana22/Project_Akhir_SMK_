import {
  HeadsetIcon,
  MailIcon,
  MapPinnedIcon,
  UniversityIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <object
                className="max-w-[45px] lg:max-w-[65px] w-full h-auto object-contain drop-shadow-sm"
                data="/svg/NewLogoRPL.svg"
                type="image/svg+xml"
              ></object>
              <div className="flex flex-col justify-start ml-2">
                <p className="lg:text-base font-eudo-bold text-[var(--bg-light)] text-sm drop-shadow-sm">
                  Rekayasa Perangkat Lunak.
                </p>
                <span className="text-xs text-gray-400 lg:text-sm">
                  SMKN 8 JEMBER
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Jurusan Rekayasa Perangkat Lunak SMKN 8 Jember membentuk
              programmer profesional yang siap menghadapi tantangan industri
              teknologi.
            </p>
          </div>
          <div></div>
          <div>
            <h3 className="md:text-lg mb-4 text-[var(--bg-light)]">
              Kontak Kami
            </h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex text-sm items-start">
                <UniversityIcon size={20} className="mr-2" />
                Jalan Pelita No. 27 Semboro, Jember, Jawa Timur, Indonesia.
              </p>
              <p className="flex text-sm items-start">
                <MapPinnedIcon size={20} className="mr-2" />
                Labkom 1 RPL - SMKN 8 JEMBER
              </p>
              <p className="flex text-sm items-center">
                <HeadsetIcon size={20} className="mr-2" />
                (0331) 123456
              </p>
              <p className="flex text-sm items-center">
                <MailIcon size={20} className="mr-2" />
                info@rpl-smkn8jember.sch.id
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Rekayasa Perangkat Lunak - SMKN 8
            Jember. All rights reserved.
          </p>
          <p className="text-xs">Created & Developed by Shadewa Group</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
