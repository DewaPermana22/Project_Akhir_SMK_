import { getTodayDate } from "@/app/utils/get-today";
import { greetUser } from "@/app/utils/greeting-user";
import { closeSidebar, openSidebar } from "@/features/SidebarSlice";
import { HomeIcon, PanelLeftCloseIcon, PanelRightClose, PanelRightOpenIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const WrapperLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);

  const handleExpandColapse = () => {
    if (isOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center border-b py-4 px-5">
        <div className="flex items-center gap-5 ">
          <button
            onClick={handleExpandColapse}
            title={isOpen ? "Colapsed Sidebar" : "Expand Sidebar"}
            className="border-r space-x-3"
          >
            {isOpen ? (
              <PanelLeftCloseIcon
                size={25}
                className="cursor-pointer mr-3 text-[var(--purple)]"
              />
            ) : (
              <PanelRightClose
                size={25}
                className="cursor-pointer mr-3 text-[var(--purple)]"
              />
            )}
          </button>
          <h1 className="text-sm xl:text-base">
            {greetUser()}, {user.name}👋
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="xl:flex hidden items-center gap-3">
            <span className="text-xs text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
              {user.role}
            </span>{" "}
            /
            <span className="text-xs text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
              {getTodayDate()}
            </span>
          </div>
          <div>
            <button
              onClick={() => navigate("/")}
              title="Kembali ke Beranda"
              className="flex bg-[var(--blue)] font-medium p-1.5 rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors duration-200 ease-linear items-center gap-1 text-xs text-white"
            >
              <HomeIcon size={17} />
              Beranda
            </button>
          </div>
        </div>
      </nav>
      <main className="p-5">{children}</main>
    </main>
  );
};

export default WrapperLayout;
