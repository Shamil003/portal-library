import React from 'react';

// Простой компонент для отображения иконки в "мягкой" квадратной рамке
const StatCard = ({ icon: Icon, title, value, total, progressColor }) => {
  // Вычисляем процент для полоски
  const percentage = total ? (value / total) * 100 : 0;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      {/* Иконка в подложке */}
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
        <Icon size={20} />
      </div>
      
      {/* Заголовок */}
      <p className="text-[10px] text-gray-500 uppercase font-semibold">{title}</p>
      
      {/* Цифры */}
      <div className="text-xl font-bold mt-1">
        {value} {total && <span className="text-gray-400 font-normal">/ {total}</span>}
      </div>
      
      {/* Прогресс-бар */}
      {total && (
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full ${progressColor}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;