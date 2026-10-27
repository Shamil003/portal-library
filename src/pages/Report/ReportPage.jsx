import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserRound, Baby, GraduationCap, BookOpen, Monitor, CalendarDays, Send, Save, CheckCircle2, AlertCircle, BarChart3, Wrench } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

const STORAGE_KEY = "allReports";

const ReportPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { user } = useAuth();

  const translateLibraryName = (name) => {
    if (!name) return name;
    if (lang === "ru") {
      return name.replace(/китепкана/gi, "библиотека").replace(/Китепкана/gi, "Библиотека").replace(/борбордук/gi, "центральная").replace(/Борбордук/gi, "Центральная").replace(/райондук/gi, "районная").replace(/району/gi, "района");
    }
    return name;
  };

  const initialFormState = {
    repairRequired: "", repairEmergency: "", repairCapitalDone: "", repairCosmeticDone: "", repairNone: "",
    computersTotal: "", computersInternet: "", computersForUsers: "", computersForUsersInternet: "",
    digitizedDocs: "",
    totalUsers: "", virtualUsers: "", userWomen: "", userChildrenUnder15: "", userYouth: "",
    totalVisits: "", virtualVisits: "", visitWomen: "", visitChildren: "", visitYouth: "",
    eventVisits: "", eventVisitWomen: "", eventVisitChildren: "", eventVisitYouth: "",
    receivedTotal: "", receivedKg: "", receivedRu: "", receivedOther: "",
    removedTotal: "", removedKg: "", removedRu: "", removedOther: "",
    stockEndTotal: "", stockEndKg: "", stockEndRu: "", stockEndOther: "",
    issuedTotal: "", issuedKg: "", issuedRu: "", issuedOther: "",
    issuedUnder15Total: "", issuedUnder15Kg: "", issuedUnder15Ru: "", issuedUnder15Other: "",
    issuedUnder21Total: "", issuedUnder21Kg: "", issuedUnder21Ru: "", issuedUnder21Other: "",
    subscribersTotal: "", subscribersIndividual: "", subscribersCollective: "",
    eventsTotal: "", eventsInternational: "", eventsRepublican: "", eventsRegional: "", eventsInternal: "",
    staffTotal: "", staffLibrarians: "", staffHigher: "", staffSecondary: "",
    staffExpUnder5: "", staffExp5to10: "", staffExp10to20: "", staffExpOver20: "",
    staffAgeUnder30: "", staffAge30to55: "", staffAgeOver55: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRefs = useRef({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const editingReport = localStorage.getItem("editingReport");
    if (!editingReport) return;
    try {
      const report = JSON.parse(editingReport);
      const next = { ...initialFormState };
      Object.keys(initialFormState).forEach((key) => { if (report[key] !== undefined && report[key] !== null) next[key] = String(report[key]); });
      setForm(next);
    } catch (error) { console.error("Ошибка:", error); }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && !/^\d+$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false); setSent(false);
    if (value.trim() !== "") { setErrors((prev) => { const copy = { ...prev }; delete copy[name]; return copy; }); }
  };

  const handleSave = () => {
    localStorage.setItem("libraryReportDraft", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => { if (String(value).trim() === "") newErrors[name] = true; });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      setTimeout(() => { inputRefs.current[firstError]?.scrollIntoView({ behavior: "smooth", block: "center" }); inputRefs.current[firstError]?.focus(); }, 100);
      return false;
    }
    return true;
  };

  const toNum = (v) => Number(v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) { setSent(false); return; }
    setLoading(true); setSent(false);
    try {
      const editingReport = localStorage.getItem("editingReport");
      const oldReport = editingReport ? JSON.parse(editingReport) : null;

      // ФОРМИРУЕМ ДАТУ С ВРЕМЕНЕМ (Бишкек)
      const now = new Date().toLocaleString("ru-RU", { 
        timeZone: "Asia/Bishkek",
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      });

      const report = {
        id: oldReport?.id || Date.now(),
        type: "stat",
        library: oldReport?.library || user?.libraryName || "Борбордук райондук китепкана (Панфилов району)",
        region: oldReport?.region || user?.region || "Белгисиз",
        period: oldReport?.period || "9 ай 2026",
        date: now, // <-- Время и дата
        status: "Отправлен",
        editRequest: null,
      };

      Object.keys(form).forEach((key) => { report[key] = toNum(form[key]); });

      const savedReports = localStorage.getItem(STORAGE_KEY);
      const reports = savedReports ? JSON.parse(savedReports) : [];

      if (oldReport) {
        const updated = reports.map((item) => item.id === oldReport.id ? report : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        localStorage.removeItem("editingReport");
      } else {
        reports.push(report);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
      }

      await new Promise((r) => setTimeout(r, 1000));
      setSent(true);
      setTimeout(() => navigate("/reports"), 1000);
    } catch (error) { console.error("Ошибка:", error); } finally { setLoading(false); }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]"><BarChart3 size={24} className="text-[#1C3458]" /></div>
          <div>
            <h1 className="text-[22px] font-semibold text-[#1C3458]">{t("form_stat")}</h1>
            <p className="mt-1 text-sm text-[#8A93A3]">{t("form_stat_desc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[#E3E7EE] bg-[#F8F9FB] px-4 py-3">
          <CalendarDays size={19} className="text-[#1C3458]" />
          <div><p className="text-[11px] text-[#8A93A3]">{t("form_period")}</p><p className="text-sm font-medium text-[#1C3458]">9 ай 2026</p></div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-[#E3E8EF] bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FA]"><BookOpen size={20} className="text-[#1C3458]" /></div>
          <div>
            <p className="text-xs text-[#8992A3]">{t("form_library")}</p>
            <p className="font-medium text-[#1C3458]">{translateLibraryName(user?.libraryName || "Борбордук райондук китепкана (Панфилов району)")}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <ReportSection icon={<Wrench size={20} />} title={t("sec1_title")} description={t("sec1_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_needsMajorRepair")} name="repairRequired" value={form.repairRequired} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_isEmergency")} name="repairEmergency" value={form.repairEmergency} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_majorRepairDone")} name="repairCapitalDone" value={form.repairCapitalDone} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_cosmeticRepairDone")} name="repairCosmeticDone" value={form.repairCosmeticDone} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_totalComputers")} name="computersTotal" value={form.computersTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersInternet")} name="computersInternet" value={form.computersInternet} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersForUsers")} name="computersForUsers" value={form.computersForUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersInternetForUsers")} name="computersForUsersInternet" value={form.computersForUsersInternet} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<BookOpen size={20} />} title={t("sec2_title")} description={t("sec2_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_digitizedDocs")} name="digitizedDocs" value={form.digitizedDocs} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<Users size={20} />} title={t("sec3_title")} description={t("sec3_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalUsers")} name="totalUsers" value={form.totalUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_virtualUsers")} name="virtualUsers" value={form.virtualUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_womenUsers")} name="userWomen" value={form.userWomen} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_childrenUsers")} name="userChildrenUnder15" value={form.userChildrenUnder15} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_youthUsers")} name="userYouth" value={form.userYouth} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_totalVisits")} name="totalVisits" value={form.totalVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_virtualVisits")} name="virtualVisits" value={form.virtualVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_womenVisits")} name="visitWomen" value={form.visitWomen} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_childrenVisits")} name="visitChildren" value={form.visitChildren} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_youthVisits")} name="visitYouth" value={form.visitYouth} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_massEventVisits")} name="eventVisits" value={form.eventVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_massEventWomen")} name="eventVisitWomen" value={form.eventVisitWomen} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_massEventChildren")} name="eventVisitChildren" value={form.eventVisitChildren} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_massEventYouth")} name="eventVisitYouth" value={form.eventVisitYouth} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<BookOpen size={20} />} title={t("sec4_title")} description={t("sec4_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedTotal")} name="receivedTotal" value={form.receivedTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedKyrgyz")} name="receivedKg" value={form.receivedKg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedRussian")} name="receivedRu" value={form.receivedRu} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedOther")} name="receivedOther" value={form.receivedOther} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredTotal")} name="removedTotal" value={form.removedTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredKyrgyz")} name="removedKg" value={form.removedKg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredRussian")} name="removedRu" value={form.removedRu} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredOther")} name="removedOther" value={form.removedOther} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endTotal")} name="stockEndTotal" value={form.stockEndTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endKyrgyz")} name="stockEndKg" value={form.stockEndKg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endRussian")} name="stockEndRu" value={form.stockEndRu} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endOther")} name="stockEndOther" value={form.stockEndOther} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Send size={18} />} label={t("f_issuedTotal")} name="issuedTotal" value={form.issuedTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedKyrgyz")} name="issuedKg" value={form.issuedKg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedRussian")} name="issuedRu" value={form.issuedRu} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedOther")} name="issuedOther" value={form.issuedOther} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_issued15Total")} name="issuedUnder15Total" value={form.issuedUnder15Total} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Kyrgyz")} name="issuedUnder15Kg" value={form.issuedUnder15Kg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Russian")} name="issuedUnder15Ru" value={form.issuedUnder15Ru} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Other")} name="issuedUnder15Other" value={form.issuedUnder15Other} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_issued21Total")} name="issuedUnder21Total" value={form.issuedUnder21Total} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Kyrgyz")} name="issuedUnder21Kg" value={form.issuedUnder21Kg} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Russian")} name="issuedUnder21Ru" value={form.issuedUnder21Ru} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Other")} name="issuedUnder21Other" value={form.issuedUnder21Other} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<CalendarDays size={20} />} title={t("sec5_title")} description={t("sec5_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalSubscribers")} name="subscribersTotal" value={form.subscribersTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_individualSubscribers")} name="subscribersIndividual" value={form.subscribersIndividual} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_collectiveSubscribers")} name="subscribersCollective" value={form.subscribersCollective} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_totalEvents")} name="eventsTotal" value={form.eventsTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_internationalEvents")} name="eventsInternational" value={form.eventsInternational} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_republicanEvents")} name="eventsRepublican" value={form.eventsRepublican} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_regionalEvents")} name="eventsRegional" value={form.eventsRegional} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_internalEvents")} name="eventsInternal" value={form.eventsInternal} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<UserRound size={20} />} title={t("sec6_title")} description={t("sec6_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalStaff")} name="staffTotal" value={form.staffTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_librarianStaff")} name="staffLibrarians" value={form.staffLibrarians} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_higherEducation")} name="staffHigher" value={form.staffHigher} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_secondaryEducation")} name="staffSecondary" value={form.staffSecondary} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_expUpTo5")} name="staffExpUnder5" value={form.staffExpUnder5} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_exp5To10")} name="staffExp5to10" value={form.staffExp5to10} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_exp10To20")} name="staffExp10to20" value={form.staffExp10to20} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_expOver20")} name="staffExpOver20" value={form.staffExpOver20} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_ageUpTo30")} name="staffAgeUnder30" value={form.staffAgeUnder30} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_age30To55")} name="staffAge30to55" value={form.staffAge30to55} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_ageOver55")} name="staffAgeOver55" value={form.staffAgeOver55} onChange={handleChange} />
        </ReportSection>

        <div className="mb-5 rounded-2xl border border-[#E5E9EF] bg-white p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF7E6]"><AlertCircle size={20} className="text-[#D28A00]" /></div>
            <div><p className="font-medium text-[#1C3458]">{t("form_warning")}</p><p className="mt-1 text-sm leading-5 text-[#8992A3]">{t("form_warning_desc")}</p></div>
          </div>
        </div>

        {sent && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#B9E5CC] bg-[#F0FBF4] p-4">
            <CheckCircle2 size={22} className="text-[#20A35A]" />
            <div><p className="font-medium text-[#167A42]">{t("form_success")}</p><p className="text-sm text-[#4D8A65]">{t("form_success_desc")}</p></div>
          </div>
        )}

        <div className="mb-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleSave} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-6 text-sm font-medium text-[#1C3458] transition hover:bg-[#F6F8FB]">
            {saved ? (<><CheckCircle2 size={18} />{t("form_saved")}</>) : (<><Save size={18} />{t("form_save")}</>)}
          </button>
          <button type="submit" disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1C3458] px-8 text-sm font-medium text-white shadow-[0_4px_12px_rgba(28,52,88,0.2)] transition hover:bg-[#294873] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? (<><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{t("form_sending")}</>) : (<><Send size={18} />{t("form_send")}</>)}
          </button>
        </div>
      </form>
    </>
  );
};

