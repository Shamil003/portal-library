import AnimatedSearch from "../../components/AnimatedSearch";
import { BarChart3, Eye, Clock3, CheckCircle2, Pencil, X, Users, UserRound, Baby, GraduationCap, BookOpen, Monitor, CalendarDays, Send, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeadlineStatus, formatTimeLeft, formatDeadline, deadlineStyles } from "../../utils/deadline";
import { useLanguage } from "../../context/LanguageContext";

const EDIT_REQUESTS_KEY = "editRequests";

export const Reports = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // Функция перевода названий регионов на лету
  const translateRegion = (regionName) => {
    if (!regionName) return regionName;
    const regionMap = {
      "Баткен облусу": "reg_batken", "Чүй облусу": "reg_chuy", "Жалал-Абад облусу": "reg_jalal_abad",
      "Нарын облусу": "reg_naryn", "Ош облусу": "reg_osh", "Талас облусу": "reg_talas",
      "Ысык-Көл облусу": "reg_issyk_kul", "Бишкек шаары": "reg_bishkek", "Ош шаары": "reg_osh_city",
      "Баткенская область": "reg_batken", "Чуйская область": "reg_chuy", "Джалал-Абадская область": "reg_jalal_abad",
      "Нарынская область": "reg_naryn", "Ошская область": "reg_osh", "Таласская область": "reg_talas",
      "Иссык-Кульская область": "reg_issyk_kul", "город Бишкек": "reg_bishkek", "город Ош": "reg_osh_city",
    };
    const key = regionMap[regionName];
    return key ? t(key) : regionName;
  };

  useEffect(() => {
    const stat = JSON.parse(localStorage.getItem("libraryReports") || "[]").map((r) => ({ ...r, type: r.type || "stat" }));
    const quarter = JSON.parse(localStorage.getItem("quarterlyReports") || "[]").map((r) => ({ ...r, type: "quarterly" }));
    setReports([...stat, ...quarter]);
  }, []);

  const updateReports = (newReports) => {
    setReports(newReports);
    const stat = newReports.filter((r) => r.type !== "quarterly");
    const quarter = newReports.filter((r) => r.type === "quarterly");
    localStorage.setItem("libraryReports", JSON.stringify(stat));
    localStorage.setItem("quarterlyReports", JSON.stringify(quarter));
  };

  const handleEdit = (report) => {
    if (report.editRequest?.status !== "approved") {
      showToast(t("toast_edit_denied"));
      return;
    }
    if (report.type === "quarterly") localStorage.setItem("editingQuarterlyReport", JSON.stringify(report));
    else localStorage.setItem("editingReport", JSON.stringify(report));
    setSelectedReport(null);
    navigate("/rep");
  };

  const handleRequestEdit = (reportId) => {
    const requests = JSON.parse(localStorage.getItem(EDIT_REQUESTS_KEY) || "[]");
    const exists = requests.find((r) => r.reportId === reportId && r.status === "pending");
    if (exists) { showToast(t("toast_sent")); return; }

    const newRequest = { id: Date.now(), reportId, status: "pending", requestedAt: new Date().toLocaleString("ru-RU") };
    requests.push(newRequest);
    localStorage.setItem(EDIT_REQUESTS_KEY, JSON.stringify(requests));

    const newReports = reports.map((report) =>
      report.id === reportId ? { ...report, editRequest: { status: "pending", requestedAt: newRequest.requestedAt } } : report
    );
    updateReports(newReports);
    const updatedReport = newReports.find((r) => r.id === reportId);
    if (updatedReport) setSelectedReport(updatedReport);
    showToast(t("toast_sent"));
  };

  const filteredReports = reports.filter((report) =>
    `${report.library} ${report.region} ${report.period}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalReports = reports.length;
  const sentReports = reports.filter((r) => r.status === "Отправлен").length;
  const editingReports = reports.filter((r) => r.status === "На редактировании").length;
  const overdueReports = reports.filter((r) => getDeadlineStatus(r.deadline).status === "overdue").length;

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
              <BarChart3 size={24} className="text-[#1C3458]" />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold text-[#1C3458]">{t("reports_title")}</h1>
              <p className="mt-1 text-sm text-[#8A93A3]">{t("reports_desc")}</p>
            </div>
          </div>
          <div>
            <AnimatedSearch value={search} onChange={setSearch} />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">{t("reports_total")}</p>
            <p className="mt-2 text-2xl font-semibold text-[#1C3458]">{totalReports}</p>
          </div>
          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">{t("reports_sent")}</p>
            <p className="mt-2 text-2xl font-semibold text-[#D28A00]">{sentReports}</p>
          </div>
          <div className="rounded-2xl border border-[#E3E8EF] bg-white p-5">
            <p className="text-sm text-[#8992A3]">{t("reports_editing")}</p>
            <p className="mt-2 text-2xl font-semibold text-[#20A35A]">{editingReports}</p>
          </div>
          <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] p-5">
            <p className="text-sm text-[#B91C1C]">{t("reports_overdue")}</p>
            <p className="mt-2 text-2xl font-semibold text-[#DC2626]">{overdueReports}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <div className="border-b border-[#E7EBF0] px-6 py-5">
            <h2 className="text-[18px] font-semibold text-[#1C3458]">{t("reports_received")}</h2>
            <p className="mt-1 text-sm text-[#8992A3]">{t("reports_received_desc")}</p>
          </div>

          <div className="divide-y divide-[#E7EBF0]">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => {
                const dl = getDeadlineStatus(report.deadline);
                const style = deadlineStyles[dl.status];

                return (
                  <div key={report.id} className={`flex flex-col gap-4 px-6 py-5 transition lg:flex-row lg:items-center lg:justify-between ${style.bg} ${style.hover}`}>
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dl.status === "overdue" ? "bg-[#DC2626]" : "bg-[#EAF1FA]"}`}>
                        {dl.status === "overdue" ? <AlertTriangle size={20} className="text-white" /> : <BarChart3 size={20} className="text-[#1C3458]" />}
                      </div>
                      <div>
                        <p className="font-medium text-[#1C3458]">{report.library}</p>
                        <span className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[11px] font-medium ${report.type === "quarterly" ? "bg-[#FFF7E6] text-[#B87500]" : "bg-[#EAF1FA] text-[#1C3458]"}`}>
                          {report.type === "quarterly" ? t("reports_quarterly") : t("reports_statistical")}
                        </span>
                        <p className="mt-1 text-sm text-[#8992A3]">{translateRegion(report.region)}</p>
                      </div>
                    </div>

                    <div className="lg:min-w-[150px]">
                      <p className="text-xs text-[#8992A3]">{t("reports_period")}</p>
                      <p className="mt-1 text-sm font-medium text-[#1C3458]">{report.period}</p>
                    </div>

                    <div className="lg:min-w-[120px]">
                      <p className="text-xs text-[#8992A3]">{t("reports_sent_date")}</p>
                      <p className="mt-1 text-sm font-medium text-[#1C3458]">{report.date}</p>
                    </div>

                    <div className={`lg:min-w-[180px] rounded-xl border px-3 py-2 ${style.bg} ${style.border}`}>
                      <p className={`text-xs ${style.text} opacity-80`}>{t("reports_deadline")}</p>
                      <p className={`mt-0.5 text-sm font-semibold ${style.text}`}>{formatDeadline(report.deadline)}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        <span className={`text-xs font-medium ${style.text}`}>{formatTimeLeft(report.deadline, lang)}</span>
                      </div>
                    </div>

                    <div>
                      {report.status === "Отправлен" && (
                        <div className="flex items-center gap-2 rounded-lg bg-[#EAF1FA] px-3 py-2 text-xs font-medium text-[#1C3458]">
                          <Send size={15} /> {t("reports_sent")}
                        </div>
                      )}
                      {report.status === "На редактировании" && (
                        <div className="flex items-center gap-2 rounded-lg bg-[#FFF7E6] px-3 py-2 text-xs font-medium text-[#B87500]">
                          <Pencil size={15} /> {t("reports_editing")}
                        </div>
                      )}
                    </div>

                    <button type="button" onClick={() => setSelectedReport(report)} className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE2EA] bg-white px-4 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]">
                      <Eye size={17} /> {t("reports_view")}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-[#8992A3]">{t("reports_not_found")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onEdit={handleEdit}
          onRequestEdit={handleRequestEdit}
          t={t}
          lang={lang}
          translateRegion={translateRegion}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-[#1C3458] px-5 py-4 text-white shadow-2xl">
          <CheckCircle2 size={20} className="text-[#4ADE80]" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
};

const ReportModal = ({ report, onClose, onEdit, onRequestEdit, t, lang, translateRegion }) => {
  const dl = getDeadlineStatus(report.deadline);
  const style = deadlineStyles[dl.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#F3F5F9] shadow-2xl">
        <div className="flex items-center justify-between bg-[#1C3458] px-6 py-5 text-white">
          <div>
            <h2 className="text-xl font-semibold">
              {report.type === "quarterly" ? t("form_quarterly") : t("form_stat")}
            </h2>
            <p className="mt-1 text-sm text-white/70">{report.library} · {translateRegion(report.region)}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 transition hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6">
          <div className={`mb-5 flex items-center gap-3 rounded-2xl border p-4 ${style.bg} ${style.border}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.badge}`}>
              {dl.status === "overdue" ? <AlertTriangle size={20} /> : <Clock3 size={20} />}
            </div>
            <div>
              <p className={`text-xs ${style.text} opacity-80`}>{t("reports_deadline_title")}</p>
              <p className={`text-sm font-semibold ${style.text}`}>
                {formatDeadline(report.deadline)} · {formatTimeLeft(report.deadline, lang)}
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-2xl bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FA]">
                <BookOpen size={20} className="text-[#1C3458]" />
              </div>
              <div>
                <p className="text-xs text-[#8992A3]">{t("reports_library")}</p>
                <p className="font-medium text-[#1C3458]">{report.library}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InfoItem label={t("reports_region")} value={translateRegion(report.region)} />
              <InfoItem label={t("reports_period")} value={report.period} />
              <InfoItem label={t("reports_sent_date")} value={report.date} />
            </div>
          </div>

          <ModalSection icon={<Users size={19} />} title={t("reports_stats_users")}>
            <StatItem icon={<Users size={17} />} label={t("reports_all_users")} value={report.totalUsers} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_men")} value={report.men} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_women")} value={report.women} />
            <StatItem icon={<Baby size={17} />} label={t("reports_children")} value={report.childrenUnder15} />
            <StatItem icon={<GraduationCap size={17} />} label={t("reports_youth")} value={report.youth} />
          </ModalSection>

          <ModalSection icon={<BookOpen size={19} />} title={t("reports_stats_visits")}>
            <StatItem icon={<BookOpen size={17} />} label={t("reports_all_visits")} value={report.totalVisits} />
            <StatItem icon={<Monitor size={17} />} label={t("reports_virtual_visits")} value={report.virtualVisits} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_men")} value={report.visitMen} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_women")} value={report.visitWomen} />
            <StatItem icon={<Baby size={17} />} label={t("reports_children")} value={report.visitChildren} />
            <StatItem icon={<GraduationCap size={17} />} label={t("reports_youth")} value={report.visitYouth} />
          </ModalSection>

          <ModalSection icon={<CalendarDays size={19} />} title={t("reports_stats_events")}>
            <StatItem icon={<CalendarDays size={17} />} label={t("reports_events_count")} value={report.events} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_men")} value={report.eventMen} />
            <StatItem icon={<UserRound size={17} />} label={t("reports_women")} value={report.eventWomen} />
            <StatItem icon={<Baby size={17} />} label={t("reports_children")} value={report.eventChildren} />
            <StatItem icon={<GraduationCap size={17} />} label={t("reports_youth")} value={report.eventYouth} />
          </ModalSection>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E1E6ED] bg-white px-6 py-4 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="h-11 rounded-xl border border-[#DCE2EA] px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F5F7FA]">
            {t("reports_close")}
          </button>

          {report.editRequest?.status === "approved" ? (
            <button type="button" onClick={() => onEdit(report)} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1C3458] px-5 text-sm font-medium text-white transition hover:bg-[#294873]">
              <Pencil size={17} /> {t("reports_edit")}
            </button>
          ) : report.editRequest?.status === "pending" ? (
            <button type="button" disabled className="flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-[#F5F7FA] px-5 text-sm font-medium text-[#8992A3]">
              <Clock3 size={17} /> {t("reports_request_pending")}
            </button>
          ) : (
            <button type="button" onClick={() => onRequestEdit(report.id)} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-5 text-sm font-medium text-[#1C3458] transition hover:bg-[#F3F6FA]">
              <Pencil size={17} /> {report.editRequest?.status === "rejected" ? t("reports_request_again") : t("reports_request_edit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ModalSection = ({ icon, title, children }) => (
  <div className="mb-5 rounded-2xl bg-white p-5">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-[#1C3458]">{icon}</div>
      <h3 className="font-semibold text-[#1C3458]">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  </div>
);

const StatItem = ({ icon, label, value }) => (
  <div className="rounded-xl border border-[#E4E8EE] bg-[#FAFBFC] p-4">
    <div className="flex items-center gap-2 text-[#1C3458]">
      {icon}
      <span className="text-xs text-[#8992A3]">{label}</span>
    </div>
    <p className="mt-2 text-xl font-semibold text-[#1C3458]">{value ?? 0}</p>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="rounded-xl bg-[#F8F9FB] p-3">
    <p className="text-xs text-[#8992A3]">{label}</p>
    <p className="mt-1 text-sm font-medium text-[#1C3458]">{value}</p>
  </div>
);

export default Reports;