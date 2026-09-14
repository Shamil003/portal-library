import { Upload, FileCheck } from 'lucide-react';

export const HomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Жалпы китепканалар', val: '1,145' },
          { label: 'Тапшырылган отчеттор', val: '1,098' },
          { label: 'Кабыл алынган отчеттор', val: '567' },
          { label: 'Жаңы катталган китепканалар', val: '5' },
          { label: 'Кечигип жаткан отчеттор', val: '9' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase font-semibold">{stat.label}</p>
            <div className="text-xl font-bold mt-1">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <button className="bg-[#4a82c4] text-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:opacity-90 transition">
          <Upload size={32}/>
          <div className="text-left">
            <p className="font-bold">Кварталдык отчетту тапшыруу</p>
            <p className="text-xs opacity-80">2026 жылдын ноябрь айы үчүн</p>
          </div>
        </button>
        <button className="bg-[#56a77d] text-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:opacity-90 transition">
          <FileCheck size={32}/>
          <div className="text-left">
            <p className="font-bold">Жылдык отчетту тапшыруу</p>
            <p className="text-xs opacity-80">2026 жыл</p>
          </div>
        </button>
      </div>
    </div>
  );
};