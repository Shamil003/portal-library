import {
  BarChart3,
  Search,
  Eye,
  Clock3,
  CheckCircle2,
  Pencil,
  X,
  Users,
  UserRound,
  Baby,
  GraduationCap,
  BookOpen,
  Monitor,
  CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "libraryReports";

export const Reports = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const savedReports = localStorage.getItem(STORAGE_KEY);

    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const updateReports = (newReports) => {
    setReports(newReports);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newReports)
    );
  };

  /* =========================
     Одобрить отчёт
  ========================= */

  const handleApprove = (id) => {
    const newReports = reports.map((report) =>
      report.id === id
        ? {
            ...report,
            status: "Одобрено",
          }
        : report
    );

    updateReports(newReports);

    const updatedReport = newReports.find(
      (report) => report.id === id
    );

    setSelectedReport(updatedReport);
  };

  /* =========================
     Редактировать отчёт
  ========================= */

  const handleEdit = (report) => {
    localStorage.setItem(
      "editingReport",
      JSON.stringify(report)
    );

    setSelectedReport(null);

    navigate("/rep");
  };

  const filteredReports = reports.filter((report) =>
    `${report.library} ${report.region} ${report.period}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalReports = reports.length;

  const checkingReports = reports.filter(
    (report) => report.status === "На проверке"
  ).length;

  const approvedReports = reports.filter(
    (report) => report.status === "Одобрено"
  ).length;

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
              <BarChart3
                size={24}
                className="text-[#1C3458]"
              />
            </div>

            <div>
              <h1 className="text-[22px] font-semibold text-[#1C3458]">
                Отчёты
              </h1>

              <p className="mt-1 text-sm text-[#8A93A3]">
                Отправленные отчёты библиотек
              </p>
            </div>
          </div>

          {/* Search */}

          <div className="relative w-full md:w-[320px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8992A3]"
            />

            <input
              type="text"
              placeholder="Издөө..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-xl border border-[#DDE3EA] bg-[#F8F9FB] pl-10 pr-4 text-sm text-[#1C3458] outline-none transition focus:border-[#1C3458] focus:bg-white"
            />
          </div>
        </div>

        {/* Statistics */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">
              Всего отчётов
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#1C3458]">
              {totalReports}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">
              На проверке
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#D28A00]">
              {checkingReports}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">
              Одобрено
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#20A35A]">
              {approvedReports}
            </p>
          </div>

        </div>

        {/* Reports */}

        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,52,88,0.05)]">

          <div className="border-b border-[#E7EBF0] px-6 py-5">
            <h2 className="text-[18px] font-semibold text-[#1C3458]">
              Полученные отчёты
            </h2>

            <p className="mt-1 text-sm text-[#8992A3]">
              Список отчётов, отправленных библиотеками
            </p>
          </div>

          <div className="divide-y divide-[#E7EBF0]">

            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#FAFBFC] lg:flex-row lg:items-center lg:justify-between"
                >

                  {/* Library */}

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FA]">
                      <BarChart3
                        size={20}
                        className="text-[#1C3458]"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-[#1C3458]">
                        {report.library}
                      </p>

                      <p className="mt-1 text-sm text-[#8992A3]">
                        {report.region}
                      </p>
                    </div>
                  </div>

                  {/* Period */}

                  <div className="lg:min-w-[150px]">
                    <p className="text-xs text-[#8992A3]">
                      Отчётный период
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#1C3458]">
                      {report.period}
                    </p>
                  </div>

                  {/* Date */}

                  <div className="lg:min-w-[120px]">
                    <p className="text-xs text-[#8992A3]">
                      Отправлен
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#1C3458]">
                      {report.date}
                    </p>
                  </div>

                  {/* Status */}

                  <div>
                    {report.status === "На проверке" && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#FFF7E6] px-3 py-2 text-xs font-medium text-[#B87500]">
                        <Clock3 size={15} />
                        На проверке
                      </div>
                    )}

                    {report.status === "Одобрено" && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#F0FBF4] px-3 py-2 text-xs font-medium text-[#167A42]">
                        <CheckCircle2 size={15} />
                        Одобрено
                      </div>
                    )}

                    {report.status === "Редактирование" && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#EAF1FA] px-3 py-2 text-xs font-medium text-[#1C3458]">
                        <Pencil size={15} />
                        Редактирование
                      </div>
                    )}
                  </div>

                  {/* View */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedReport(report)
                    }
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE2EA] bg-white px-4 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]"
                  >
                    <Eye size={17} />
                    Просмотреть
                  </button>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[#8992A3]">
                  Отчёты не найдены
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modal */}

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() =>
            setSelectedReport(null)
          }
          onApprove={handleApprove}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

/* =========================
   Report Modal
========================= */

const ReportModal = ({
  report,
  onClose,
  onApprove,
  onEdit,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="max-h-[90vh] w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#F3F5F9] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between bg-[#1C3458] px-6 py-5 text-white">

          <div>
            <h2 className="text-xl font-semibold">
              Отчёт библиотеки
            </h2>

            <p className="mt-1 text-sm text-white/70">
              {report.library} · {report.region}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="max-h-[65vh] overflow-y-auto p-6">

          {/* Info */}

          <div className="mb-5 rounded-2xl bg-white p-5">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FA]">
                <BookOpen
                  size={20}
                  className="text-[#1C3458]"
                />
              </div>

              <div>
                <p className="text-xs text-[#8992A3]">
                  Китепкана
                </p>

                <p className="font-medium text-[#1C3458]">
                  {report.library}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <InfoItem
                label="Регион"
                value={report.region}
              />

              <InfoItem
                label="Отчётный период"
                value={report.period}
              />

              <InfoItem
                label="Дата отправки"
                value={report.date}
              />

            </div>
          </div>

          {/* Users */}

          <ModalSection
            icon={<Users size={19} />}
            title="Колдонуучулар"
          >
            <StatItem
              icon={<Users size={17} />}
              label="Всего пользователей"
              value={report.totalUsers}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Мужчины"
              value={report.men}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Женщины"
              value={report.women}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="Дети до 15 лет"
              value={report.childrenUnder15}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Молодёжь"
              value={report.youth}
            />
          </ModalSection>

          {/* Visits */}

          <ModalSection
            icon={<BookOpen size={19} />}
            title="Келүүлөр"
          >
            <StatItem
              icon={<BookOpen size={17} />}
              label="Всего посещений"
              value={report.totalVisits}
            />

            <StatItem
              icon={<Monitor size={17} />}
              label="Виртуальные посещения"
              value={report.virtualVisits}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Мужчины"
              value={report.visitMen}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Женщины"
              value={report.visitWomen}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="Дети до 15 лет"
              value={report.visitChildren}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Молодёжь"
              value={report.visitYouth}
            />
          </ModalSection>

          {/* Events */}

          <ModalSection
            icon={<CalendarDays size={19} />}
            title="Иш-чаралар"
          >
            <StatItem
              icon={<CalendarDays size={17} />}
              label="Количество мероприятий"
              value={report.events}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Мужчины"
              value={report.eventMen}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Женщины"
              value={report.eventWomen}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="Дети до 15 лет"
              value={report.eventChildren}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Молодёжь"
              value={report.eventYouth}
            />
          </ModalSection>

        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-[#E1E6ED] bg-white px-6 py-4 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-[#DCE2EA] px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F5F7FA]"
          >
            Закрыть
          </button>

          <button
            type="button"
            onClick={() => onEdit(report)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]"
          >
            <Pencil size={17} />
            Редактировать
          </button>

          {report.status !== "Одобрено" && (
            <button
              type="button"
              onClick={() =>
                onApprove(report.id)
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#20A35A] px-5 text-sm font-medium text-white transition hover:bg-[#188A4B]"
            >
              <CheckCircle2 size={17} />
              Одобрить
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

/* =========================
   Modal Section
========================= */

const ModalSection = ({
  icon,
  title,
  children,
}) => {
  return (
    <div className="mb-5 rounded-2xl bg-white p-5">

      <div className="mb-4 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-[#1C3458]">
          {icon}
        </div>

        <h3 className="font-semibold text-[#1C3458]">
          {title}
        </h3>

      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>

    </div>
  );
};

/* =========================
   Stat Item
========================= */

const StatItem = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-[#E4E8EE] bg-[#FAFBFC] p-4">

      <div className="flex items-center gap-2 text-[#1C3458]">
        {icon}

        <span className="text-xs text-[#8992A3]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold text-[#1C3458]">
        {value ?? 0}
      </p>

    </div>
  );
};

/* =========================
   Info Item
========================= */

const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-[#F8F9FB] p-3">

      <p className="text-xs text-[#8992A3]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#1C3458]">
        {value}
      </p>

    </div>
  );
};

export default Reports;