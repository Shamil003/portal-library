import { useState, useEffect } from "react";
import { Library, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedSearch from "../components/AnimatedSearch";
import { useLanguage } from "../context/LanguageContext";
import { getLibraries } from "../utils/mockUsers"; 

import bishkekImg from "../assets/images/bishkek.png";
import batkenImg from "../assets/images/batken.png";
import jalalAbadImg from "../assets/images/jalalAbad.jpg";
import narynImg from "../assets/images/naryn.png";
import oshImg from "../assets/images/osh.jpg";
import talasImg from "../assets/images/talas.png";
import chuyImg from "../assets/images/chuy.png";
import IKImg from "../assets/images/IK.png";

export const LibrariesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [createdLibraries, setCreatedLibraries] = useState([]);

  useEffect(() => {
    setCreatedLibraries(getLibraries());
  }, []);

  const regions = [
    { id: "all", name: t("lib_all"), count: "1,789", image: bishkekImg },
    { id: "batken", name: t("reg_batken"), count: "123", image: batkenImg },
    { id: "jalal-abad", name: t("reg_jalal_abad"), count: "234", image: jalalAbadImg },
    { id: "naryn", name: t("reg_naryn"), count: "134", image: narynImg },
    { id: "osh", name: t("reg_osh"), count: "634", image: oshImg },
    { id: "talas", name: t("reg_talas"), count: "224", image: talasImg },
    { id: "chuy", name: t("reg_chuy"), count: "333", image: chuyImg },
    { id: "issyk-kul", name: t("reg_issyk_kul"), count: "134", image: IKImg },
  ];

  const filteredRegions = regions.filter((reg) => reg.name.toLowerCase().includes(search.toLowerCase()));
  const filteredCreated = createdLibraries.filter((lib) => lib.name.toLowerCase().includes(search.toLowerCase()));

  const handleRegionClick = (region) => {
    navigate(`/libraries/${region.id}`, { state: { region } });
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">{t("lib_title")}</h2>

      <div className="mb-6 grid grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] font-semibold uppercase text-gray-500">{t("lib_total")}</p>
          <div className="mt-1 text-2xl font-bold">1,789</div>
        </div>
      </div>

      <AnimatedSearch value={search} onChange={setSearch} />

      {filteredCreated.length > 0 && (
        <div className="mt-6 mb-8">
          <h3 className="mb-3 text-sm font-semibold text-[#1C3458] flex items-center gap-2">
            <PlusCircle size={18} className="text-[#20A35A]" />
            Жаңы кошулган китепканалар (Созданные вручную)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCreated.map((lib) => (
              <div key={lib.id} className="rounded-2xl border border-[#B9E5CC] bg-[#F0FBF4] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#20A35A] shadow-sm">
                    <Library size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C3458]">{lib.name}</p>
                    <p className="text-xs text-[#8992A3]">Тип: {lib.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="mb-3 text-sm font-semibold text-[#1C3458]">Области</h3>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredRegions.map((reg, index) => (
          <div
            key={reg.id}
            onClick={() => handleRegionClick(reg)}
            className="group relative flex h-36 cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="z-10 flex h-full flex-col justify-between">
              <h3 className="text-lg font-bold text-slate-800">{reg.name}</h3>
              <p className="text-xs text-gray-500">
                {t("lib_title")}: <span className="font-semibold text-slate-700">{reg.count}</span>
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden rounded-r-2xl bg-gray-100">
              <img src={reg.image} alt={reg.name} loading={index === 0 ? "eager" : "lazy"} decoding="async" className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-black/70 opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};