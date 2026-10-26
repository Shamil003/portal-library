import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, AlertTriangle, CheckCircle2, Monitor, BookOpen, Users, UserRound, Baby, GraduationCap, CalendarDays, Send, Save, AlertCircle, BarChart3, Library, UserCheck, Briefcase, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const STORAGE_KEY = "quarterlyReports";
const DRAFT_KEY = "quarterlyReportDraft";
const EDITING_KEY = "editingQuarterlyReport";

const QuarterlyReportPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  // Функция перевода названия библиотеки
  const translateLibraryName = (name) => {
    if (!name) return name;
    if (lang === "ru") {
      return name
        .replace(/китепкана/gi, "библиотека")
        .replace(/Китепкана/gi, "Библиотека")
        .replace(/борбордук/gi, "центральная")
        .replace(/Борбордук/gi, "Центральная")
        .replace(/райондук/gi, "районная");
    }
    return name;
  };

  const initialFormState = {
    needsMajorRepair: "", isEmergency: "", majorRepairDone: "", cosmeticRepairDone: "",
    totalComputers: "", computersInternet: "", computersForUsers: "", computersInternetForUsers: "",
    digitizedDocs: "",
    totalUsers: "", virtualUsers: "", womenUsers: "", childrenUsers: "", youthUsers: "",
    totalVisits: "", virtualVisits: "", womenVisits: "", childrenVisits: "", youthVisits: "",
    massEventVisits: "", massEventWomen: "", massEventChildren: "", massEventYouth: "",
    receivedTotal: "", receivedKyrgyz: "", receivedRussian: "", receivedOther: "",
    retiredTotal: "", retiredKyrgyz: "", retiredRussian: "", retiredOther: "",
    endTotal: "", endKyrgyz: "", endRussian: "", endOther: "",
    issuedTotal: "", issuedKyrgyz: "", issuedRussian: "", issuedOther: "",
    issued15Total: "", issued15Kyrgyz: "", issued15Russian: "", issued15Other: "",
    issued21Total: "", issued21Kyrgyz: "", issued21Russian: "", issued21Other: "",
    totalSubscribers: "", individualSubscribers: "", collectiveSubscribers: "",
    totalEvents: "", internationalEvents: "", republicanEvents: "", regionalEvents: "", internalEvents: "",
    totalStaff: "", librarianStaff: "", higherEducation: "", secondaryEducation: "",
    expUpTo5: "", exp5To10: "", exp10To20: "", expOver20: "",
    ageUpTo30: "", age30To55: "", ageOver55: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRefs = useRef({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const editingReport = localStorage.getItem(EDITING_KEY);
    if (!editingReport) return;
    try {
      const report = JSON.parse(editingReport);
      const newForm = { ...initialFormState };
      Object.keys(initialFormState).forEach((key) => {
        newForm[key] = String(report[key] ?? "");
      });
      setForm(newForm);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && !/^\d+$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    setSent(false);
    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      if (value.trim() === "") newErrors[name] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      setTimeout(() => {
        inputRefs.current[firstError]?.scrollIntoView({ behavior: "smooth", block: "center" });
        inputRefs.current[firstError]?.focus();
      }, 100);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) { setSent(false); return; }
    setLoading(true);
    setSent(false);
    try {
      const editingReport = localStorage.getItem(EDITING_KEY);
      const oldReport = editingReport ? JSON.parse(editingReport) : null;

      const report = {
        id: oldReport?.id || Date.now(),
        type: "quarterly",
        library: oldReport?.library || "Баланчаева а. китепкана",
        region: oldReport?.region || "Ош облусу",
        period: oldReport?.period || "IV квартал 2026",
        date: new Date().toLocaleDateString("ru-RU"),
        status: "Отправлен",
        editRequest: null,
        ...form
      };

      Object.keys(form).forEach(key => { report[key] = Number(form[key]); });

      const savedReports = localStorage.getItem(STORAGE_KEY);
      const reports = savedReports ? JSON.parse(savedReports) : [];

      if (oldReport) {
        const updatedReports = reports.map((item) => item.id === oldReport.id ? report : item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
        localStorage.removeItem(EDITING_KEY);
      } else {
        reports.push(report);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
      setTimeout(() => navigate("/reports"), 1000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7E6]">
            <BarChart3 size={24} className="text-[#B87500]" />
          </div>
          <div>
            <h1 className="text-[22px] font-semibold text-[#1C3458]">{t("form_quarterly")}</h1>
            <p className="mt-1 text-sm text-[#8A93A3]">{t("form_quarterly_desc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[#E3E7EE] bg-[#F8F9FB] px-4 py-3">
          <CalendarDays size={19} className="text-[#1C3458]" />
          <div>
            <p className="text-[11px] text-[#8A93A3]">{t("form_period")}</p>
            <p className="text-sm font-medium text-[#1C3458]">IV квартал 2026</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-[#E3E8EF] bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FA]">
            <BookOpen size={20} className="text-[#1C3458]" />
          </div>
          <div>
            <p className="text-xs text-[#8992A3]">{t("form_library")}</p>
            <p className="font-medium text-[#1C3458]">
              {translateLibraryName("Баланчаева а. китепкана")}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <ReportSection icon={<Wrench size={20} />} title={t("sec1_title")} description={t("sec1_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Wrench size={18} />} label={t("f_needsMajorRepair")} name="needsMajorRepair" value={form.needsMajorRepair} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<AlertTriangle size={18} />} label={t("f_isEmergency")} name="isEmergency" value={form.isEmergency} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CheckCircle2 size={18} />} label={t("f_majorRepairDone")} name="majorRepairDone" value={form.majorRepairDone} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CheckCircle2 size={18} />} label={t("f_cosmeticRepairDone")} name="cosmeticRepairDone" value={form.cosmeticRepairDone} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_totalComputers")} name="totalComputers" value={form.totalComputers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersInternet")} name="computersInternet" value={form.computersInternet} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersForUsers")} name="computersForUsers" value={form.computersForUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_computersInternetForUsers")} name="computersInternetForUsers" value={form.computersInternetForUsers} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<FileText size={20} />} title={t("sec2_title")} description={t("sec2_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<FileText size={18} />} label={t("f_digitizedDocs")} name="digitizedDocs" value={form.digitizedDocs} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<Users size={20} />} title={t("sec3_title")} description={t("sec3_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalUsers")} name="totalUsers" value={form.totalUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_virtualUsers")} name="virtualUsers" value={form.virtualUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_womenUsers")} name="womenUsers" value={form.womenUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_childrenUsers")} name="childrenUsers" value={form.childrenUsers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_youthUsers")} name="youthUsers" value={form.youthUsers} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_totalVisits")} name="totalVisits" value={form.totalVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Monitor size={18} />} label={t("f_virtualVisits")} name="virtualVisits" value={form.virtualVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_womenVisits")} name="womenVisits" value={form.womenVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_childrenVisits")} name="childrenVisits" value={form.childrenVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_youthVisits")} name="youthVisits" value={form.youthVisits} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_massEventVisits")} name="massEventVisits" value={form.massEventVisits} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_massEventWomen")} name="massEventWomen" value={form.massEventWomen} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_massEventChildren")} name="massEventChildren" value={form.massEventChildren} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_massEventYouth")} name="massEventYouth" value={form.massEventYouth} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<Library size={20} />} title={t("sec4_title")} description={t("sec4_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedTotal")} name="receivedTotal" value={form.receivedTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedKyrgyz")} name="receivedKyrgyz" value={form.receivedKyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedRussian")} name="receivedRussian" value={form.receivedRussian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_receivedOther")} name="receivedOther" value={form.receivedOther} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredTotal")} name="retiredTotal" value={form.retiredTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredKyrgyz")} name="retiredKyrgyz" value={form.retiredKyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredRussian")} name="retiredRussian" value={form.retiredRussian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_retiredOther")} name="retiredOther" value={form.retiredOther} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endTotal")} name="endTotal" value={form.endTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endKyrgyz")} name="endKyrgyz" value={form.endKyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endRussian")} name="endRussian" value={form.endRussian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_endOther")} name="endOther" value={form.endOther} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedTotal")} name="issuedTotal" value={form.issuedTotal} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedKyrgyz")} name="issuedKyrgyz" value={form.issuedKyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedRussian")} name="issuedRussian" value={form.issuedRussian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issuedOther")} name="issuedOther" value={form.issuedOther} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Baby size={18} />} label={t("f_issued15Total")} name="issued15Total" value={form.issued15Total} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Kyrgyz")} name="issued15Kyrgyz" value={form.issued15Kyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Russian")} name="issued15Russian" value={form.issued15Russian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued15Other")} name="issued15Other" value={form.issued15Other} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_issued21Total")} name="issued21Total" value={form.issued21Total} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Kyrgyz")} name="issued21Kyrgyz" value={form.issued21Kyrgyz} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Russian")} name="issued21Russian" value={form.issued21Russian} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<BookOpen size={18} />} label={t("f_issued21Other")} name="issued21Other" value={form.issued21Other} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<UserCheck size={20} />} title={t("sec5_title")} description={t("sec5_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalSubscribers")} name="totalSubscribers" value={form.totalSubscribers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_individualSubscribers")} name="individualSubscribers" value={form.individualSubscribers} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_collectiveSubscribers")} name="collectiveSubscribers" value={form.collectiveSubscribers} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_totalEvents")} name="totalEvents" value={form.totalEvents} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_internationalEvents")} name="internationalEvents" value={form.internationalEvents} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_republicanEvents")} name="republicanEvents" value={form.republicanEvents} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_regionalEvents")} name="regionalEvents" value={form.regionalEvents} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_internalEvents")} name="internalEvents" value={form.internalEvents} onChange={handleChange} />
        </ReportSection>

        <ReportSection icon={<Briefcase size={20} />} title={t("sec6_title")} description={t("sec6_desc")}>
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<Users size={18} />} label={t("f_totalStaff")} name="totalStaff" value={form.totalStaff} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_librarianStaff")} name="librarianStaff" value={form.librarianStaff} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_higherEducation")} name="higherEducation" value={form.higherEducation} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<GraduationCap size={18} />} label={t("f_secondaryEducation")} name="secondaryEducation" value={form.secondaryEducation} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_expUpTo5")} name="expUpTo5" value={form.expUpTo5} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_exp5To10")} name="exp5To10" value={form.exp5To10} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_exp10To20")} name="exp10To20" value={form.exp10To20} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<CalendarDays size={18} />} label={t("f_expOver20")} name="expOver20" value={form.expOver20} onChange={handleChange} />

          <div className="col-span-full my-2 border-t border-[#E1E6ED]"></div>

          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_ageUpTo30")} name="ageUpTo30" value={form.ageUpTo30} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_age30To55")} name="age30To55" value={form.age30To55} onChange={handleChange} />
          <ReportInput t={t} inputRefs={inputRefs} errors={errors} icon={<UserRound size={18} />} label={t("f_ageOver55")} name="ageOver55" value={form.ageOver55} onChange={handleChange} />
        </ReportSection>

        <div className="mb-5 rounded-2xl border border-[#E5E9EF] bg-white p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF7E6]">
              <AlertCircle size={20} className="text-[#D28A00]" />
            </div>
            <div>
              <p className="font-medium text-[#1C3458]">{t("form_warning")}</p>
              <p className="mt-1 text-sm leading-5 text-[#8992A3]">{t("form_warning_desc")}</p>
            </div>
          </div>
        </div>

        {sent && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#B9E5CC] bg-[#F0FBF4] p-4">
            <CheckCircle2 size={22} className="text-[#20A35A]" />
            <div>
              <p className="font-medium text-[#167A42]">{t("form_success")}</p>
              <p className="text-sm text-[#4D8A65]">{t("form_success_desc")}</p>
            </div>
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
      <div>
        <h2 className="text-[18px] font-semibold text-[#1C3458]">{title}</h2>
        <p className="mt-1 text-sm text-[#8A93A3]">{description}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  </section>
);

