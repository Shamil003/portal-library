// src/utils/deadline.js

/**
 * Статус дедлайна:
 *  - "overdue"  — просрочен
 *  - "today"    — сегодня последний день (< 24ч)
 *  - "soon"     — осталось ≤ 3 дней
 *  - "upcoming" — осталось больше 3 дней
 *  - "none"     — дедлайн не задан
 */
export const getDeadlineStatus = (deadline) => {
  if (!deadline) return { status: "none", daysLeft: null, hoursLeft: null };

  const now = new Date();
  const end = new Date(deadline);
  const diffMs = end - now;

  const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
  const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    return { status: "overdue", daysLeft, hoursLeft };
  }

  if (daysLeft < 1) {
    return { status: "today", daysLeft, hoursLeft };
  }

  if (daysLeft <= 3) {
    return { status: "soon", daysLeft, hoursLeft };
  }

  return { status: "upcoming", daysLeft, hoursLeft };
};

/**
 * Текст «сколько осталось» на кыргызском.
 */
export const formatTimeLeft = (deadline) => {
  const { status, daysLeft, hoursLeft } = getDeadlineStatus(deadline);

  if (status === "none") return "Мөөнөт белгиленбеген";

  if (status === "overdue") {
    const overdueDays = Math.abs(daysLeft);
    if (overdueDays === 0) {
      const overdueHours = Math.abs(hoursLeft);
      return `${overdueHours} саат мурун бүттү`;
    }
    return `${overdueDays} күн мөөнөтү өттү`;
  }

  if (status === "today") {
    return `Бүгүн бүтөт · ${hoursLeft} саат калды`;
  }

  return `${daysLeft} күн калды`;
};

/**
 * Форматирование даты дедлайна.
 */
export const formatDeadline = (deadline) => {
  if (!deadline) return "—";
  const d = new Date(deadline);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Готовые Tailwind-классы под каждый статус.
 */
export const deadlineStyles = {
  overdue: {
    bg: "bg-[#FEF2F2]",
    hover: "hover:bg-[#FEE2E2]",
    border: "border-[#FCA5A5]",
    text: "text-[#B91C1C]",
    badge: "bg-[#DC2626] text-white",
    dot: "bg-[#DC2626]",
    label: "Мөөнөтү өттү",
  },
  today: {
    bg: "bg-[#FFF7E6]",
    hover: "hover:bg-[#FEF3C7]",
    border: "border-[#FCD34D]",
    text: "text-[#B45309]",
    badge: "bg-[#F59E0B] text-white",
    dot: "bg-[#F59E0B]",
    label: "Бүгүн бүтөт",
  },
  soon: {
    bg: "bg-[#FFF7E6]",
    hover: "hover:bg-[#FEF3C7]",
    border: "border-[#FCD34D]",
    text: "text-[#B45309]",
    badge: "bg-[#F59E0B] text-white",
    dot: "bg-[#F59E0B]",
    label: "Жакында",
  },
  upcoming: {
    bg: "bg-[#F0FBF4]",
    hover: "hover:bg-[#DCFCE7]",
    border: "border-[#B9E5CC]",
    text: "text-[#167A42]",
    badge: "bg-[#20A35A] text-white",
    dot: "bg-[#20A35A]",
    label: "Убакыт бар",
  },
  none: {
    bg: "bg-[#F8F9FB]",
    hover: "hover:bg-[#F1F4F8]",
    border: "border-[#E3E8EF]",
    text: "text-[#8992A3]",
    badge: "bg-[#E3E8EF] text-[#5B6675]",
    dot: "bg-[#8992A3]",
    label: "Мөөнөт жок",
  },
};