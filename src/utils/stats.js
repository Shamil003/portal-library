import { translations } from "../context/LanguageContext";

const num = (v) => Number(v) || 0;

export const isOverdue = (r) => {
  if (!r?.deadline) return false;
  return new Date() > new Date(r.deadline) && r.status !== "Отправлен";
};

export const isOnTime = (r) => {
  if (!r?.deadline || !r?.date) return false;
  try {
    return new Date(r.date) <= new Date(r.deadline);
  } catch {
    return false;
  }
};

export const computeKpi = (reports) => {
  const total = reports.length;
  const onTime = reports.filter(isOnTime).length;
  const overdue = reports.filter(isOverdue).length;

  const visitors = reports.reduce((s, r) => s + num(r.totalVisits), 0);
  const users = reports.reduce((s, r) => s + num(r.totalUsers), 0);
  const virtualVisits = reports.reduce((s, r) => s + num(r.virtualVisits), 0);
  const events = reports.reduce((s, r) => s + num(r.events), 0);

  return {
    total,
    onTime,
    onTimePercent: total ? Math.round((onTime / total) * 100) : 0,
    overdue,
    visitors,
    users,
    virtualVisits,
    events,
  };
};

export const groupByMonth = (reports) => {
  const now = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("ru-RU", { month: "short" }),
      year: d.getFullYear(),
      visitors: 0,
      users: 0,
      reports: 0,
    });
  }

  reports.forEach((r) => {
    const src = r.deadline || r.date;
    if (!src) return;
    const d = new Date(src);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = months.find((m) => m.key === key);
    if (!bucket) return;

    bucket.visitors += num(r.totalVisits);
    bucket.users += num(r.totalUsers);
    bucket.reports += 1;
  });

  return months;
};

export const groupByRegion = (reports) => {
  const map = new Map();

  reports.forEach((r) => {
    const region = r.region || "Белгисиз";

    if (!map.has(region)) {
      map.set(region, {
        region,
        reports: 0,
        visitors: 0,
        users: 0,
        overdue: 0,
      });
    }

    const item = map.get(region);
    item.reports += 1;
    item.visitors += num(r.totalVisits);
    item.users += num(r.totalUsers);
    if (isOverdue(r)) item.overdue += 1;
  });

  return Array.from(map.values()).sort((a, b) => b.visitors - a.visitors);
};

export const statusBreakdown = (reports, lang = "kg") => {
  let onTime = 0;
  let overdue = 0;
  let pending = 0;

  reports.forEach((r) => {
    if (isOverdue(r)) overdue += 1;
    else if (isOnTime(r)) onTime += 1;
    else pending += 1;
  });

  const t = (key) => translations[lang]?.[key] || key;

  return [
    { key: "onTime", label: t("stats_status_ontime"), value: onTime, color: "#20A35A" },
    { key: "pending", label: t("stats_status_pending"), value: pending, color: "#F59E0B" },
    { key: "overdue", label: t("stats_status_overdue"), value: overdue, color: "#DC2626" },
  ];
};

export const visitorsBreakdown = (reports, lang = "kg") => {
  const sum = (field) => reports.reduce((s, r) => s + num(r[field]), 0);
  const t = (key) => translations[lang]?.[key] || key;

  return [
    { key: "men", label: t("stats_v_men"), value: sum("visitMen"), color: "#1C3458" },
    { key: "women", label: t("stats_v_women"), value: sum("visitWomen"), color: "#3B6EA5" },
    { key: "children", label: t("stats_v_children"), value: sum("visitChildren"), color: "#F59E0B" },
    { key: "youth", label: t("stats_v_youth"), value: sum("visitYouth"), color: "#20A35A" },
  ];
};

export const formatNumber = (n, lang = "kg") => {
  const t = (key) => translations[lang]?.[key] || key;
  
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(".", ",") + " " + t("format_million");
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(".", ",") + " " + t("format_thousand");
  }
  return String(n);
};