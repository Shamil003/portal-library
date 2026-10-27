import { useState } from "react";
import { GraduationCap, Briefcase, Calendar, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; 
import directorImg from "../assets/images/director.png"; 

export const DirectorCard = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)] flex flex-col md:flex-row items-center gap-6">
        <img
          src={directorImg}
          alt="Директор НБКР"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#EAF1FA] shadow-md"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-[20px] font-bold text-[#1C3458]">
            {t("dir_name")}
          </h2>
          <p className="text-[#20A35A] font-medium mt-1">
            {t("dir_position")}
          </p>
          <p className="text-sm text-[#8992A3] mt-2 line-clamp-2">
            {t("dir_desc")}
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 rounded-xl bg-[#1C3458] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#294873]"
          >
            {t("dir_btn")}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
            
            <div className="flex items-center justify-between bg-[#1C3458] px-6 py-4 text-white">
              <h3 className="text-xl font-semibold">{t("dir_modal_title")}</h3>
              <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 hover:bg-white/20">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img
                  src={directorImg}
                  alt="Директор"
                  className="w-40 h-40 rounded-2xl object-cover shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#1C3458]">{t("dir_name")}</h2>
                  <p className="text-[#20A35A] font-medium mt-1">{t("dir_position")}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#8992A3]">
                    <span className="flex items-center gap-1"><Calendar size={16} /> 21 июня 1977 г.</span>
                    <span className="flex items-center gap-1">📍 с. Талды-Булак, Таласская обл.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#48556A]">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-[#1C3458] mb-2">
                    <GraduationCap size={18} /> {t("dir_education")}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Бишкекский гуманитарный университет (Библиография и библиотечное дело, 2002).</li>
                    <li>Финансы и кредит (2007–2009).</li>
                    <li>Аспирантура по направлению «Философия» (2011).</li>
                    <li>Кыргызско-Турецкий университет «Манас» (Тюркология, магистратура, 2009).</li>
                    <li>Дипломатическая академия МИД КР (Управление международными проектами, 2022).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-[#1C3458] mb-2">
                    <Briefcase size={18} /> {t("dir_experience")}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>2003–2010 гг. — Работа в КТУ «Манас» (управление библиотекой).</li>
                    <li>2009–2011 гг. — Старший преподаватель библиотечного дела в БГУ.</li>
                    <li>2012–2019 гг. — Министерство образования и науки КР.</li>
                    <li>2011–2012 гг. — Эксперт Аппарата Правительства КР, спичрайтер премьер-министра.</li>
                    <li>2020 г. — Баллотировался в Жогорку Кенеш от партии «Ордо».</li>
                    <li>Октябрь 2020 г. — Заместитель Руководителя Аппарата Правительства КР.</li>
                    <li>2019–2020 гг. — Коммерческий директор ОсОО «Капитал Билдинг ЛТД».</li>
                    <li>С октября 2025 г. — Директор Национальной библиотеки КР.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#E1E6ED] bg-[#F8F9FB] flex justify-end">
              <button onClick={() => setIsOpen(false)} className="rounded-xl border border-[#DCE2EA] bg-white px-5 py-2 text-sm font-medium text-[#1C3458] hover:bg-[#F3F6FA]">
                {t("dir_close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};