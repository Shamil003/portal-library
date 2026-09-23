import React, { useRef, useState } from "react";

import {
  Users,
  UserRound,
  Baby,
  GraduationCap,
  BookOpen,
  Monitor,
  CalendarDays,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const ReportPage = () => {
  const [form, setForm] = useState({
    totalUsers: "",
    men: "",
    women: "",
    childrenUnder15: "",
    youth: "",

    totalVisits: "",
    virtualVisits: "",
    visitMen: "",
    visitWomen: "",
    visitChildren: "",
    visitYouth: "",

    events: "",
    eventMen: "",
    eventWomen: "",
    eventChildren: "",
    eventYouth: "",
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);

  const inputRefs = useRef({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

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
    localStorage.setItem("libraryReport", JSON.stringify(form));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(form).forEach(([name, value]) => {
      if (value.trim() === "") {
        newErrors[name] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];

      setTimeout(() => {
        inputRefs.current[firstError]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        inputRefs.current[firstError]?.focus();
      }, 100);

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setSent(false);
      return;
    }

    setLoading(true);
    setSent(false);

    try {
      const report = {
        totalUsers: Number(form.totalUsers),
        men: Number(form.men),
        women: Number(form.women),
        childrenUnder15: Number(form.childrenUnder15),
        youth: Number(form.youth),

        totalVisits: Number(form.totalVisits),
        virtualVisits: Number(form.virtualVisits),
        visitMen: Number(form.visitMen),
        visitWomen: Number(form.visitWomen),
        visitChildren: Number(form.visitChildren),
        visitYouth: Number(form.visitYouth),

        events: Number(form.events),
        eventMen: Number(form.eventMen),
        eventWomen: Number(form.eventWomen),
        eventChildren: Number(form.eventChildren),
        eventYouth: Number(form.eventYouth),
      };

      console.log("Маалыматтар:", report);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSent(true);
    } catch (error) {
      console.error("Ката:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1100px]">

        {/* <div className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-[#8992A3]">
          <span>Китепканалар</span>
          <span>/</span>
          <span>Ош облусу</span>
          <span>/</span>
          <span>Баланчаева а. китепкана</span>
          <span>/</span>

          <span className="font-medium text-[#1C3458]">
            Отчет
          </span>
        </div> */}

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
                Китепкананын отчёту
              </h1>

              <p className="mt-1 text-sm text-[#8A93A3]">
                Отчёттук мезгил үчүн маалыматтарды толтуруңуз
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#E3E7EE] bg-[#F8F9FB] px-4 py-3">
            <CalendarDays
              size={19}
              className="text-[#1C3458]"
            />

            <div>
              <p className="text-[11px] text-[#8A93A3]">
                Отчёттук мезгил
              </p>

              <p className="text-sm font-medium text-[#1C3458]">
                Сентябрь 2026
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-[#E3E8EF] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FA]">
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
                Баланчаева а. китепкана
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <ReportSection
            icon={<Users size={20} />}
            title="Колдонуучулар"
            description="Китепканада катталган колдонуучулардын саны"
          >
            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<Users size={18} />}
              label="Колдонуучулардын жалпы саны"
              name="totalUsers"
              value={form.totalUsers}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Эркектер"
              name="men"
              value={form.men}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Аялдар"
              name="women"
              value={form.women}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<Baby size={18} />}
              label="15 жашка чейинки балдар"
              name="childrenUnder15"
              value={form.childrenUnder15}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<GraduationCap size={18} />}
              label="Жаштар"
              name="youth"
              value={form.youth}
              onChange={handleChange}
            />
          </ReportSection>

          <ReportSection
            icon={<BookOpen size={20} />}
            title="Келүүлөр"
            description="Китепканага келүүлөрдүн статистикасы"
          >
            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<BookOpen size={18} />}
              label="Келүүлөрдүн жалпы саны"
              name="totalVisits"
              value={form.totalVisits}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<Monitor size={18} />}
              label="Виртуалдык келүүлөр"
              name="virtualVisits"
              value={form.virtualVisits}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Эркектер"
              name="visitMen"
              value={form.visitMen}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Аялдар"
              name="visitWomen"
              value={form.visitWomen}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<Baby size={18} />}
              label="15 жашка чейинки балдар"
              name="visitChildren"
              value={form.visitChildren}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<GraduationCap size={18} />}
              label="Жаштар"
              name="visitYouth"
              value={form.visitYouth}
              onChange={handleChange}
            />
          </ReportSection>

          <ReportSection
            icon={<CalendarDays size={20} />}
            title="Иш-чаралар"
            description="Өткөрүлгөн иш-чаралардын жана алардын катышуучуларынын саны"
          >
            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<CalendarDays size={18} />}
              label="Иш-чаралардын саны"
              name="events"
              value={form.events}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Эркектер"
              name="eventMen"
              value={form.eventMen}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<UserRound size={18} />}
              label="Аялдар"
              name="eventWomen"
              value={form.eventWomen}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<Baby size={18} />}
              label="15 жашка чейинки балдар"
              name="eventChildren"
              value={form.eventChildren}
              onChange={handleChange}
            />

            <ReportInput
              inputRefs={inputRefs}
              errors={errors}
              icon={<GraduationCap size={18} />}
              label="Жаштар"
              name="eventYouth"
              value={form.eventYouth}
              onChange={handleChange}
            />
          </ReportSection>

          <div className="mb-5 rounded-2xl border border-[#E5E9EF] bg-white p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF7E6]">
                <AlertCircle
                  size={20}
                  className="text-[#D28A00]"
                />
              </div>

              <div>
                <p className="font-medium text-[#1C3458]">
                  Жөнөтүүдөн мурун маалыматтарды текшериңиз
                </p>

                <p className="mt-1 text-sm leading-5 text-[#8992A3]">
                  Отчет жөнөтүлгөндөн кийин серверге өткөрүлүп
                  берилет. Бардык көрсөтүлгөн маанилердин туура
                  экендигин текшериңиз.
                </p>
              </div>
            </div>
          </div>

          {sent && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#B9E5CC] bg-[#F0FBF4] p-4">
              <CheckCircle2
                size={22}
                className="text-[#20A35A]"
              />

              <div>
                <p className="font-medium text-[#167A42]">
                  Отчет ийгиликтүү жөнөтүлдү
                </p>

                <p className="text-sm text-[#4D8A65]">
                  Маалыматтар серверге өткөрүлүп берилди.
                </p>
              </div>
            </div>
          )}

          <div className="mb-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-6 text-sm font-medium text-[#1C3458] transition hover:bg-[#F6F8FB]"
            >
              {saved ? (
                <>
                  <CheckCircle2 size={18} />
                  Сакталды
                </>
              ) : (
                <>
                  <Save size={18} />
                  Каралама катары сактоо
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1C3458] px-8 text-sm font-medium text-white shadow-[0_4px_12px_rgba(28,52,88,0.2)] transition hover:bg-[#294873] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Жөнөтүлүүдө...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Отчетту жөнөтүү
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ReportSection = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <section className="mb-6 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FA] text-[#1C3458]">
          {icon}
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[#1C3458]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#8A93A3]">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
};

const ReportInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  errors,
  inputRefs,
}) => {
  const hasError = Boolean(errors[name]);

  return (
    <div
      className={`
        group
        rounded-xl
        border
        p-4
        transition-all
        duration-200
        ${
          hasError
            ? "border-red-400 bg-red-50/50 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
            : "border-[#E1E6ED] bg-[#FAFBFC]"
        }
        focus-within:bg-white
        ${
          hasError
            ? "focus-within:border-red-500"
            : "focus-within:border-[#1C3458]"
        }
      `}
    >
      <label
        htmlFor={name}
        className={`
          mb-3 flex items-center gap-2 text-sm font-medium
          ${
            hasError
              ? "text-red-600"
              : "text-[#48556A]"
          }
        `}
      >
        <span
          className={
            hasError
              ? "text-red-500"
              : "text-[#1C3458]"
          }
        >
          {icon}
        </span>

        {label}
      </label>

      <input
        ref={(element) => {
          inputRefs.current[name] = element;
        }}
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        className={`
          h-12
          w-full
          rounded-lg
          border
          bg-white
          px-4
          text-[18px]
          font-semibold
          outline-none
          transition
          ${
            hasError
              ? "border-red-400 text-red-700 placeholder:text-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
              : "border-[#DDE3EA] text-[#1C3458] placeholder:text-[#B8C0CC] focus:border-[#1C3458] focus:ring-2 focus:ring-[#1C3458]/10"
          }
        `}
      />

      {hasError && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle size={14} />
          Бул талааны толтуруңуз
        </p>
      )}
    </div>
  );
};

export default ReportPage;