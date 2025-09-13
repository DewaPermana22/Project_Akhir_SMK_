import * as LucideIcons from "lucide-react";

const MenuSidebar = ({ menu, activeMenu, onClick }) => {
  const Icon = LucideIcons[menu.icon];

  return (
    <li
      className={`flex items-center gap-3 ${
        activeMenu === menu.key
          ? "bg-[var(--lime)] text-[var(--indigo-dark)]"
          : "text-white"
      } p-2 rounded-lg text-sm font-eudo-bold cursor-pointer`}
      onClick={() => onClick(menu.key)}
    >
      <Icon size={18} />
      {menu.text}
    </li>
  );
};

export default MenuSidebar;
