import { translations } from "../context/LanguageContext";

export const getDeadlineStatus = (deadline) => {
  if (!deadline) return { status: "none", daysLeft: null, hoursLeft: null };
  const now = new Date();
  const end = new Date(deadline);
  const diffMs = end - now;
  const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
  const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) return { status: "overdue", daysLeft, hoursLeft };
  if (daysLeft < 1) return { status: "today", daysLeft, hoursLeft };
  if (daysLeft <= 3) return { status: "soon", daysLeft, hoursLeft };
  return { status: "upcoming", daysLeft, hoursLeft };
};

export const formatTimeLeft = (deadline, lang = "kg") => {
  const { status, daysLeft, hoursLeft } = getDeadlineStatus(deadline);
  const t = (key, params = {}) => {
    let text = translations[lang][key] || key;
    Object.keys(params).forEach((k) => { text = text.replace(`{${k}}`, params[k]); });
    return text;
  };

  if (status === "none") return t("dl_util_none");
  if (status === "overdue") {
    const overdueDays = Math.abs(daysLeft);
    if (overdueDays === 0) return t("dl_util_hours_ago", { h: Math.abs(hoursLeft) });
    return t("dl_util_days_overdue", { d: overdueDays });
  }
  if (status === "today") return t("dl_util_today", { h: hoursLeft });
  return t("dl_util_days_left", { d: daysLeft });
};

export const formatDeadline = (deadline) => {
  if (!deadline) return "—";
  return new Date(deadline).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
};

export const deadlineStyles = {
  overdue: { bg: "bg-[#FEF2F2]", hover: "hover:bg-[#FEE2E2]", border: "border-[#FCA5A5]", text: "text-[#B91C1C]", badge: "bg-[#DC2626] text-white", dot: "bg-[#DC2626]", label: "dl_style_overdue" },
  today: { bg: "bg-[#FFF7E6]", hover: "hover:bg-[#FEF3C7]", border: "border-[#FCD34D]", text: "text-[#B45309]", badge: "bg-[#F59E0B] text-white", dot: "bg-[#F59E0B]", label: "dl_style_today" },
  soon: { bg: "bg-[#FFF7E6]", hover: "hover:bg-[#FEF3C7]", border: "border-[#FCD34D]", text: "text-[#B45309]", badge: "bg-[#F59E0B] text-white", dot: "bg-[#F59E0B]", label: "dl_style_soon" },
  upcoming: { bg: "bg-[#F0FBF4]", hover: "hover:bg-[#DCFCE7]", border: "border-[#B9E5CC]", text: "text-[#167A42]", badge: "bg-[#20A35A] text-white", dot: "bg-[#20A35A]", label: "dl_style_upcoming" },
  none: { bg: "bg-[#F8F9FB]", hover: "hover:bg-[#F1F4F8]", border: "border-[#E3E8EF]", text: "text-[#8992A3]", badge: "bg-[#E3E8EF] text-[#5B6675]", dot: "bg-[#8992A3]", label: "dl_style_none" },
};