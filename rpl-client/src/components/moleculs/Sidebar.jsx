import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuSidebar from "../atoms/MenuSidebar";
import * as LucideIcons from "lucide-react";
import { openModalConfirm } from "../../features/modals/ConfirmModalSlice";
import { toggleSection } from "../../features/ActiveMenu";
import ConfirmationModal from "./ConfirmationModal";

const Sidebar = ({ isOpen, onClose, onMenuClick }) => {
  const dispatch = useDispatch();
  const { menus, activeMenu, expandedSections } = useSelector(
    (state) => state.menu
  );

  const handleMenuClick = (menuKey, menuType, hasChildren) => {
    if (menuType === "section" && hasChildren) {
      dispatch(toggleSection(menuKey));
    } else if (menuType === "item" || menuType === null) {
      if (onMenuClick) {
        onMenuClick(menuKey);
      }
    }
  };

  const renderMenuItem = (menu) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedSections[menu.key];

    if (menu.type === "section" && hasChildren) {
      return (
        <li key={menu.key} className="w-full min-h-0 overflow-hidden">
          <div
            onClick={() => handleMenuClick(menu.key, menu.type, hasChildren)}
            className="flex items-center justify-between w-full p-3 rounded-md cursor-pointer hover:bg-[var(--indigo-light)] text-white transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              {LucideIcons[menu.icon] &&
                React.createElement(LucideIcons[menu.icon], { size: 18 })}
              <span className="text-sm font-eudo-bold">{menu.text}</span>
            </div>
            {isExpanded ? (
              <LucideIcons.ChevronDown size={16} />
            ) : (
              <LucideIcons.ChevronRight size={16} />
            )}
          </div>
          <div
            className={`
            overflow-scroll transition-all duration-300 ease-in-out
            ${isExpanded ? "max-h-56 opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <ul className="ml-6 mt-2 space-y-2 overflow-y-scroll">
              {menu.children.map((child) => (
                <MenuSidebar
                  key={child.key}
                  menu={child}
                  activeMenu={activeMenu}
                  onClick={() => handleMenuClick(child.key, child.type, false)}
                />
              ))}
            </ul>
          </div>
        </li>
      );
    }
    return (
      <MenuSidebar
        key={menu.key}
        menu={menu}
        activeMenu={activeMenu}
        onClick={() => handleMenuClick(menu.key, menu.type, false)}
      />
    );
  };

  return (
    <>
      <aside
        className={`
          bg-[var(--indigo-dark)] h-screen fixed xl:static top-0 left-0 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          xl:translate-x-0
          max-w-[280px] w-full p-5 border-r border-r-[var(--gray-1)]
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center">
            <object
              className="max-w-[50px] w-full h-auto object-contain"
              data="/svg/Logo-Transparent.svg"
              type=""
            />
            <div className="flex flex-col justify-start">
              <p className="font-bold text-[var(--lavender)] text-sm">
                SIA RPLSMKDJ.
              </p>
              <span className="text-[11px] text-white">
                SISTEM INFORMASI AKADEMIK
              </span>
            </div>
            <LucideIcons.X
              onClick={onClose}
              size={20}
              className="absolute xl:hidden block top-5 right-5 text-[var(--lime)] cursor-pointer"
            />
          </div>

          {/* Menu */}
          <ul className="flex mt-7 overflow-y-scroll h-full flex-col gap-3">
            {menus.map(renderMenuItem)}
          </ul>

          {/* Footer */}
          <ul className="flex bg-[var(--indigo-dark)] right-0 left-0 fixed bottom-0 flex-col flex-shrink-0">
            <li className="text-white flex gap-3 cursor-pointer hover:bg-[var(--indigo-light)] p-3 rounded-md transition-colors duration-200">
              <LucideIcons.CircleUserRound size={20} /> Profile
            </li>
            <li
              onClick={() => dispatch(openModalConfirm())}
              className="text-red-500 flex gap-3 cursor-pointer hover:bg-red-500/10 p-3 rounded-md transition-colors duration-200"
            >
              <LucideIcons.DoorOpen size={20} />
              Logout
            </li>
          </ul>
        </div>
      </aside>

      <ConfirmationModal />
    </>
  );
};

export default Sidebar;
