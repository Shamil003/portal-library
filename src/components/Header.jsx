import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Languages, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Notifications from "../pages/Notifications/Notifications";
import { Modal } from "./Modal";

export const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { lang, toggleLang, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false); // Состояние для разворота

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Функция для создания заглушки, если нет картинки
  const renderAvatar = () => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 transition-all duration-300 group-hover/profile:ring-blue-400 group-hover/profile:scale-105"
        />
      );
    }
    // Если картинки нет — показываем первую букву названия библиотеки
    return (
      <div className="w-10 h-10 rounded-full bg-[#1C3458] text-white flex items-center justify-center font-bold text-lg ring-2 ring-gray-100 transition-all duration-300 group-hover/profile:ring-blue-400 group-hover/profile:scale-105">
        {user?.libraryName ? user.libraryName.charAt(0) : "Б"}
      </div>
    );
  };

  return (
    <header className="flex justify-end items-center gap-4 bg-white px-8 py-4 border-b border-gray-100 shadow-sm -mx-8 -mt-8 mb-8">
      
      {/* Кнопка переключения языка */}
      <button
        onClick={() => toggleLang(lang === "kg" ? "ru" : "kg")}
        className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-[#1C3458] hover:bg-gray-100 transition"
      >
        <Languages size={18} />
        {lang === "kg" ? "КЫР" : "РУС"}
      </button>

      <Notifications />

      {user ? (
        <div className="group flex items-center gap-0 rounded-xl bg-white border border-gray-200 shadow-sm p-1.5 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
          
          <button
            onClick={handleProfileClick}
            className="group/profile flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-50 max-w-[400px]"
          >
            {renderAvatar()}
            
            {/* Блок с текстом и кнопкой разворота */}
            <div className="flex items-center gap-2">
              <span 
                className={`text-base font-semibold text-[#434343] transition-colors duration-300 group-hover/profile:text-blue-600 ${
                  isExpanded ? "whitespace-normal text-left" : "truncate max-w-[200px]"
                }`}
                title={user.name} // Показывает полный текст при наведении мыши
              >
                {user.name}
              </span>
              
              {/* Кнопка развернуть/свернуть (только если текст длинный) */}
              {user.name.length > 20 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Чтобы не перекидывало в профиль при клике на стрелку
                    setIsExpanded(!isExpanded);
                  }}
                  className="p-1 rounded-md hover:bg-blue-100 text-blue-500 transition"
                  title={isExpanded ? "Свернуть" : "Развернуть"}
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>
          </button>

          <button
            onClick={onLogout}
            className="ml-2 flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600/20 cursor-pointer transition-all duration-300 ease-out hover:bg-red-500 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40 active:scale-95 active:translate-y-0"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">{t("header_logout")}</span>
          </button>
        </div>
      ) : (
        <Modal isOpen={true} onClose={() => {}} />
      )}
    </header>
  );
};