import React, { useState } from "react";
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
    women: "",
    childrenUnder15: "",
    youth: "",

    totalVisits: "",
    virtualVisits: "",
    visitWomen: "",
    visitChildren: "",
    visitYouth: "",

    events: "",
    eventWomen: "",
    eventChildren: "",
    eventYouth: "",
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);

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
  };

  const handleSave = () => {
    localStorage.setItem("libraryReport", JSON.stringify(form));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSent(false);

    try {
      const report = {
        totalUsers: Number(form.totalUsers),
        women: Number(form.women),
        childrenUnder15: Number(form.childrenUnder15),
        youth: Number(form.youth),

        totalVisits: Number(form.totalVisits),
        virtualVisits: Number(form.virtualVisits),
        visitWomen: Number(form.visitWomen),
        visitChildren: Number(form.visitChildren),
        visitYouth: Number(form.visitYouth),

        events: Number(form.events),
        eventWomen: Number(form.eventWomen),
        eventChildren: Number(form.eventChildren),
        eventYouth: Number(form.eventYouth),
      };

      console.log("Данные отчёта:", report);

      // Когда backend будет готов:
      //
      // const response = await fetch("/api/reports", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(report),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Ошибка отправки отчёта");
      // }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSent(true);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1100px]">

        {/* Breadcrumbs */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-[#8992A3]">
          <span>Китепканалар</span>
          <span>/</span>
          <span>Ош облусу</span>
          <span>/</span>
          <span>Баланчаева а. китепкана</span>
          <span>/</span>
          <span className="font-medium text-[#1C3458]">
            Отчёт
          </span>
        </div>

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
                Отчёт библиотеки
              </h1>

              <p className="mt-1 text-sm text-[#8A93A3]">
                Заполните данные за отчётный период
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
                Отчётный период
              </p>

              <p className="text-sm font-medium text-[#1C3458]">
                Сентябрь 2026
              </p>
            </div>

          </div>
        </div>

        {/* Library */}
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
                Библиотека
              </p>

              <p className="font-medium text-[#1C3458]">
                Баланчаева а. китепкана
              </p>
            </div>

          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Users */}
          <ReportSection
            icon={<Users size={20} />}
            title="Пользователи"
            description="Количество зарегистрированных пользователей библиотеки"
          >

            <ReportInput
              icon={<Users size={18} />}
              label="Общее количество пользователей"
              name="totalUsers"
              value={form.totalUsers}
              onChange={handleChange}
            />

            <ReportInput
              icon={<UserRound size={18} />}
              label="Из них женщины"
              name="women"
              value={form.women}
              onChange={handleChange}
            />

            <ReportInput
              icon={<Baby size={18} />}
              label="Дети до 15 лет"
              name="childrenUnder15"
              value={form.childrenUnder15}
              onChange={handleChange}
            />

            <ReportInput
              icon={<GraduationCap size={18} />}
              label="Молодёжь"
              name="youth"
              value={form.youth}
              onChange={handleChange}
            />

          </ReportSection>

          {/* Visits */}
          <ReportSection
            icon={<BookOpen size={20} />}
            title="Посещения"
            description="Статистика посещений библиотеки"
          >

            <ReportInput
              icon={<BookOpen size={18} />}
              label="Общее количество посещений"
              name="totalVisits"
              value={form.totalVisits}
              onChange={handleChange}
            />

            <ReportInput
              icon={<Monitor size={18} />}
              label="Виртуальные посещения"
              name="virtualVisits"
              value={form.virtualVisits}
              onChange={handleChange}
            />

            <ReportInput
              icon={<UserRound size={18} />}
              label="Женщины"
              name="visitWomen"
              value={form.visitWomen}
              onChange={handleChange}
            />

            <ReportInput
              icon={<Baby size={18} />}
              label="Дети до 15 лет"
              name="visitChildren"
              value={form.visitChildren}
              onChange={handleChange}
            />

            <ReportInput
              icon={<GraduationCap size={18} />}
              label="Молодёжь"
              name="visitYouth"
              value={form.visitYouth}
              onChange={handleChange}
            />

          </ReportSection>

          {/* Events */}
          <ReportSection
            icon={<CalendarDays size={20} />}
            title="Мероприятия"
            description="Количество проведённых мероприятий и их участники"
          >

            <ReportInput
              icon={<CalendarDays size={18} />}
              label="Количество мероприятий"
              name="events"
              value={form.events}
              onChange={handleChange}
            />

            <ReportInput
              icon={<UserRound size={18} />}
              label="Женщины"
              name="eventWomen"
              value={form.eventWomen}
              onChange={handleChange}
            />

            <ReportInput
              icon={<Baby size={18} />}
              label="Дети до 15 лет"
              name="eventChildren"
              value={form.eventChildren}
              onChange={handleChange}
            />

            <ReportInput
              icon={<GraduationCap size={18} />}
              label="Молодёжь"
              name="eventYouth"
              value={form.eventYouth}
              onChange={handleChange}
            />

          </ReportSection>

          {/* Warning */}
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
                  Проверьте данные перед отправкой
                </p>

                <p className="mt-1 text-sm leading-5 text-[#8992A3]">
                  После отправки отчёт будет передан на сервер.
                  Убедитесь, что все указанные значения корректны.
                </p>
              </div>

            </div>
          </div>

          {/* Success */}
          {sent && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#B9E5CC] bg-[#F0FBF4] p-4">

              <CheckCircle2
                size={22}
                className="text-[#20A35A]"
              />

              <div>
                <p className="font-medium text-[#167A42]">
                  Отчёт успешно отправлен
                </p>

                <p className="text-sm text-[#4D8A65]">
                  Данные переданы на сервер.
                </p>
              </div>

            </div>
          )}

          {/* Buttons */}
          <div className="mb-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleSave}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE2EA] bg-white px-6 text-sm font-medium text-[#1C3458] transition hover:bg-[#F6F8FB]"
            >
              {saved ? (
                <>
                  <CheckCircle2 size={18} />
                  Сохранено
                </>
              ) : (
                <>
                  <Save size={18} />
                  Сохранить черновик
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
                  Отправка...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Отправить отчёт
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
}) => {
  return (
    <div className="group rounded-xl border border-[#E1E6ED] bg-[#FAFBFC] p-4 transition focus-within:border-[#1C3458] focus-within:bg-white">

      <label
        htmlFor={name}
        className="mb-3 flex items-center gap-2 text-sm font-medium text-[#48556A]"
      >

        <span className="text-[#1C3458]">
          {icon}
        </span>

        {label}

      </label>

      <input
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-lg border border-[#DDE3EA] bg-white px-4 text-[18px] font-semibold text-[#1C3458] outline-none transition placeholder:text-[#B8C0CC] focus:border-[#1C3458] focus:ring-2 focus:ring-[#1C3458]/10"
      />

    </div>
  );
};

export default ReportPage;