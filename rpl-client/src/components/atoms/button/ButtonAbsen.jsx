import React from "react";

const ButtonAbsensi = ({ icon, text, isDisabled = false, onAbsen }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onAbsen}
        disabled={isDisabled}
        className="bg-white  border backdrop-blur-sm shadow-md hover:bg-[var(--blue)] hover:text-white trasnision-colors ease-linear duration-200 cursor-pointer
         disabled:bg-gray-200 disabled:text-gray-700 text-[var(--blue)] p-5 rounded-lg"
      >
        {icon}
      </button>
      <p className="text-sm text-gray-700 font-eudo-bold">{text}</p>
    </div>
  );
};

export default ButtonAbsensi;
