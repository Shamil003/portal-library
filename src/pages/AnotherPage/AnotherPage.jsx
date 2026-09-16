import { useState } from "react";
import { Library } from "lucide-react";

import AnotherCard from "./AnotherCard.jsx";
import AnimatedSearch from "../../components/AnimatedSearch";
import ScrollReveal from "../../components/ScrollReveal";

import img8 from "./img/add.svg";
import img90 from "./img/Group 49.svg";
import img70 from "./img/Group 29.svg";

const AnotherPage = () => {
  const [search, setSearch] = useState("");

  const cards = [
    {
      id: 14,
      title: "Башкы таблица",
      icon: img8,
      completed: true,
    },
    {
      id: 16,
      title: "Материалдык тех. база",
      icon: img70,
      completed: false,
    },
    {
      id: 18,
      title: "Информациялык ресурстар",
      icon: img90,
      completed: true,
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
              <AnotherCard
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

export default AnotherPage;
