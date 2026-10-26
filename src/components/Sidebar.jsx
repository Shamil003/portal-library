import { Home, BarChart3, BarChart2, MapPin, Settings, Library, FileEdit, AlertTriangle, Users, BookOpen } from "lucide-react";
import gerbLogo from "../assets/gerb.svg";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 0;

  const menuItems = [
    { id: "home", label: t("nav_home"), icon: Home, roles: [1, 2, 3, 4] },
    { id: "rep", label: t("nav_reports"), icon: BarChart3, roles: [1, 2, 3, 4] },
    { id: "edit-requests", label: t("nav_editRequests"), icon: FileEdit, roles: [1, 2, 3, 4] },
    { id: "stats", label: t("nav_stats"), icon: BarChart2, roles: [1, 2, 3, 4] },
    { id: "map", label: t("nav_map"), icon: MapPin, roles: [1, 2, 3, 4] },
    { id: "libraries", label: t("nav_libraries"), icon: Library, roles: [1, 2, 3, 4] },
    { id: "deadlines", label: t("nav_deadlines"), icon: AlertTriangle, roles: [1, 2, 3, 4] },
    { id: "users", label: "Пользователи", icon: Users, roles: [1, 2] },
    { id: "tasks", label: "Задания", icon: BookOpen, roles: [1] },
    { id: "settings", label: t("nav_settings"), icon: Settings, roles: [1, 2] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#1C3458] p-6 text-white">
      <div className="mb-8 flex items-center gap-3">
        <img src={gerbLogo} alt="Герб" className="h-10 w-10 rounded-full bg-white object-contain p-0.5" />
        <p className="text-[12px] font-bold leading-tight whitespace-pre-line">{t("portal_title")}</p>
      </div>
      <nav className="flex-1 space-y-2">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 ${isActive ? "cursor-default bg-[#1e3a5f]" : "cursor-pointer hover:bg-[#8ea2b7]"}`}
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