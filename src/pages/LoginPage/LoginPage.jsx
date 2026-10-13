import { useState } from "react";

import gerbLogo from "../../assets/gerb.svg";
import Userimg from "../../assets/images/library.png";

export const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    const correctEmail = "test@gmail.com";
    const correctPassword = "123456";

    if (email === correctEmail && password === correctPassword) {
      setUser({
        name: "Library",
        email,
        position: "китепканачы",
        image: Userimg,
      });
    } else {
      setError("Неверная почта или пароль");
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

        <h1 className="mt-[24px] text-center text-[22px] leading-[27px] font-bold">
          КЫРГЫЗ РЕСПУБЛИКАСЫНЫН
          <br />
          КИТЕПКАНАЛАР ПОРТАЛЫ
        </h1>

        <p className="mt-[24px] text-center text-[16px]">Аккаунтка кирүү</p>

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
            placeholder="Сыр сөз"
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
            Кирүү
          </button>
        </div>
      </div>
    </div>
  );
};