import { useState } from "react";
import { useNavigate } from "react-router-dom";

import gerbLogo from "../assets/gerb.svg";
import Userimg from "../assets/images/Brad-Pitt-2 1.png";

export const Modal = ({ setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    const correctEmail = "test@gmail.com";
    const correctPassword = "123456";

    if (
      email === correctEmail &&
      password === correctPassword
    ) {
      const user = {
        name: "Brad Pitt",
        email: email,
        position: "китепканачы",
        image: Userimg,
      };

      // Передаем пользователя в App
      setUser(user);

      // Закрываем модальное окно
      setIsOpen(false);

      // Очищаем форму
      setEmail("");
      setPassword("");
      setError("");

      // Переходим в профиль
      navigate("/profile");

    } else {
      setError("Неверная почта или пароль");
    }
  };

  return (
    <>
      {/* Кнопка входа */}

      <button
        onClick={() => {
          setIsOpen(true);
          setError("");
        }}
        className="px-5 py-3 bg-[#1C3458] text-white rounded-[10px] cursor-pointer"
      >
        Войти
      </button>

      {/* Модальное окно */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <div className="relative w-[650px] h-[620px] bg-[#1C3458] rounded-[5px] p-[50px] text-white">

            {/* Логотип */}

            <div className="flex justify-center">
              <img
                src={gerbLogo}
                alt="Герб Кыргызской Республики"
                className="w-[105px] h-[105px]"
              />
            </div>

            {/* Заголовок */}

            <h1 className="mt-[24px] text-center text-[22px] leading-[27px] font-bold">
              КЫРГЫЗ РЕСПУБЛИКАСЫНЫН
              <br />
              КИТЕПКАНАЛАР ПОРТАЛЫ
            </h1>

            {/* Подзаголовок */}

            <p className="mt-[24px] text-center text-[16px]">
              Аккаунтка кирүү
            </p>

            {/* Форма */}

            <div className="flex flex-col gap-[25px]">

              {/* Почта */}

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Почта"
                className="w-full h-[40px] bg-transparent border-b-2 border-white outline-none text-white placeholder:text-white placeholder:opacity-90"
              />

              {/* Пароль */}

              <div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Сыр сөз"
                  className="w-full h-[40px] bg-transparent border-b-2 border-white outline-none text-white placeholder:text-white placeholder:opacity-90"
                />

                <div className="mt-[8px] text-right">
                  <button className="text-[11px] underline cursor-pointer">
                    Сыр сөздү унуттуңузбу?
                  </button>
                </div>

              </div>

              {/* Ошибка */}

              {error && (
                <p className="text-red-300 text-[13px] text-center -mt-[10px]">
                  {error}
                </p>
              )}

              {/* Войти */}

              <button
                onClick={handleLogin}
                className="w-full h-[38px] rounded-full bg-[#E1E4F0] text-[#1C3458] text-[16px] font-medium cursor-pointer"
              >
                Кирүү
              </button>

              <p className="cursor-pointer text-center text-[11px] -mt-[12px]">
                Аккаунтуңуз жокпу?
              </p>

            </div>

            {/* Закрыть */}

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-[15px] right-[20px] text-[44px] text-white cursor-pointer"
            >
              ×
            </button>

          </div>

        </div>
      )}
    </>
  );
};