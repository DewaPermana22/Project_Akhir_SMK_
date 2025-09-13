import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { setActiveMenu } from "../features/ActiveMenu";
import { closeSidebar, openSidebar } from "../features/SidebarSlice";
import Sidebar from "../components/moleculs/Sidebar";
import { mappMenu } from "../constants/menu-dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { menus, activeMenu } = useSelector((state) => state.menu);
  const { isOpen } = useSelector((state) => state.sidebar);

  const routeMenuMap = Object.fromEntries(
    Object.entries(mappMenu).map(([key, value]) => [value, key])
  );

  const handleMenuClick = (menuKey) => {
    dispatch(setActiveMenu(menuKey));
    const route = mappMenu[menuKey];
    if (route) {
      navigate(route);
    } else {
      console.log("No route found for:", menuKey);
    }
  };

  useEffect(() => {
    const currentMenuKey = routeMenuMap[location.pathname];
    if (currentMenuKey && currentMenuKey !== activeMenu) {
      dispatch(setActiveMenu(currentMenuKey));
    }
  }, [location.pathname, activeMenu, dispatch, routeMenuMap]);

  return (
    <div className="bg-slate-100 h-screen overflow-hidden flex">
      <Sidebar
        menus={menus}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isOpen={isOpen}
        onClose={() => dispatch(closeSidebar())}
      />
      <main className={`flex-1 overflow-y-auto p-3 h-screen`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
