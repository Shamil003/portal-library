import {
  Home,
  FileText,
  BarChart2,
  MapPin,
  Settings,
  Library,
} from "lucide-react";

import gerbLogo from "../assets/gerb.svg";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: "home",
      label: "Башкы бет",
      icon: Home,
    },
    {
      id: "rep",
      label: "Айлык отчёттор",
      icon: FileText,
    },
    {
      id: "yearly",
      label: "Жылдык отчёттор",
      icon: FileText,
    },
    {
      id: "stats",
      label: "Статистика",
      icon: BarChart2,
    },
    {
      id: "map",
      label: "Карта",
      icon: MapPin,
    },
    {
      id: "settings",
      label: "Жөндөмөлөр",
      icon: Settings,
    },
    {
      id: "libraries",
      label: "Китепканалар",
      icon: Library,
    },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#1C3458] p-6 text-white">
      {/* Логотип */}
      <div className="mb-8 flex items-center gap-3">
        <img
          src={gerbLogo}
          alt="Кыргыз Республикасынын герби"
          className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
        />

        <p className="text-[12px] font-bold leading-tight">
          Кыргыз Республикасынын
          <br />
          китепканалар аралык
          <br />
          порталы
        </p>
      </div>

      {/* Меню */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                p-3
                text-left
                transition-all
                duration-200
                ${
                  isActive
                    ? "cursor-default bg-[#1e3a5f]"
                    : "cursor-pointer hover:bg-[#8ea2b7]"
                }
              `}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};