import React from 'react';
import { Library, Search } from 'lucide-react';

export const RegionDetailPage = ({ region, onBack }) => {

  const librariesList = [
    { name: "Баланчаев Баланча а. китепкана", status: "отчет даяр эмес", badge: "4 / 5", isReady: false },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "1 / 1", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр эмес", badge: "1 / 3", isReady: false },
    { name: "Китепкананын аты", status: "отчет даяр эмес", badge: "1 / 4", isReady: false },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "7 / 7", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "7 / 7", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "6 / 6", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "2 / 2", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "9 / 9", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр эмес", badge: "3 / 9", isReady: false },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "3 / 3", isReady: true },
    { name: "Китепкананын аты", status: "отчет даяр", badge: "5 / 5", isReady: true },
  ];

  return (
    <div>

      <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
        <span 
          onClick={onBack} 
          className="cursor-pointer hover:text-blue-600 transition"
        >
          Китепканалар
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-slate-800 font-bold">{region?.name || "Ош облусу"}</span>
      </div>

      {/* Верхние блоки (как на фото) */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] text-gray-500 uppercase font-semibold">Жалпы китепканалар</p>
          <div className="text-2xl font-bold mt-1">{region?.count || "1,789"}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
      </div>

      {/* Поиск */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Издөө..." 
          className="w-full md:w-96 pl-11 pr-4 py-2.5 bg-[#1C3458] text-white rounded-xl text-sm focus:outline-none placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Список библиотек */}
      <div className="space-y-3">
        {librariesList.map((lib, index) => (
          <div 
            key={index} 
            className="bg-white p-4 px-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-sm text-slate-800">{lib.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-400">{lib.status}</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                lib.isReady 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                  : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}>
                {lib.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};