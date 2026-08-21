import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LibrariesPage } from './pages/LibrariesPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header />
        
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'libraries' && <LibrariesPage />}
        
        {!['home', 'libraries'].includes(activeTab) && (
          <div className="text-gray-400"> бул {activeTab} дагы да жасалып жатат...</div>
        )}
      </main>
    </div>
  );
};

export default App;