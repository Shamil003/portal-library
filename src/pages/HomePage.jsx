import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Library,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Plus,
  BarChart3,
  Clock3,
  FileEdit,
  ArrowRight,
  CalendarDays,
  Users,
} from "lucide-react";

import {
  getDeadlineStatus,
  formatDeadline,
  formatTimeLeft,
  deadlineStyles,
} from "../utils/deadline";

const REPORTS_KEY = "libraryReports";
const REQUESTS_KEY = "editRequests";

export const HomePage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    try {
      setReports(JSON.parse(localStorage.getItem(REPORTS_KEY) || "[]"));
      setRequests(JSON.parse(localStorage.getItem(REQUESTS_KEY) || "[]"));
    } catch {
      setReports([]);
      setRequests([]);
    }
  }, []);

  const stats = useMemo(() => {
    const total = reports.length;
    const sent = reports.filter((r) => r.status === "Отправлен").length;
    const editing = reports.filter(
      (r) => r.status === "На редактировании",
    ).length;
    const overdue = reports.filter(
      (r) => getDeadlineStatus(r.deadline).status === "overdue",
    ).length;
    const libraries = new Set(reports.map((r) => r.library)).size;
    const pendingRequests = requests.filter((r) => r.status === "pending").length;

    return { total, sent, editing, overdue, libraries, pendingRequests };
  }, [reports, requests]);

  // Ближайшие дедлайны
  const upcoming = useMemo(() => {
    return [...reports]
      .filter((r) => r.deadline)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .filter((r) => getDeadlineStatus(r.deadline).status !== "upcoming")
      .slice(0, 3);
  }, [reports]);

  // Последние отправленные
  const recent = useMemo(() => {
    return [...reports]
      .filter((r) => r.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [reports]);

  // Данные для мини-графика по месяцам
  const monthly = useMemo(() => {
    const now = new Date();
    const buckets = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleDateString("ru-RU", { month: "short" }),
        count: 0,
      });
    }

    reports.forEach((r) => {
      const src = r.date || r.deadline;
      if (!src) return;
      const d = new Date(src);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const b = buckets.find((x) => x.key === key);
      if (b) b.count += 1;
    });

    return buckets;
  }, [reports]);

  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* 1. Приветствие */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1C3458] to-[#3B6EA5] p-6 text-white shadow-[0_4px_20px_rgba(28,52,88,0.15)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">{today}</p>
            <h1 className="mt-1 text-2xl font-semibold">
              Салам, {user?.name || "колдонуучу"}!
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Бүгүнкү күндүн кыскача статистикасы
            </p>
          </div>

          <button
            onClick={() => navigate("/rep")}
            className="flex items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-medium text-[#1C3458] shadow-sm transition hover:bg-[#F3F6FA] sm:self-auto"
          >
            <Plus size={18} />
            Жаңы отчёт түзүү
          </button>
        </div>
      </div>

      {/* 2. KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard
          icon={<FileText size={20} />}
          label="Бардык отчёттор"
          value={stats.total}
          color="#1C3458"
          onClick={() => navigate("/reports")}
        />
        <KpiCard
          icon={<CheckCircle2 size={20} />}
          label="Жөнөтүлгөн"
          value={stats.sent}
          color="#20A35A"
          onClick={() => navigate("/reports")}
        />
        <KpiCard
          icon={<FileEdit size={20} />}
          label="Редактирлөөдө"
          value={stats.editing}
          color="#F59E0B"
        />
        <KpiCard
          icon={<AlertTriangle size={20} />}
          label="Мөөнөтү өткөн"
          value={stats.overdue}
          color="#DC2626"
          onClick={() => navigate("/deadlines")}
        />
        <KpiCard
          icon={<Library size={20} />}
          label="Китепканалар"
          value={stats.libraries}
          color="#3B6EA5"
          onClick={() => navigate("/libraries")}
        />
      </div>

      {/* 3. Срочные дедлайны + быстрые действия */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#1C3458]">
                Жакын арада мөөнөтү бүтөт
              </h2>
              <p className="mt-1 text-sm text-[#8992A3]">
                Кызыл — мөөнөтү өткөн, сары — жакында
              </p>
            </div>
            <button
              onClick={() => navigate("/deadlines")}
              className="flex items-center gap-1 text-sm font-medium text-[#1C3458] hover:underline"
            >
              Баары
              <ArrowRight size={16} />
            </button>
          </div>

          {upcoming.length === 0 ? (
            <div className="rounded-xl bg-[#F0FBF4] p-4 text-center">
              <CheckCircle2
                size={24}
                className="mx-auto mb-2 text-[#20A35A]"
              />
              <p className="text-sm font-medium text-[#167A42]">
                Бардык отчёттор убагында тапшырылган
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcoming.map((r) => {
                const dl = getDeadlineStatus(r.deadline);
                const style = deadlineStyles[dl.status];

                return (
                  <button
                    key={r.id}
                    onClick={() => navigate("/reports")}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition ${style.bg} ${style.border} ${style.hover}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.badge}`}
                      >
                        {dl.status === "overdue" ? (
                          <AlertTriangle size={17} />
                        ) : (
                          <Clock3 size={17} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1C3458]">
                          {r.library}
                        </p>
                        <p className="text-xs text-[#8992A3]">
                          {r.region} · {formatDeadline(r.deadline)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {formatTimeLeft(r.deadline)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Быстрые действия */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <h2 className="mb-4 text-[18px] font-semibold text-[#1C3458]">
            Тез аракеттер
          </h2>

          <div className="space-y-2">
            <QuickAction
              icon={<Plus size={18} />}
              label="Жаңы отчёт түзүү"
              onClick={() => navigate("/rep")}
            />
            <QuickAction
              icon={<BarChart3 size={18} />}
              label="Статистика"
              onClick={() => navigate("/stats")}
            />
            <QuickAction
              icon={<Clock3 size={18} />}
              label="Мөөнөттөр"
              onClick={() => navigate("/deadlines")}
              badge={stats.overdue > 0 ? stats.overdue : null}
              badgeColor="#DC2626"
            />
            <QuickAction
              icon={<FileEdit size={18} />}
              label="Редактирлөө сурамдары"
              onClick={() => navigate("/edit-requests")}
              badge={
                stats.pendingRequests > 0 ? stats.pendingRequests : null
              }
              badgeColor="#F59E0B"
            />
          </div>
        </div>
      </div>

      {/* 4. Мини-график + последние отчёты */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* График */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FA]">
              <CalendarDays size={20} className="text-[#1C3458]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#1C3458]">
                Акыркы 6 ай
              </h2>
              <p className="text-sm text-[#8992A3]">
                Айына жөнөтүлгөн отчёттор
              </p>
            </div>
          </div>

          <MiniBarChart data={monthly} />
        </div>

        {/* Последние отчёты */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#1C3458]">
                Акыркы отчёттор
              </h2>
              <p className="mt-1 text-sm text-[#8992A3]">
                Эң акыркы жөнөтүлгөндөр
              </p>
            </div>
            <button
              onClick={() => navigate("/reports")}
              className="flex items-center gap-1 text-sm font-medium text-[#1C3458] hover:underline"
            >
              Баары
              <ArrowRight size={16} />
            </button>
          </div>

          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#8992A3]">
              Отчёттор жок
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FA]">
                    <FileText size={16} className="text-[#1C3458]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#1C3458]">
                      {r.library}
                    </p>
                    <p className="text-xs text-[#8992A3]">
                      {r.region} · {r.date}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-[#EAF1FA] px-2 py-1 text-xs font-medium text-[#1C3458]">
                    {r.period}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================
   KPI-карточка
========================= */
const KpiCard = ({ icon, label, value, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border border-[#E3E8EF] bg-white p-5 text-left transition ${
      onClick ? "hover:border-[#1C3458]/30 hover:shadow-md" : "cursor-default"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
      <p className="text-xs text-[#8992A3]">{label}</p>
    </div>
    <p className="mt-2 text-2xl font-bold text-[#1C3458]">{value}</p>
  </button>
);

/* =========================
   Быстрое действие
========================= */
const QuickAction = ({ icon, label, onClick, badge, badgeColor }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E3E8EF] bg-white p-3 text-left transition hover:border-[#1C3458]/30 hover:bg-[#F8F9FB]"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-[#1C3458]">
        {icon}
      </div>
      <span className="text-sm font-medium text-[#1C3458]">{label}</span>
    </div>
    {badge && (
      <span
        className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
        style={{ backgroundColor: badgeColor || "#1C3458" }}
      >
        {badge}
      </span>
    )}
  </button>
);

/* =========================
   Мини-график
========================= */
const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex h-[160px] items-end gap-2">
      {data.map((m) => {
        const h = (m.count / max) * 100;
        return (
          <div key={m.key} className="group flex flex-1 flex-col items-center gap-1">
            <div className="relative flex h-full w-full items-end justify-center">
              <div
                className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-[#1C3458] to-[#3B6EA5] transition-all group-hover:from-[#294873] group-hover:to-[#4A7FB8]"
                style={{ height: `${h}%`, minHeight: m.count > 0 ? 4 : 2 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1C3458] px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                  {m.count}
                </div>
              </div>
            </div>
            <p className="text-[10px] font-medium text-[#8992A3]">{m.label}</p>
          </div>
        );
      })}
    </div>
  );
};