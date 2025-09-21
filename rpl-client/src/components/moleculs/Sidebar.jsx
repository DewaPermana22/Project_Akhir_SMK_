import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuSidebar from '../atoms/MenuSidebar';
import * as LucideIcons from "lucide-react";
import { toggleSection } from '@/features/ActiveMenu';
import SidebarFooter from "../atoms/sidebar/sidebar-footer";
import SidebarHeader from "../atoms/sidebar/sidebar-header";
import LogoutConfirmationModal from "./modal&alert/LogoutConfirmationModal";

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
            className="flex items-center justify-between w-full p-3 rounded-md cursor-pointer text-gray-500 transition-colors duration-200"
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
             transition-all duration-300 ease-in-out
            ${isExpanded ? "opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <ul className="ml-6 mt-2 space-y-2">
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
     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`
          bg-white shadow-2xs h-screen fixed xl:static top-0 left-0 z-50
          flex-shrink-0 overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? "w-[270px] translate-x-0" 
            : "w-0 xl:w-0 -translate-x-full xl:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col justify-between h-full w-[270px] p-5">
          <SidebarHeader eventClick={onClose}/>
          <div className="flex-1 overflow-y-auto mt-7">
            <ul className="flex flex-col gap-3">
              {menus.map(renderMenuItem)}
            </ul>
          </div>
          <SidebarFooter/>
        </div>
      </aside>
      <LogoutConfirmationModal/>
    </>
  );
};

export default Sidebar;