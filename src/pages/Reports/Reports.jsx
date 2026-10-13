import AnimatedSearch from "../../components/AnimatedSearch";

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
  Send,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "libraryReports";
const EDIT_REQUESTS_KEY = "editRequests";

export const Reports = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  /* =========================
     Toast-уведомление
  ========================= */
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  useEffect(() => {
    const savedReports = localStorage.getItem(STORAGE_KEY);

    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const updateReports = (newReports) => {
    setReports(newReports);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
  };

  /* =========================
     Редактировать отчёт
     (только после одобрения запроса)
  ========================= */

  const handleEdit = (report) => {
    if (report.editRequest?.status !== "approved") {
      showToast(
        "Редактирлөө администратор тарабынан уруксат берилгенден кийин гана мүмкүн",
      );
      return;
    }

    localStorage.setItem("editingReport", JSON.stringify(report));

    setSelectedReport(null);

    navigate("/rep");
  };

  /* =========================
     Запрос на редактирование
  ========================= */

  const handleRequestEdit = (reportId) => {
    const requests = JSON.parse(
      localStorage.getItem(EDIT_REQUESTS_KEY) || "[]",
    );

    // Если запрос уже отправлен — просто подтверждаем.
    const exists = requests.find(
      (r) => r.reportId === reportId && r.status === "pending",
    );

    if (exists) {
      showToast("Жөнөтүлдү");
      return;
    }

    const newRequest = {
      id: Date.now(),
      reportId,
      status: "pending",
      requestedAt: new Date().toLocaleString("ru-RU"),
    };

    requests.push(newRequest);

    localStorage.setItem(EDIT_REQUESTS_KEY, JSON.stringify(requests));

    const newReports = reports.map((report) =>
      report.id === reportId
        ? {
            ...report,
            editRequest: {
              status: "pending",
              requestedAt: newRequest.requestedAt,
            },
          }
        : report,
    );

    updateReports(newReports);

    const updatedReport = newReports.find((report) => report.id === reportId);

    if (updatedReport) {
      setSelectedReport(updatedReport);
    }

    showToast("Жөнөтүлдү");
  };

  const filteredReports = reports.filter((report) =>
    `${report.library} ${report.region} ${report.period}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalReports = reports.length;

  const sentReports = reports.filter(
    (report) => report.status === "Отправлен",
  ).length;

  const editingReports = reports.filter(
    (report) => report.status === "На редактировании",
  ).length;

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
              <BarChart3 size={24} className="text-[#1C3458]" />
            </div>

            <div>
              <h1 className="text-[22px] font-semibold text-[#1C3458]">
                Отчёттор
              </h1>

              <p className="mt-1 text-sm text-[#8A93A3]">
                Китепканалар тарабынан жөнөтүлгөн отчёттор
              </p>
            </div>
          </div>

          {/* Search */}

          <div>
            <AnimatedSearch value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Statistics */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">Бардык отчёттор</p>

            <p className="mt-2 text-2xl font-semibold text-[#1C3458]">
              {totalReports}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">Жөнөтүлгөн</p>

            <p className="mt-2 text-2xl font-semibold text-[#D28A00]">
              {sentReports}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">Редактирлөөдө</p>

            <p className="mt-2 text-2xl font-semibold text-[#20A35A]">
              {editingReports}
            </p>
          </div>
        </div>

        {/* Reports */}

        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="border-b border-[#E7EBF0] px-6 py-5">
            <h2 className="text-[18px] font-semibold text-[#1C3458]">
              Алынган отчёттор
            </h2>

            <p className="mt-1 text-sm text-[#8992A3]">
              Китепканалар тарабынан жөнөтүлгөн отчёттордун тизмеси
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
                      <BarChart3 size={20} className="text-[#1C3458]" />
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
                    <p className="text-xs text-[#8992A3]">Отчёттук мезгил</p>

                    <p className="mt-1 text-sm font-medium text-[#1C3458]">
                      {report.period}
                    </p>
                  </div>

                  {/* Date */}

                  <div className="lg:min-w-[120px]">
                    <p className="text-xs text-[#8992A3]">Жөнөтүлдү</p>

                    <p className="mt-1 text-sm font-medium text-[#1C3458]">
                      {report.date}
                    </p>
                  </div>

                  {/* Status */}

                  <div>
                    {report.status === "Отправлен" && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#EAF1FA] px-3 py-2 text-xs font-medium text-[#1C3458]">
                        <Send size={15} />
                        Жөнөтүлдү
                      </div>
                    )}

                    {report.status === "На редактировании" && (
                      <div className="flex items-center gap-2 rounded-lg bg-[#FFF7E6] px-3 py-2 text-xs font-medium text-[#B87500]">
                        <Pencil size={15} />
                        Редактирлөөдө
                      </div>
                    )}
                  </div>

                  {/* View */}

                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE2EA] bg-white px-4 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]"
                  >
                    <Eye size={17} />
                    Көрүү
                  </button>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[#8992A3]">Отчёттор табылган жок</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onEdit={handleEdit}
          onRequestEdit={handleRequestEdit}
        />
      )}

      {/* Toast */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-[#1C3458] px-5 py-4 text-white shadow-2xl">
          <CheckCircle2 size={20} className="text-[#4ADE80]" />

          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
};

/* =========================
   Report Modal
========================= */

const ReportModal = ({ report, onClose, onEdit, onRequestEdit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#F3F5F9] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between bg-[#1C3458] px-6 py-5 text-white">
          <div>
            <h2 className="text-xl font-semibold">Китепкананын отчёту</h2>

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
                <BookOpen size={20} className="text-[#1C3458]" />
              </div>

              <div>
                <p className="text-xs text-[#8992A3]">Китепкана</p>

                <p className="font-medium text-[#1C3458]">{report.library}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InfoItem label="Регион" value={report.region} />

              <InfoItem label="Отчёттук мезгил" value={report.period} />

              <InfoItem label="Жөнөтүлгөн күнү" value={report.date} />
            </div>
          </div>

          {/* Users */}

          <ModalSection icon={<Users size={19} />} title="Колдонуучулар">
            <StatItem
              icon={<Users size={17} />}
              label="Бардык колдонуучулар"
              value={report.totalUsers}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Эркектер"
              value={report.men}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Аялдар"
              value={report.women}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="15 жашка чейинки балдар"
              value={report.childrenUnder15}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Жаштар"
              value={report.youth}
            />
          </ModalSection>

          {/* Visits */}

          <ModalSection icon={<BookOpen size={19} />} title="Келүүлөр">
            <StatItem
              icon={<BookOpen size={17} />}
              label="Бардык келүүлөр"
              value={report.totalVisits}
            />

            <StatItem
              icon={<Monitor size={17} />}
              label="Виртуалдык келүүлөр"
              value={report.virtualVisits}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Эркектер"
              value={report.visitMen}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Аялдар"
              value={report.visitWomen}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="15 жашка чейинки балдар"
              value={report.visitChildren}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Жаштар"
              value={report.visitYouth}
            />
          </ModalSection>

          {/* Events */}

          <ModalSection icon={<CalendarDays size={19} />} title="Иш-чаралар">
            <StatItem
              icon={<CalendarDays size={17} />}
              label="Иш-чаралардын саны"
              value={report.events}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Эркектер"
              value={report.eventMen}
            />

            <StatItem
              icon={<UserRound size={17} />}
              label="Аялдар"
              value={report.eventWomen}
            />

            <StatItem
              icon={<Baby size={17} />}
              label="15 жашка чейинки балдар"
              value={report.eventChildren}
            />

            <StatItem
              icon={<GraduationCap size={17} />}
              label="Жаштар"
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
            Жабуу
          </button>

          {report.editRequest?.status === "approved" ? (
            <button
              type="button"
              onClick={() => onEdit(report)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1C3458] px-5 text-sm font-medium text-white transition hover:bg-[#294873]"
            >
              <Pencil size={17} />
              Редактирлөө
            </button>
          ) : report.editRequest?.status === "pending" ? (
            <button
              type="button"
              disabled
              className="flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-[#F5F7FA] px-5 text-sm font-medium text-[#8992A3]"
            >
              <Clock3 size={17} />
              Сурам кароодо
            </button>
          ) : report.editRequest?.status === "rejected" ? (
            <button
              type="button"
              onClick={() => onRequestEdit(report.id)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]"
            >
              <Pencil size={17} />
              Кайра сурам жөнөтүү
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRequestEdit(report.id)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]"
            >
              <Pencil size={17} />
              Редактирлөөгө сурам жөнөтүү
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

const ModalSection = ({ icon, title, children }) => {
  return (
    <div className="mb-5 rounded-2xl bg-white p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-[#1C3458]">
          {icon}
        </div>

        <h3 className="font-semibold text-[#1C3458]">{title}</h3>
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

const StatItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl border border-[#E4E8EE] bg-[#FAFBFC] p-4">
      <div className="flex items-center gap-2 text-[#1C3458]">
        {icon}

        <span className="text-xs text-[#8992A3]">{label}</span>
      </div>

      <p className="mt-2 text-xl font-semibold text-[#1C3458]">{value ?? 0}</p>
    </div>
  );
};

/* =========================
   Info Item
========================= */

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-[#F8F9FB] p-3">
      <p className="text-xs text-[#8992A3]">{label}</p>

      <p className="mt-1 text-sm font-medium text-[#1C3458]">{value}</p>
    </div>
  );
};

export default Reports;
