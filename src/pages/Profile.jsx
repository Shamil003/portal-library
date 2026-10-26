import { useLanguage } from "../context/LanguageContext";

export const Profile = ({ user }) => {
  const { t } = useLanguage();

  if (!user) {
    return (
      <div>
        <p className="text-red-500">{t("profile_no_auth")}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[43px]">
      <div>
        <img src={user.image} alt={user.name} className="w-[200px] h-[200px] object-cover rounded-full" />
      </div>
      <div>
        <h2 className="text-[14px] font-bold text-[#7B7B7B]">{t("profile_title")}:</h2>
        <div className="mt-[5px]">
          <div>
            <p className="text-[10px] text-[#7B7B7B]">{t("profile_name")}</p>
            <p className="text-[17px] font-semibold text-[#434343]">{user.name}</p>
          </div>
          <div>
            <p className="mt-[5px] text-[10px] text-[#7B7B7B]">{t("profile_email")}</p>
            <p className="text-[17px] font-semibold text-[#434343]">{user.email}</p>
          </div>
          <div>
            <p className="leading-none mt-[5px] text-[10px] text-[#7B7B7B]">{t("profile_position")}</p>
            <p className="text-[17px] font-semibold text-[#434343]">{user.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};