import { useState } from "react";
import { Library } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AnotherCard from "./AnotherCard.jsx";
import AnimatedSearch from "../../components/AnimatedSearch";
import { useLanguage } from "../../context/LanguageContext";

import img8 from "./img/add.svg";
import img90 from "./img/Group 49.svg";
import img70 from "./img/Group 29.svg";

const AnotherPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const region = location.state?.region;
  const library = location.state?.library;

  const [search, setSearch] = useState("");

  const translateLibraryName = (name) => {
    if (!name) return name;
    return name
      .replace(/Китепкананын аты/gi, t("card_library_name") || "Название библиотеки")
      .replace(/китепкана/gi, "библиотека")
      .replace(/Китепкана/gi, "Библиотека");
  };

  const cards = [
    {
      id: 14,
      title: t("card_main_table"),
      icon: img8,
      completed: true,
    },
    {
      id: 16,
      title: t("card_material_tech"),
      icon: img70,
      completed: false,
    },
    {
      id: 18,
      title: t("card_info_res"),
      icon: img90,
      completed: true,
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

  const handleCardClick = (card) => {
    if (card.id === 14) {
      navigate("/reports", {
        state: {
          region,
          library,
        },
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
        <span
          onClick={() => navigate("/libraries")}
          className="cursor-pointer transition hover:text-blue-600"
        >
          {t("lib_title")}
        </span>

        <span className="text-gray-400">/</span>

        <span
          onClick={handleBack}
          className="cursor-pointer transition hover:text-blue-600"
        >
          {region?.name || t("reg_osh")}
        </span>

        <span className="text-gray-400">/</span>

        <span className="font-bold text-slate-800">
          {translateLibraryName(library?.name) || t("card_library_name")}
        </span>
      </div>

      <div className="mb-6">
        <div className="w-[200px] rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Library size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            {t("lib_total")}
          </p>

          <div className="mt-1 text-2xl font-bold">
            {region?.count || "1,789"}
          </div>
        </div>
      </div>

      <AnimatedSearch
        value={search}
        onChange={setSearch}
      />

      <div className="mt-4 flex flex-wrap gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="cursor-pointer"
          >
            <AnotherCard
              icon={card.icon}
              title={card.title}
              completed={card.completed}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnotherPage;