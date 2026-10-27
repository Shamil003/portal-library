import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  TrendingUp,
  Monitor,
} from "lucide-react";

import {
  computeKpi,
  groupByMonth,
  groupByRegion,
  statusBreakdown,
  visitorsBreakdown,
  formatNumber,
} from "../../utils/stats";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { getLibraries } from "../../utils/mockUsers";

const STORAGE_KEY = "allReports"; 

const Stats = () => {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  
  const [reports, setReports] = useState([]);
  const [allLibraries, setAllLibraries] = useState([]);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setReports(saved);
    setAllLibraries(getLibraries());
  }, []);

  const visibleReports = useMemo(() => {
    if (!user) return [];
    if (user.role === 1) return reports; 
    
    if (user.role === 2) {
      return reports.filter(r => {
        if (r.region === user.region) return true;
        const lib = allLibraries.find(l => l.name === r.library);
        return lib?.parentId === user.libraryId;
      });
    }
    
    return reports.filter(r => r.library === user.libraryName);
  }, [reports, user, allLibraries]);

  const filtered = useMemo(() => {
    if (period === "all") return visibleReports;
    const now = new Date();
    const monthsBack = period === "6m" ? 6 : 3;
    const cutoff = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
    return visibleReports.filter((r) => {
      const src = r.deadline || r.date;
      if (!src) return false;
      return new Date(src) >= cutoff;
    });
  }, [visibleReports, period]);

  const kpi = useMemo(() => computeKpi(filtered), [filtered]);
  const months = useMemo(() => groupByMonth(filtered), [filtered]);
  
  const translateRegion = (regionName) => {
    if (!regionName) return regionName;
    const regionMap = {
      "Баткен облусу": "reg_batken", "Чүй облусу": "reg_chuy", "Жалал-Абад облусу": "reg_jalal_abad",
      "Нарын облусу": "reg_naryn", "Ош облусу": "reg_osh", "Талас облусу": "reg_talas",
      "Ысык-Көл облусу": "reg_issyk_kul", "Бишкек шаары": "reg_bishkek", "Ош шаары": "reg_osh_city",
      "Баткенская область": "reg_batken", "Чуйская область": "reg_chuy", "Джалал-Абадская область": "reg_jalal_abad",
      "Нарынская область": "reg_naryn", "Ошская область": "reg_osh", "Таласская область": "reg_talas",
      "Иссык-Кульская область": "reg_issyk_kul", "город Бишкек": "reg_bishkek", "город Ош": "reg_osh_city",
      "Кыргызстан": "reg_kyrgyzstan",
    };
    const key = regionMap[regionName];
    return key ? t(key) : regionName;
  };

  const regions = useMemo(() => {
    const rawRegions = groupByRegion(filtered);
    return rawRegions.map(r => ({
      ...r,
      region: translateRegion(r.region)
    }));
  }, [filtered, lang]); 

  const statuses = useMemo(() => statusBreakdown(filtered, lang), [filtered, lang]);
  const visitors = useMemo(() => visitorsBreakdown(filtered, lang), [filtered, lang]);

  if (visibleReports.length === 0) {
    return (
      <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
        <div className="mx-auto max-w-[1200px]">
          <EmptyState t={t} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
              <BarChart3 size={24} className="text-[#1C3458]" />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold text-[#1C3458]">{t("stats_title")}</h1>
              <p className="mt-1 text-sm text-[#8A93A3]">{t("stats_desc")}</p>
            </div>
          </div>

          <div className="flex rounded-xl border border-[#E3E7EE] bg-[#F8F9FB] p-1">
            {[
              { key: "all", label: t("stats_all") },
              { key: "6m", label: t("stats_6m") },
              { key: "quarter", label: t("stats_quarter") },
            ].map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPeriod(p.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  period === p.key ? "bg-white text-[#1C3458] shadow-sm" : "text-[#8992A3] hover:text-[#1C3458]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard icon={<BarChart3 size={20} />} label={t("stats_total_reports")} value={kpi.total} accent="#1C3458" />
          <KpiCard icon={<CheckCircle2 size={20} />} label={t("stats_on_time")} value={`${kpi.onTimePercent}%`} hint={`${kpi.onTime} / ${kpi.total}`} accent="#20A35A" />
          <KpiCard icon={<BookOpen size={20} />} label={t("stats_total_visits")} value={formatNumber(kpi.visitors, lang)} hint={`${t("stats_virtual")}: ${formatNumber(kpi.virtualVisits, lang)}`} accent="#3B6EA5" />
          <KpiCard icon={<AlertTriangle size={20} />} label={t("stats_overdue")} value={kpi.overdue} accent="#DC2626" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard icon={<Users size={20} />} label={t("stats_users")} value={formatNumber(kpi.users, lang)} accent="#1C3458" />
          <KpiCard icon={<CalendarDays size={20} />} label={t("stats_events")} value={formatNumber(kpi.events, lang)} accent="#F59E0B" />
          <KpiCard icon={<Monitor size={20} />} label={t("stats_virtual")} value={formatNumber(kpi.virtualVisits, lang)} accent="#3B6EA5" />
          <KpiCard icon={<TrendingUp size={20} />} label={t("stats_regions")} value={regions.length} accent="#20A35A" />
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#1C3458]">{t("stats_dynamics")}</h2>
              <p className="mt-1 text-sm text-[#8992A3]">{t("stats_dynamics_desc")}</p>
            </div>
          </div>
          <MonthlyChart data={months} lang={lang} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)] lg:col-span-2">
            <h2 className="mb-1 text-[18px] font-semibold text-[#1C3458]">{t("stats_by_region")}</h2>
            <p className="mb-5 text-sm text-[#8992A3]">{t("stats_by_region_desc")}</p>
            <RegionsList data={regions} t={t} lang={lang} />
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
            <h2 className="mb-1 text-[18px] font-semibold text-[#1C3458]">{t("stats_status")}</h2>
            <p className="mb-5 text-sm text-[#8992A3]">{t("stats_status_desc")}</p>
            <Donut data={statuses} t={t} />
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <h2 className="mb-1 text-[18px] font-semibold text-[#1C3458]">{t("stats_visitors")}</h2>
          <p className="mb-5 text-sm text-[#8992A3]">{t("stats_visitors_desc")}</p>
          <StackedBar data={visitors} t={t} lang={lang} />
        </div>

        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="border-b border-[#E7EBF0] px-6 py-5">
            <h2 className="text-[18px] font-semibold text-[#1C3458]">{t("stats_table")}</h2>
            <p className="mt-1 text-sm text-[#8992A3]">{t("stats_table_desc")}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#E7EBF0] bg-[#FAFBFC] text-xs uppercase text-[#8992A3]">
                  <th className="px-6 py-3 font-medium">{t("stats_col_region")}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("stats_col_reports")}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("stats_col_visits")}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("stats_col_users")}</th>
                  <th className="px-6 py-3 font-medium text-right">{t("stats_col_overdue")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7EBF0]">
                {regions.map((r) => (
                  <tr key={r.region} className="transition hover:bg-[#FAFBFC]">
                    <td className="px-6 py-4 font-medium text-[#1C3458]">{r.region}</td>
                    <td className="px-6 py-4 text-right text-[#1C3458]">{r.reports}</td>
                    <td className="px-6 py-4 text-right text-[#1C3458]">{formatNumber(r.visitors, lang)}</td>
                    <td className="px-6 py-4 text-right text-[#1C3458]">{formatNumber(r.users, lang)}</td>
                    <td className="px-6 py-4 text-right">
                      {r.overdue > 0 ? (
                        <span className="rounded-lg bg-[#FEF2F2] px-2 py-1 text-xs font-medium text-[#B91C1C]">{r.overdue}</span>
                      ) : (
                        <span className="text-[#20A35A]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ icon, label, value, hint, accent = "#1C3458" }) => (
  <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}15`, color: accent }}>
        {icon}
      </div>
      <p className="text-sm text-[#8992A3]">{label}</p>
    </div>
    <p className="mt-3 text-2xl font-semibold text-[#1C3458]">{value}</p>
    {hint && <p className="mt-1 text-xs text-[#8992A3]">{hint}</p>}
  </div>
);

const MonthlyChart = ({ data, lang }) => {
  const max = Math.max(...data.map((d) => d.visitors), 1);
  return (
    <div className="flex h-[240px] items-end gap-3 sm:gap-4">
      {data.map((m) => {
        const h = (m.visitors / max) * 100;
        return (
          <div key={m.key} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-full w-full items-end justify-center">
              <div className="w-full max-w-[56px] rounded-t-lg bg-gradient-to-t from-[#1C3458] to-[#3B6EA5] transition-all duration-300 group-hover:from-[#294873] group-hover:to-[#4A7FB8]" style={{ height: `${h}%`, minHeight: m.visitors > 0 ? 6 : 2 }}>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1C3458] px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                  {formatNumber(m.visitors, lang)}
                </div>
              </div>
            </div>
            <p className="text-xs font-medium text-[#8992A3]">{m.label}</p>
          </div>
        );
      })}
    </div>
  );
};

const RegionsList = ({ data, t, lang }) => {
  const top = data.slice(0, 6);
  const max = Math.max(...top.map((r) => r.visitors), 1);
  if (top.length === 0) return <p className="py-6 text-center text-sm text-[#8992A3]">{t("stats_no_data")}</p>;

  return (
    <div className="space-y-3">
      {top.map((r, i) => {
        const w = (r.visitors / max) * 100;
        return (
          <div key={r.region} className="flex items-center gap-3">
            <span className="w-6 text-xs font-semibold text-[#8992A3]">{i + 1}</span>
            <div className="w-[130px] shrink-0 truncate text-sm font-medium text-[#1C3458]">{r.region}</div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1F4F8]">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1C3458] to-[#3B6EA5] transition-all duration-500" style={{ width: `${w}%` }} />
            </div>
            <span className="w-[70px] text-right text-sm font-medium text-[#1C3458]">{formatNumber(r.visitors, lang)}</span>
          </div>
        );
      })}
    </div>
  );
};

const Donut = ({ data, t }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const size = 180, stroke = 22, radius = (size - stroke) / 2, circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F4F8" strokeWidth={stroke} />
          {total > 0 && data.map((d) => {
            if (d.value === 0) return null;
            const len = (d.value / total) * circumference;
            const dasharray = `${len} ${circumference - len}`;
            const dashoffset = -offset;
            offset += len;
            return <circle key={d.key} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={dasharray} strokeDashoffset={dashoffset} strokeLinecap="butt" />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-[#1C3458]">{total}</span>
          <span className="text-xs text-[#8992A3]">{t("stats_report")}</span>
        </div>
      </div>
      <div className="w-full space-y-2">
        {data.map((d) => (
          <div key={d.key} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-[#48556A]">{d.label}</span>
            </div>
            <span className="font-medium text-[#1C3458]">
              {d.value}
              <span className="ml-1 text-xs text-[#8992A3]">({total ? Math.round((d.value / total) * 100) : 0}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StackedBar = ({ data, t, lang }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <p className="py-6 text-center text-sm text-[#8992A3]">{t("stats_no_data")}</p>;

  return (
    <div>
      <div className="flex h-10 w-full overflow-hidden rounded-xl bg-[#F1F4F8]">
        {data.map((d) => {
          const w = (d.value / total) * 100;
          if (w === 0) return null;
          return <div key={d.key} className="h-full transition-all duration-500" style={{ width: `${w}%`, backgroundColor: d.color }} title={`${d.label}: ${d.value}`} />;
        })}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.map((d) => (
          <div key={d.key} className="rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-[#8992A3]">{d.label}</span>
            </div>
            <p className="mt-1.5 text-lg font-semibold text-[#1C3458]">{formatNumber(d.value, lang)}</p>
            <p className="text-xs text-[#8992A3]">{total ? Math.round((d.value / total) * 100) : 0}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyState = ({ t }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-16 text-center shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF1FA]">
      <BarChart3 size={32} className="text-[#1C3458]" />
    </div>
    <h2 className="text-[18px] font-semibold text-[#1C3458]">{t("stats_empty")}</h2>
    <p className="mt-2 max-w-md text-sm text-[#8992A3]">{t("stats_empty_desc")}</p>
  </div>
);

export default Stats;