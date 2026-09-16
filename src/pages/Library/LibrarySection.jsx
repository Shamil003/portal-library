import { useState } from "react";
import { Library } from "lucide-react";

import LibraryCard from "./LibraryCard";

import img1 from "./img/Group 67.svg";
import img3 from "./img/Group 68.svg";
import img4 from "./img/Group 79.svg";
import img5 from "./img/Vector(1).svg";
import img6 from "./img/Group.svg";
import img7 from "./img/页面-1.svg";
import img8 from "./img/Vector 10.svg";

import ScrollReveal from "../../components/ScrollReveal";
import AnimatedSearch from "../../components/AnimatedSearch";

const LibrarySection = () => {
  const [search, setSearch] = useState("");

  const cards = [
    {
      id: 1,
      title: "Башкы таблица",
      icon: img1,
      completed: true,
    },
    {
      id: 2,
      title: "Материалдык тех. база",
      icon: img3,
      completed: false,
    },
    {
      id: 3,
      title: "Информациялык ресурстар",
      icon: img4,
      completed: true,
    },
    {
      id: 4,
      title: "Колдонуучулардын жана кирүүлөрдүн саны",
      icon: img5,
      completed: false,
    },
    {
      id: 5,
      title: "Китепкана фондунун кыймылы",
      icon: img6,
      completed: false,
    },
    {
      id: 6,
      title: "Маалымат кызматтары жана",
      icon: img7,
      completed: false,
    },
    {
      id: 7,
      title: "Кызматкерлер статистикасы",
      icon: img8,
      completed: false,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="w-[200px] bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>

          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Жалпы китепканалар
          </p>

          <div className="text-2xl font-bold mt-1">1,789</div>
        </div>
      </div>

      <AnimatedSearch value={search} onChange={setSearch} />

      <ScrollReveal>
        <div className="flex flex-wrap gap-4">
          {cards.map((card) => (
            <div key={card.id} data-scroll-reveal>
              <LibraryCard
                icon={card.icon}
                title={card.title}
                completed={card.completed}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
};

export default LibrarySection;
