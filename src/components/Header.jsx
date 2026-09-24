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
      <Notifications/>
      {user ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />

            <span className="text-[16px] font-semibold text-[#434343]">
              {user.name}
            </span>
          </button>

          <button
            onClick={onLogout}
            className="text-[16px] text-red-500 cursor-pointer font-bold   transition-all
  duration-200
  hover:scale-105
  active:scale-95"
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
