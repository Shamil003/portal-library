// src/utils/section.js

import img1 from "../pages/Library/img/Group 67.svg";
import img3 from "../pages/Library/img/Group 68.svg";
import img4 from "../pages/Library/img/Group 79.svg";
import img5 from "../pages/Library/img/Vector(1).svg";
import img6 from "../pages/Library/img/Group.svg";
import img7 from "../pages/Library/img/页面-1.svg";
import img8 from "../pages/Library/img/Vector 10.svg";

// 3 карточки на экране выбора типа отчета (Frame 9)
export const REPORT_TYPES = [
  { id: 1, title: "Башкы отчеттор", icon: img1 },
  { id: 2, title: "Айлык отчеттор", icon: img3 },
  { id: 3, title: "Жылдык отчеттор", icon: img4 },
];

// 7 карточек внутри конкретного отчета (Frame 6)
export const REPORT_SECTIONS = [
  { id: 1, title: "Башкы таблица", icon: img1 },
  { id: 2, title: "Материалдык тех. база", icon: img3 },
  { id: 3, title: "Информациялык ресурстар", icon: img4 },
  { id: 4, title: "Колдонуучулардын жана кирүүлөрдүн саны", icon: img5 },
  { id: 5, title: "Китепкана фондунун кыймылы", icon: img6 },
  { id: 6, title: "Маалымат кызматтары жана", icon: img7 },
  { id: 7, title: "Кызматкерлер статистикасы", icon: img8 },
];