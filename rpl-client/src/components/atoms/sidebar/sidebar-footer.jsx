import LogoutConfirmationModal from "@/components/moleculs/modal&alert/LogoutConfirmationModal";
import { openModalConfirmLogout } from "@/features/modals/ConfirmLogoutModalSlice";
import { CircleUserRoundIcon, DoorOpenIcon } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SidebarFooter = () => {
    const dispatch = useDispatch();
  return (
    <>
    <div className="flex-shrink-0 mt-auto">
      <ul className="flex flex-col">
        <Link
          to="profile"
          className="text-white flex gap-3 cursor-pointer hover:bg-[var(--indigo-light)] p-3 rounded-md transition-colors duration-200"
        >
          <CircleUserRoundIcon size={20} /> Profile
        </Link>
        <li
          onClick={() => dispatch(openModalConfirmLogout())}
          className="text-red-500 flex gap-3 cursor-pointer hover:bg-red-500/10 p-3 rounded-md transition-colors duration-200"
        >
          <DoorOpenIcon size={20} />
          Logout
        </li>
      </ul>
    </div>
    <LogoutConfirmationModal/>
    </>
  );
};

export default SidebarFooter;
