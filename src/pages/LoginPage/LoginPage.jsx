import { useState } from "react";
import gerbLogo from "../../assets/gerb.svg";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext"; // <-- Импортируем AuthContext
import { getAllUsers } from "../../utils/mockUsers"; // <-- Импортируем функцию получения всех пользователей

export const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth(); // <-- Берем функцию login из контекста
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError(t("modal_err_empty"));
      return;
    }

    // Ищем пользователя среди тестовых И созданных аккаунтов
    const user = getAllUsers().find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user); // Сохраняем пользователя и его роль
    } else {
      setError(t("modal_err_wrong"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F1E36]">
      <div className="relative w-[650px] h-[620px] bg-[#1C3458] rounded-[5px] p-[50px] text-white">
        <div className="flex justify-center">
          <img
            src={gerbLogo}
            alt="Герб Кыргызской Республики"
            className="w-[105px] h-[105px]"
          />
        </div>

        <h1 className="mt-[24px] text-center text-[22px] leading-[27px] font-bold whitespace-pre-line">
          {t("modal_title")}
        </h1>

        <p className="mt-[24px] text-center text-[16px]">{t("modal_login")}</p>

        <div className="flex flex-col gap-[25px]">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Email"
            className="w-full h-[40px] bg-transparent border-b-2 border-white outline-none text-white placeholder:text-white placeholder:opacity-90"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder={t("modal_password")}
            className="w-full h-[40px] bg-transparent border-b-2 border-white outline-none text-white placeholder:text-white placeholder:opacity-90"
          />

          {error && (
            <p className="text-red-300 text-[13px] text-center -mt-[10px]">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full h-[38px] rounded-full bg-[#E1E4F0] text-[#1C3458] text-[16px] font-medium cursor-pointer"
          >
            {t("modal_btn")}
          </button>
        </div>
      </div>
    </div>
  );
};