import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

export const Header = ({ user, setUser, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="flex justify-end items-center gap-4 bg-white px-8 py-4 border-b border-gray-100 shadow-sm -mx-8 -mt-8 mb-8">

      {user ? (
        <div className="flex items-center gap-3">

          {/* Аватарка + имя */}
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

          {/* Выход */}
          <button
            onClick={onLogout}
            className="text-[16px] text-red-500 cursor-pointer font-bold"
          >
            Выйти
          </button>

        </div>
      ) : (
        <Modal setUser={setUser} />
      )}

    </header>
  );
};