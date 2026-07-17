import React from 'react';
import { Home, FileText, BarChart2, Library, Briefcase, FileCheck, Upload, Users } from 'lucide-react';

const App = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans">
     
      <aside className="w-64 bg-[#14233c] text-white p-6 flex flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
          <p className="text-[10px] font-bold leading-tight">Кыргыз Республикасынын<br/>китепканалар аралык<br/>порталы</p>
        </div>
        
        <nav className="space-y-6">
          
          <div className="flex items-center gap-3 bg-[#1e3a5f] p-3 rounded-lg cursor-pointer"><Home size={20}/> Башкы бет</div>
          
          <div className="text-[10px] text-gray-400 uppercase font-bold">Отчеттулук</div>
          <div className="flex items-center gap-3 p-3 hover:bg-[#1e3a5f] rounded-lg cursor-pointer"><FileText size={20}/> Айлык отчёттор</div>
          <div className="flex items-center gap-3 p-3 hover:bg-[#1e3a5f] rounded-lg cursor-pointer"><FileText size={20}/> Жылдык отчёттор</div>
          <div className="flex items-center gap-3 p-3 hover:bg-[#1e3a5f] rounded-lg cursor-pointer"><BarChart2 size={20}/> Статистика</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-end items-center gap-4 mb-8">
          <span className="text-sm">Сарбалиев А. | KG | RU</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { title: "Жалпы китепканалар", val: "1,145" },
            { title: "Тапшырылган отчеттор", val: "1,098" },
            { title: "Кабыл алынган отчеттор", val: "567" },
            { title: "Жаңы катталган китепканалар", val: "5" },
            { title: "Кечигип жаткан отчеттор", val: "9" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-[10px] text-gray-500">{item.title}</p>
              <p className="text-xl font-bold mt-2">{item.val}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button className="bg-[#4a82c4] text-white p-6 rounded-xl flex items-center gap-4">
            <Upload size={32}/>
            <div>
              <p className="font-bold">Кварталдык отчетту тапшыруу</p>
              <p className="text-xs opacity-80">2026 жылдын ноябрь айы үчүн</p>
            </div>
          </button>
          <button className="bg-[#56a77d] text-white p-6 rounded-xl flex items-center gap-4">
            <FileCheck size={32}/>
            <div>
              <p className="font-bold">Жылдык отчетту тапшыруу</p>
              <p className="text-xs opacity-80">2026 жыл</p>
            </div>
          </button>
        </div>

        {/* Tasks Table */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-6">Жакынкы тапшырмалар / Ближайшие задачи</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span>2026-жылкы жылдык отчет</span>
              <span className="text-xs text-gray-500">12.12.2026</span>
              <span className="bg-[#56a77d] text-white px-3 py-1 rounded text-[10px]">Тапшыруу керек / К сдаче</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Кварталдык отчету</span>
              <span className="text-xs text-gray-500">12.12.2026</span>
              <span className="bg-[#f59e0b] text-white px-3 py-1 rounded text-[10px]">Күтүүдө / В ожидании</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;   