const ReportInput = ({ icon, label, name, value, onChange, errors, inputRefs, t }) => {
  const hasError = Boolean(errors[name]);
  return (
    <div className={`group rounded-xl border p-4 transition-all duration-200 ${hasError ? "border-red-400 bg-red-50/50 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : "border-[#E1E6ED] bg-[#FAFBFC]"} focus-within:bg-white ${hasError ? "focus-within:border-red-500" : "focus-within:border-[#1C3458]"}`}>
      <label htmlFor={name} className={`mb-3 flex items-center gap-2 text-sm font-medium ${hasError ? "text-red-600" : "text-[#48556A]"}`}>
        <span className={hasError ? "text-red-500" : "text-[#1C3458]"}>{icon}</span>
        {label}
      </label>
      <input ref={(element) => { inputRefs.current[name] = element; }} id={name} name={name} type="text" inputMode="numeric" placeholder="0" value={value} onChange={onChange} aria-invalid={hasError}
        className={`h-12 w-full rounded-lg border bg-white px-4 text-[18px] font-semibold outline-none transition ${hasError ? "border-red-400 text-red-700 placeholder:text-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" : "border-[#DDE3EA] text-[#1C3458] placeholder:text-[#B8C0CC] focus:border-[#1C3458] focus:ring-2 focus:ring-[#1C3458]/10"}`}
      />
      {hasError && (<p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500"><AlertCircle size={14} />{t("form_err_required")}</p>)}
    </div>
  );
};

export default QuarterlyReportPage;