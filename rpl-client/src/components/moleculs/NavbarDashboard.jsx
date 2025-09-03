import * as LucideIcons from "lucide-react";
import { getTodayDate } from "../../app/utils/get-today";
import { greetUser } from "../../app/utils/greeting-user";

const NavbarDashboard = ({ user, onOpenSidebar }) => {
  return (
    <nav className="w-full fixed xl:static z-10 flex justify-between px-5 items-center text-white h-16 bg-[var(--indigo-dark)] border-b border-b-[var(--gray-1)]">
      <div className="flex items-center gap-5 xl:gap-0">
        <LucideIcons.MenuIcon
          onClick={onOpenSidebar}
          size={20}
          className="block text-[var(--lime)] cursor-pointer xl:hidden"
        />
        <div className="flex flex-col">
          <h1 className="text-sm xl:text-base">
            {greetUser()}, {user.name}👋
          </h1>
          <p className="text-[10px] xl:text-xs text-[var(--lavender)]">
            12/RPL/20230514008
          </p>
        </div>
      </div>
      <div className="xl:flex hidden items-center gap-3">
        <span className="text-xs text-[var(--lime)] bg-[rgba(201,250,117,0.15)] px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
          {user.role}
        </span>{" "}
        /
        <span className="text-xs text-[var(--lime)] bg-[rgba(201,250,117,0.15)] px-2.5 py-1 rounded-lg font-eudoxsussans-regular max-w-fit">
          {getTodayDate()}
        </span>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
