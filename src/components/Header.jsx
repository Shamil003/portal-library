import React from 'react';

export const Header = () => {
  return (
    <header className="flex justify-end items-center gap-4 bg-white px-8 py-4 border-b border-gray-100 shadow-sm -mx-8 -mt-8 mb-8">
      <span className="text-sm font-medium text-slate-700">Сарбалиев А. | KG | RU</span>
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    </header>
  );
};