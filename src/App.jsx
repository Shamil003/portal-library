import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Router } from "./router/Router";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useAuth } from "./context/AuthContext";

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
  users: "/users",
  tasks: "/tasks",
};

const pathToTab = {
  "/": "home",
  "/libraries": "libraries",
  "/profile": "profile",
  "/map": "map",
  "/rep": "rep",
  "/reports": "reports",
  "/edit-requests": "edit-requests",
  "/deadlines": "deadlines",
  "/stats": "stats",
  "/users": "users",
  "/tasks": "tasks",
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
    if (user && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (!user) {
    return <LoginPage setUser={login} />;
  }

  const activeTab = pathToTab[location.pathname] || "home";

  const handleTabChange = (tab) => {
    const path = tabToPath[tab];
    if (!path) return;
    navigate(path);
  };

  const handleLogout = () => {
    logout();
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