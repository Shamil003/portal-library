
import Notifications from "../pages/Notifications/Notifications";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

export const Header = ({ user, setUser, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="flex justify-end items-center gap-4 bg-white px-8 py-4 border-b border-gray-100 shadow-sm -mx-8 -mt-8 mb-8">
      <Notifications />

      {user ? (
        <div className="group flex items-center gap-0 rounded-xl bg-white border border-gray-200 shadow-sm p-1.5 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">

          {/* Кнопка профиля */}
          <button
            onClick={handleProfileClick}
            className="group/profile flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-50"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 transition-all duration-300 group-hover/profile:ring-blue-400 group-hover/profile:scale-105"
            />

            <span className="text-base font-semibold text-[#434343] transition-colors duration-300 group-hover/profile:text-blue-600">
              {user.name}
            </span>
          </button>

          {/* Кнопка выхода */}
          <button
            onClick={onLogout}
            className="ml-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600/20 cursor-pointer transition-all duration-300 ease-out hover:bg-red-500 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40 active:scale-95 active:translate-y-0"
          >
            Чыгуу
          </button>

        </div>
      ) : (
        <Modal setUser={setUser} />
      )}
    </header>
  );
};
