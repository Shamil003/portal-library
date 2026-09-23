import { useState } from "react";
import { Library } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import LibraryCard from "./LibraryCard";

import img1 from "./img/Group 67.svg";
import img3 from "./img/Group 68.svg";
import img4 from "./img/Group 79.svg";
import img5 from "./img/Vector(1).svg";
import img6 from "./img/Group.svg";
import img7 from "./img/页面-1.svg";
import img8 from "./img/Vector 10.svg";

import AnimatedSearch from "../../components/AnimatedSearch";

const LibrarySection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const region = location.state?.region;
  const library = location.state?.library;
  const report = location.state?.report;

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

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBack = () => {
    navigate(`/libraries/${region?.id || "osh"}`, {
      state: {
        region,
      },
    });
  };

  const handleReportsBack = () => {
    navigate("/reports", {
      state: {
        region,
        library,
      },
    });
  };

  return (
    <div className="p-6">
      {/* Хлебные крошки */}
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
        <span
          onClick={() => navigate("/libraries")}
          className="cursor-pointer transition hover:text-blue-600"
        >
          Китепканалар
        </span>

        <span className="text-gray-400">/</span>

        <span
          onClick={handleBack}
          className="cursor-pointer transition hover:text-blue-600"
        >
          {region?.name || "Ош облусу"}
        </span>

        <span className="text-gray-400">/</span>

        <span className="font-bold text-slate-800">
          {library?.name || "Китепкананын аты"}
        </span>

        {report && (
          <>
            <span className="text-gray-400">/</span>

            <span
              onClick={handleReportsBack}
              className="cursor-pointer font-bold text-slate-800 transition hover:text-blue-600"
            >
              Отчеты
            </span>

            <span className="text-gray-400">/</span>

            <span className="font-bold text-slate-800">
              {report.date}
            </span>
          </>
        )}
      </div>

      {/* Статистика */}
      <div className="mb-6">
        <div className="w-[200px] rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Library size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            Жалпы китепканалар
          </p>

          <div className="mt-1 text-2xl font-bold">
            1,789
          </div>
        </div>
      </div>

      {/* Поиск */}
      <AnimatedSearch
        value={search}
        onChange={setSearch}
      />

      {/* Карточки */}
      <div className="mt-4 flex flex-wrap gap-4">
        {filteredCards.map((card) => {
          const isCompleted = report
            ? report.completedCards?.includes(card.id) ?? false
            : card.completed;

          return (
            <div key={card.id}>
              <LibraryCard
                icon={card.icon}
                title={card.title}
                completed={isCompleted}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibrarySection;