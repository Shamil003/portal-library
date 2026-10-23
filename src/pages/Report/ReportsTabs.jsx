import { useState } from "react";
import { BarChart3, CalendarDays } from "lucide-react";

import ReportPage from "./ReportPage";
import QuarterlyReportPage from "./QuarterlyReportPage";

// 1. Квартальный всегда первый в списке табов
const tabs = [
  { id: "quarter", label: "Кварталдык", icon: <CalendarDays size={18} /> },
  { id: "stat", label: "Статистикалык", icon: <BarChart3 size={18} /> },
];

const ReportsTabs = () => {
  // 2. Жестко задаем "quarter" по умолчанию. 
  // Он будет открываться ВСЕГДА при входе на страницу.
  const [activeTab, setActiveTab] = useState("quarter");

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Табы сверху */}
        <div className="mb-6 inline-flex gap-1 rounded-2xl border border-[#E3E8EF] bg-white p-1.5 shadow-[0_2px_12px_rgba(28,52,88,0.06)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#1C3458] text-white shadow-[0_4px_12px_rgba(28,52,88,0.2)]"
                    : "text-[#48556A] hover:bg-[#F3F6FA]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "stat" ? <ReportPage /> : <QuarterlyReportPage />}
      </div>
    </div>
  );
};

export default ReportsTabs;