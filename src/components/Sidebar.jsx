import React from 'react';
import { Home, FileText, BarChart2, MapPin, Settings, Library, Dog, Cat, List} from 'lucide-react';
import gerbLogo from '../assets/gerb.svg';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Башкы бет', icon: Home },
    { id: 'monthly', label: 'Айлык отчёттор', icon: FileText },
    { id: 'yearly', label: 'Жылдык отчёттор', icon: FileText },
    { id: 'stats', label: 'Статистика', icon: BarChart2 },
    { id: 'map', label: 'Карта', icon: MapPin },
    { id: 'settings', label: 'Жөндөмөлөр', icon: Settings },
    { id: 'libraries', label: 'Китепканалар', icon: Library },
    {id: 'library', label: 'library', icon: Dog},
    {id: 'another', label: 'another', icon: Cat},
    {id: 'rep', label: 'rep', icon: List}
    
  ];

  return (
    <aside className="w-64 bg-[#1C3458] text-white p-6 flex flex-col shrink-0">
      <div className="mb-8 flex items-center gap-3">
        <img 
          src={gerbLogo} 
          alt="Кыргыз Республикасынын герби" 
          className="w-10 h-10 object-contain rounded-full bg-white p-0.5" 
        />
        <p className="text-[12px] font-bold leading-tight">
          Кыргыз Республикасынын<br/>
          китепканалар аралык<br/>
          порталы
        </p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${activeTab === item.id ? 'bg-[#1e3a5f]' : 'hover:bg-[#1e3a5f]'}`}
          >
            <item.icon size={20}/> {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};