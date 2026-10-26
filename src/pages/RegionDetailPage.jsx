import { useState } from "react";
import { Library } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedSearch from "../components/AnimatedSearch";
import { useLanguage } from "../context/LanguageContext";

export const RegionDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, t } = useLanguage();
  const region = location.state?.region;
  const [search, setSearch] = useState("");

  // Функция для перевода названий библиотек на лету
  const translateLibraryName = (name) => {
    if (!name) return name;
    if (lang === "ru") {
      return name
        .replace(/Китепкананын аты/gi, "Название библиотеки")
        .replace(/китепкана/gi, "библиотека")
        .replace(/Китепкана/gi, "Библиотека")
        .replace(/борбордук/gi, "центральная")
        .replace(/Борбордук/gi, "Центральная")
        .replace(/райондук/gi, "районная");
    } else {
      return name
        .replace(/Название библиотеки/gi, "Китепкананын аты")
        .replace(/библиотека/gi, "китепкана")
        .replace(/Библиотека/gi, "Китепкана")
        .replace(/центральная/gi, "борбордук")
        .replace(/Центральная/gi, "Борбордук")
        .replace(/районная/gi, "райондук");
    }
  };

  const librariesList = [
    { id: 1, name: "Баланчаев Баланча а. китепкана", status: t("lib_not_ready"), badge: "4 / 5", isReady: false, completedCards: [1, 2, 3, 4], totalCards: 5 },
    { id: 2, name: "Китепкананын аты", status: t("lib_ready"), badge: "1 / 1", isReady: true, completedCards: [1], totalCards: 1 },
    { id: 3, name: "Китепкананын аты", status: t("lib_not_ready"), badge: "1 / 3", isReady: false, completedCards: [2], totalCards: 3 },
    { id: 4, name: "Китепкананын аты", status: t("lib_not_ready"), badge: "1 / 4", isReady: false, completedCards: [1], totalCards: 4 },
    { id: 5, name: "Китепкананын аты", status: t("lib_ready"), badge: "7 / 7", isReady: true, completedCards: [1, 2, 3, 4, 5, 6, 7], totalCards: 7 },
    { id: 6, name: "Китепкананын аты", status: t("lib_ready"), badge: "7 / 7", isReady: true, completedCards: [1, 2, 3, 4, 5, 6, 7], totalCards: 7 },
    { id: 7, name: "Китепкананын аты", status: t("lib_ready"), badge: "6 / 6", isReady: true, completedCards: [1, 2, 3, 4, 5, 6], totalCards: 6 },
    { id: 8, name: "Китепкананын аты", status: t("lib_ready"), badge: "2 / 2", isReady: true, completedCards: [1, 2], totalCards: 2 },
    { id: 9, name: "Китепкананын аты", status: t("lib_ready"), badge: "9 / 9", isReady: true, completedCards: [1, 2, 3, 4, 5, 6, 7, 8, 9], totalCards: 9 },
    { id: 10, name: "Китепкананын аты", status: t("lib_not_ready"), badge: "3 / 9", isReady: false, completedCards: [1, 4, 7], totalCards: 9 },
    { id: 11, name: "Китепкананын аты", status: t("lib_ready"), badge: "3 / 3", isReady: true, completedCards: [1, 2, 3], totalCards: 3 },
    { id: 12, name: "Китепкананын аты", status: t("lib_ready"), badge: "5 / 5", isReady: true, completedCards: [1, 2, 3, 4, 5], totalCards: 5 },
  ];

  const filteredLibraries = librariesList.filter((lib) => lib.name.toLowerCase().includes(search.toLowerCase()));

  const handleLibraryClick = (library) => {
    navigate("/another", { state: { region, library } });
  };

  const handleBack = () => {
    navigate("/libraries");
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
        <span onClick={handleBack} className="cursor-pointer transition hover:text-blue-600">{t("lib_title")}</span>
        <span className="text-gray-400">/</span>
        <span className="font-bold text-slate-800">{region?.name || t("reg_osh")}</span>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] font-semibold uppercase text-gray-500">{t("lib_total")}</p>
          <div className="mt-1 text-2xl font-bold">{region?.count || "1,789"}</div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />
      </div>

      <AnimatedSearch value={search} onChange={setSearch} />

      <div className="mt-6 space-y-3">
        {filteredLibraries.map((lib) => (
          <div key={lib.id} onClick={() => handleLibraryClick(lib)} className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 px-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="min-w-[180px]">
              {/* Применяем функцию перевода к названию библиотеки */}
              <p className="text-sm font-semibold text-slate-800">{translateLibraryName(lib.name)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold ${lib.isReady ? "text-emerald-600" : "text-slate-600"}`}>{lib.status}</span>
              <span className={`min-w-[55px] rounded-full border px-4 py-1.5 text-center text-xs font-semibold ${lib.isReady ? "border-emerald-100 bg-emerald-50 text-emerald-600" : "border-slate-200 bg-slate-50 text-slate-600"}`}>{lib.badge}</span>
            </div>
          </div>
        ))}

        {filteredLibraries.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-gray-500">{t("lib_not_found")}</p>
          </div>
        )}
      </div>
    </div>
  );
};