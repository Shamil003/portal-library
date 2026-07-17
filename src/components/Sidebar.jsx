import React from 'react';
import { Home, FileText, BarChart2, Building2, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col h-screen">
      <div className="mb-10 text-lg font-bold">Портал библиотек</div>
      
      <nav className="space-y-2">
        <NavItem icon={<Home size={20}/>} label="Башоы панель" active />
        <NavItem icon={<FileText size={20}/>} label="Отчеты" />
        <NavItem icon={<BarChart2 size={20}/>} label="Статистика" />
        <NavItem icon={<Building2 size={20}/>} label="Библиотеки" />
        <NavItem icon={<LayoutDashboard size={20}/>} label="Документы" />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;