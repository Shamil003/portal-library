import { Home, BarChart3, BarChart2, MapPin, Settings, Library, FileEdit, AlertTriangle } from "lucide-react";
import gerbLogo from "../assets/gerb.svg";
import { useLanguage } from "../context/LanguageContext";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: "home", label: t("nav_home"), icon: Home },
    { id: "rep", label: t("nav_reports"), icon: BarChart3 },
    { id: "edit-requests", label: t("nav_editRequests"), icon: FileEdit },
    { id: "stats", label: t("nav_stats"), icon: BarChart2 },
    { id: "map", label: t("nav_map"), icon: MapPin },
    { id: "settings", label: t("nav_settings"), icon: Settings },
    { id: "libraries", label: t("nav_libraries"), icon: Library },
    { id: "deadlines", label: t("nav_deadlines"), icon: AlertTriangle },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#1C3458] p-6 text-white">
      <div className="mb-8 flex items-center gap-3">
        <img src={gerbLogo} alt="Герб" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
        <p className="text-[12px] font-bold leading-tight whitespace-pre-line">{t("portal_title")}</p>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button key={item.id} type="button" onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 ${isActive ? "cursor-default bg-[#1e3a5f]" : "cursor-pointer hover:bg-[#8ea2b7]"}`}>
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};