import { Library, Search } from 'lucide-react';
import AnotherCard from './AnotherCard.jsx'
// import LibraryCard from './LibraryCard';

import img8 from './img/add.svg';
import img90 from './img/Group 49.svg';
import img70 from './img/Group 29.svg';
import ScrollReveal from '../../components/ScrollReveal';

const AnotherPage = () => {
  const cards = [
    {
      id: 14,
      title: 'Башкы таблица',
      icon: img8,
      completed: true,
    },
    {
      id: 16,
      title: 'Материалдык тех. база',
      icon: img70,
      completed: false,
    },
    {
      id: 18,
      title: 'Информациялык ресурстар',
      icon: img90,
      completed: true,
    }
  ];

  return (
    <div className="p-6">

      {/* Статистика */}
      <div className="mb-6">
        <div className="w-[200px] bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>

          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Жалпы китепканалар
          </p>

          <div className="text-2xl font-bold mt-1">
            1,789
          </div>

        </div>
      </div>

      {/* Поиск */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search size={18} />
        </span>

        <input
          type="text"
          placeholder="Издөө..."
          className="
            w-full md:w-96
            pl-11 pr-4 py-2.5
            bg-[#1C3458]
            text-white
            rounded-xl
            text-sm
            focus:outline-none
            placeholder-gray-400
            shadow-sm
          "
        />
      </div>

    <ScrollReveal>
            {/* Карточки */}
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <AnotherCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            completed={card.completed}
          />
        ))}
      </div>
    </ScrollReveal>

    </div>
  );
};

export default AnotherPage;