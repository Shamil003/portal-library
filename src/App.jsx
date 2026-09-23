import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Router } from "./router/Router";

const tabToPath = {
  home: "/",
  libraries: "/libraries",
  profile: "/profile",
  map: "Map",
  rep: 'Rep'
};

const pathToTab = {
  "/": "home",
  "/libraries": "libraries",
  "/profile": "profile",
  "/map": "Map",
  "/rep": "rep"
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = pathToTab[location.pathname] || "home";

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleTabChange = (tab) => {
    const path = tabToPath[tab];

    if (!path) {
      console.error("Неизвестная вкладка:", tab);
      return;
    }

    navigate(path);
  };

  const handleLogin = (userData) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header
          user={user}
          setUser={handleLogin}
          onLogout={handleLogout}
        />

        <Router user={user} />
      </main>
    </div>
  );
};

export default App;
