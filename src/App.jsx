import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Router } from "./router/Router";

const tabToPath = {
  home: "/",
  libraries: "/libraries",
  library: "/library",
  another: "/another",
  profile: "/profile",
};

const pathToTab = {
  "/": "home",
  "/libraries": "libraries",
  "/library": "library",
  "/another": "another",
  "/profile": "profile",
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем активную вкладку по URL
  const activeTab = pathToTab[location.pathname] || "home";

  // Получаем пользователя из localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Переключение страниц через Sidebar
  const handleTabChange = (tab) => {
    navigate(tabToPath[tab]);
  };

  // Авторизация
  const handleLogin = (userData) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Выход
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