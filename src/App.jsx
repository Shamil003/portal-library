import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Router } from "./router/Router";
import { LoginPage } from "./pages/LoginPage/LoginPage";

const tabToPath = {
  home: "/",
  libraries: "/libraries",
  profile: "/profile",
  map: "/map",
  rep: "/rep",
  reports: "/reports",
  "edit-requests": "/edit-requests",
  deadlines: "/deadlines",
  stats: "/stats",
};

const pathToTab = {
  "/": "home",
  "/libraries": "libraries",
  "/profile": "profile",
  "/map": "map",
  "/rep": "rep",
  "/reports": "reports",
  "/edit-requests": "edit-requests",
  deadlines: "/deadlines",
  "/stats": "stats",
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
    if (user && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (!user) {
    return <LoginPage setUser={setUser} />;
  }

  const activeTab = pathToTab[location.pathname] || "home";

  const handleTabChange = (tab) => {
    const path = tabToPath[tab];
    if (!path) return;
    navigate(path);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header user={user} onLogout={handleLogout} />
        <Router user={user} />
      </main>
    </div>
  );
};

export default App;
