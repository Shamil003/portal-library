import { useLanguage } from "../context/LanguageContext";

export const Profile = ({ user }) => {
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500 font-medium">{t("profile_no_auth")}</p>
      </div>
    );
  }

  // Заглушка для аватарки, если нет картинки
  const renderAvatar = () => {
    if (user.image) {
      return (
        <img
          src={user.image}
          alt={user.name}
          className="w-[200px] h-[200px] object-cover rounded-full shadow-lg border-4 border-white"
        />
      );
    }
    return (
      <div className="w-[200px] h-[200px] rounded-full bg-[#1C3458] text-white flex items-center justify-center font-bold text-6xl shadow-lg border-4 border-white">
        {user.libraryName ? user.libraryName.charAt(0) : "Б"}
      </div>
    );
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(28,52,88,0.06)] border border-[#E3E8EF] flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Аватарка */}
        <div className="shrink-0">
          {renderAvatar()}
        </div>

        {/* Информация */}
        <div className="flex-1 w-full min-w-0">
          <h2 className="text-[24px] font-bold text-[#1C3458] mb-6">
            {t("profile_title")}:
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-[12px] font-medium text-[#8992A3] uppercase tracking-wider mb-1">
                {t("profile_name")}
              </p>
              <p className="text-[18px] font-semibold text-[#1C3458] break-words leading-relaxed">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#8992A3] uppercase tracking-wider mb-1">
                {t("profile_email")}
              </p>
              <p className="text-[18px] font-semibold text-[#1C3458] break-all">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#8992A3] uppercase tracking-wider mb-1">
                {t("profile_position")}
              </p>
              <p className="text-[18px] font-semibold text-[#1C3458] break-words">
                {user.position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};