const ReportSection = ({ icon, title, description, children }) => (
  <section className="mb-6 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FA] text-[#1C3458]">{icon}</div>
      <div><h2 className="text-[18px] font-semibold text-[#1C3458]">{title}</h2><p className="mt-1 text-sm text-[#8A93A3]">{description}</p></div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  </section>
);

const ReportInput = ({ icon, label, name, value, onChange, errors, inputRefs, t }) => {
  const hasError = Boolean(errors[name]);
  return (
    <div className={`group rounded-xl border p-4 transition-all duration-200 ${hasError ? "border-red-400 bg-red-50/50 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : "border-[#E1E6ED] bg-[#FAFBFC]"} focus-within:bg-white ${hasError ? "focus-within:border-red-500" : "focus-within:border-[#1C3458]"}`}>
      <label htmlFor={name} className={`mb-3 flex items-center gap-2 text-sm font-medium ${hasError ? "text-red-600" : "text-[#48556A]"}`}><span className={hasError ? "text-red-500" : "text-[#1C3458]"}>{icon}</span>{label}</label>
      <input ref={(element) => { inputRefs.current[name] = element; }} id={name} name={name} type="text" inputMode="numeric" placeholder="0" value={value} onChange={onChange} aria-invalid={hasError} className={`h-12 w-full rounded-lg border bg-white px-4 text-[18px] font-semibold outline-none transition ${hasError ? "border-red-400 text-red-700 placeholder:text-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" : "border-[#DDE3EA] text-[#1C3458] placeholder:text-[#B8C0CC] focus:border-[#1C3458] focus:ring-2 focus:ring-[#1C3458]/10"}`} />
      {hasError && (<p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500"><AlertCircle size={14} />{t("form_err_required")}</p>)}
    </div>
  );
};

export default ReportPage;