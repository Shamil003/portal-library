import React from 'react';
import { Library, Search, Download } from 'lucide-react';

export const MonthlyReportPage = ({ onBack }) => {
  // Список полей для таблицы отчета
  const reportRows = [
    "ID (автоматически)",
    "Статистика библиотеки (внешний ключ)",
    "Общее число пользователей всего челов",
    "Из них виртуальных чел.",
    "В т.ч. женщины",
    "Дети до 15 лет",
    "Молодежь",
    "Общее число посещений - всего ед.",
    "Из них виртуальных чел.",
    "В т.ч. женщины (из общего числа посещений)",
    "Дети до 15 лет (из общего числа посещений)",
    "Молодежь (из общего числа посещений)",
    "Из общего числа посещений - посещения...",
    "В т.ч. женщины (мероприятия)",
    "Дети до 15 лет (мероприятия)",
    "Молодежь (мероприятия)"
  ];

  return (
    <div>
 

      {/* Верхние блоки статистики */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Большая активная карточка слева */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] text-gray-500 uppercase font-semibold">Жалпы китепканалар</p>
          <div className="text-2xl font-bold mt-1">1789</div>
        </div>

        {/* Пустые карточки для сохранения сетки */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
      </div>

      {/* Панель поиска и кнопки управления */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Поиск */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Издөө..." 
            className="w-full pl-11 pr-4 py-2.5 bg-[#1C3458] text-white rounded-xl text-sm focus:outline-none placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* Кнопка экспорта/скачивания */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="bg-[#1C3458] hover:bg-[#152846] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition cursor-pointer">
            <Download size={16} />
            Көчүрүү
          </button>
        </div>
      </div>

      {/* Таблица данных отчета */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 border-b border-gray-200 px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div>Көрсөткүч / Параметр</div>
          <div>Мааниси / Маалымат</div>
        </div>

        <div className="divide-y divide-gray-100">
          {reportRows.map((rowName, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 px-6 py-3.5 items-center hover:bg-gray-50/50 transition">
              <div className="text-sm font-medium text-slate-800">{rowName}</div>
              <div className="text-sm text-gray-400 italic">
                {/* Здесь можно вставить input для заполнения отчета */}
                <span className="text-gray-300">маалымат киргизилген эмес</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};