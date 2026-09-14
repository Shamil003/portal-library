import React, { useState } from "react";
import { Library, Search } from "lucide-react";
import bishkekImg from "../assets/images/bishkek.png";
import batkenImg from "../assets/images/batken.png";
import jalalAbadImg from "../assets/images/jalalAbad.jpg";
import narynImg from "../assets/images/naryn.png";
import oshImg from "../assets/images/osh.jpg";
import talasImg from "../assets/images/talas.png";
import chuyImg from "../assets/images/chuy.png";
import IKImg from "../assets/images/IK.png";

const RegionDetailPage = ({ region, onBack }) => {
  const librariesList = [
    {
      name: "Баялинов а китепкана",
      status: "отчет даяр эмес",
      badge: "4 / 5",
      isReady: false,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "1 / 1",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр эмес",
      badge: "1 / 3",
      isReady: false,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр эмес",
      badge: "1 / 4",
      isReady: false,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "7 / 7",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "7 / 7",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "6 / 6",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "2 / 2",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "9 / 9",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр эмес",
      badge: "3 / 9",
      isReady: false,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "3 / 3",
      isReady: true,
    },
    {
      name: "Китепкананын аты",
      status: "отчет даяр",
      badge: "5 / 5",
      isReady: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
        <span
          onClick={onBack}
          className="cursor-pointer hover:text-blue-600 transition"
        >
          Китепканалар
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-slate-800 font-bold">{region?.name}</span>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Жалпы китепканалар
          </p>
          <div className="text-2xl font-bold mt-1">
            {region?.count || "1,789"}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"></div>
      </div>

      {/* Поиск */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Издөө..."
          className="w-full md:w-96 pl-11 pr-4 py-2.5 bg-[#1C3458] text-white rounded-xl text-sm focus:outline-none placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Список библиотек */}
      <div className="space-y-3">
        {librariesList.map((lib, index) => (
          <div
            key={index}
            className="bg-white p-4 px-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-sm text-slate-800">{lib.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-400">{lib.status}</span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  lib.isReady
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-slate-50 text-slate-600 border border-slate-200"
                }`}
              >
                {lib.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LibrariesPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    {
      name: "Бардык республикалык китепканалар",
      count: "1,789",
      image: bishkekImg,
    },
    {
      name: "Баткен облусу",
      count: "123",
      image: batkenImg,
    },
    {
      name: "Джалал-Абад облусу",
      count: "234",
      image: jalalAbadImg,
    },
    {
      name: "Нарын облусу",
      count: "134",
      image: narynImg,
    },
    {
      name: "Ош облусу",
      count: "634",
      image: oshImg,
    },
    {
      name: "Талас облусу",
      count: "224",
      image: talasImg,
    },
    {
      name: "Чүй облусу",
      count: "333",
      image: chuyImg,
    },
    {
      name: "Ысык-Көл облусу",
      count: "134",
      image: IKImg,
    },
  ];

  if (selectedRegion) {
    return (
      <RegionDetailPage
        region={selectedRegion}
        onBack={() => setSelectedRegion(null)}
      />
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Китепканалар</h2>
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-700">
            <Library size={20} />
          </div>
          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Жалпы китепканалар
          </p>
          <div className="text-2xl font-bold mt-1">1,789</div>
        </div>
      </div>

      {/* Поле поиска */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Издөө..."
          className="w-full md:w-96 pl-11 pr-4 py-2.5 bg-[#1C3458] text-white rounded-xl text-sm focus:outline-none placeholder-gray-400 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regions.map((reg, index) => (
          <div
            key={index}
            onClick={() => setSelectedRegion(reg)}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex justify-between items-center relative h-36 p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Текстовая информация */}
            <div className="z-10 flex flex-col justify-between h-full">
              <h3 className="font-bold text-lg text-slate-800">{reg.name}</h3>
              <p className="text-xs text-gray-500">
                Китепканалар:{" "}
                <span className="font-semibold text-slate-700">
                  {reg.count}
                </span>
              </p>
            </div>

            {/* Контейнер фонового изображения */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center rounded-r-2xl"
              style={{ backgroundImage: `url(${reg.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-black/70 transition-opacity duration-500 ease-in-out group-hover:opacity-0 opacity-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
