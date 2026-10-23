import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, CheckCircle2 } from "lucide-react";
import {
  getDeadlineStatus,
  formatTimeLeft,
  formatDeadline,
  deadlineStyles,
} from "../../utils/deadline";

const STORAGE_KEY = "libraryReports";

const Deadlines = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all"); // all | overdue | soon | upcoming

  // Тикер: обновляем расчёты раз в минуту
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const sorted = [...saved].sort((a, b) => {
      const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return da - db;
    });

    setReports(sorted);
  }, []);

  const filtered = reports.filter((r) => {
    const s = getDeadlineStatus(r.deadline).status;

    if (filter === "all") return true;
    if (filter === "soon") return s === "soon" || s === "today";
    return s === filter;
  });

  const counters = {
    overdue: reports.filter(
      (r) => getDeadlineStatus(r.deadline).status === "overdue",
    ).length,
    soon: reports.filter((r) =>
      ["soon", "today"].includes(getDeadlineStatus(r.deadline).status),
    ).length,
    upcoming: reports.filter(
      (r) => getDeadlineStatus(r.deadline).status === "upcoming",
    ).length,
  };

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
            <Clock3 size={24} className="text-[#1C3458]" />
          </div>
          <div>
            <h1 className="text-[22px] font-semibold text-[#1C3458]">
              Отчёттордун мөөнөттөрү
            </h1>
            <p className="mt-1 text-sm text-[#8A93A3]">
              Дедлайнга жакын жана мөөнөтү өткөн отчёттор
            </p>
          </div>
        </div>

        {/* Фильтры-счётчики */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            onClick={() => setFilter(filter === "overdue" ? "all" : "overdue")}
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "overdue"
                ? "border-[#DC2626] bg-[#FEF2F2]"
                : "border-[#E3E8EF] bg-white hover:border-[#FCA5A5]"
            }`}
          >
            <p className="text-sm text-[#8992A3]">Мөөнөтү өткөн</p>
            <p className="mt-2 text-2xl font-semibold text-[#DC2626]">
              {counters.overdue}
            </p>
          </button>

          <button
            onClick={() => setFilter(filter === "soon" ? "all" : "soon")}
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "soon"
                ? "border-[#F59E0B] bg-[#FFF7E6]"
                : "border-[#E3E8EF] bg-white hover:border-[#FCD34D]"
            }`}
          >
            <p className="text-sm text-[#8992A3]">Жакында (≤3 күн)</p>
            <p className="mt-2 text-2xl font-semibold text-[#D28A00]">
              {counters.soon}
            </p>
          </button>

          <button
            onClick={() => setFilter(filter === "upcoming" ? "all" : "upcoming")}
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "upcoming"
                ? "border-[#20A35A] bg-[#F0FBF4]"
                : "border-[#E3E8EF] bg-white hover:border-[#B9E5CC]"
            }`}
          >
            <p className="text-sm text-[#8992A3]">Убакыт бар</p>
            <p className="mt-2 text-2xl font-semibold text-[#20A35A]">
              {counters.upcoming}
            </p>
          </button>
        </div>

        {/* Список */}
        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="flex items-center justify-between border-b border-[#E7EBF0] px-6 py-5">
            <div>
              <h2 className="text-[18px] font-semibold text-[#1C3458]">
                Тизме
              </h2>
              <p className="mt-1 text-sm text-[#8992A3]">
                {filter === "all"
                  ? "Бардык отчёттор"
                  : filter === "overdue"
                  ? "Мөөнөтү өткөндөр"
                  : filter === "soon"
                  ? "Жакында бүтө тургандар"
                  : "Убакыт барлар"}
              </p>
            </div>

            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="text-sm text-[#1C3458] underline"
              >
                Баарын көрсөтүү
              </button>
            )}
          </div>

          <div className="divide-y divide-[#E7EBF0]">
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle2
                  size={32}
                  className="mx-auto mb-3 text-[#20A35A]"
                />
                <p className="text-sm text-[#8992A3]">Отчёттор жок</p>
              </div>
            ) : (
              filtered.map((report) => {
                const dl = getDeadlineStatus(report.deadline);
                const style = deadlineStyles[dl.status];

                return (
                  <div
                    key={report.id}
                    className={`flex flex-col gap-4 px-6 py-5 transition lg:flex-row lg:items-center lg:justify-between ${style.bg} ${style.hover}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.badge}`}
                      >
                        {dl.status === "overdue" ? (
                          <AlertTriangle size={20} />
                        ) : (
                          <Clock3 size={20} />
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-[#1C3458]">
                          {report.library}
                        </p>
                        <p className="mt-1 text-sm text-[#8992A3]">
                          {report.region} · {report.period}
                        </p>
                      </div>
                    </div>

                    <div className="lg:min-w-[130px]">
                      <p className="text-xs text-[#8992A3]">Срок</p>
                      <p className={`mt-1 text-sm font-medium ${style.text}`}>
                        {formatDeadline(report.deadline)}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg px-3 py-2 text-xs font-semibold ${style.badge}`}
                    >
                      {formatTimeLeft(report.deadline)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deadlines;