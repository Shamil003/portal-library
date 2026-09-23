import { useState } from "react";
import { Library } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedSearch from "../components/AnimatedSearch";

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
  const [search, setSearch] = useState("");

  const regions = [
    {
      id: "all",
      name: "Бардык республикалык китепканалар",
      count: "1,789",
      image: bishkekImg,
    },
    {
      id: "batken",
      name: "Баткен облусу",
      count: "123",
      image: batkenImg,
    },
    {
      id: "jalal-abad",
      name: "Джалал-Абад облусу",
      count: "234",
      image: jalalAbadImg,
    },
    {
      id: "naryn",
      name: "Нарын облусу",
      count: "134",
      image: narynImg,
    },
    {
      id: "osh",
      name: "Ош облусу",
      count: "634",
      image: oshImg,
    },
    {
      id: "talas",
      name: "Талас облусу",
      count: "224",
      image: talasImg,
    },
    {
      id: "chuy",
      name: "Чүй облусу",
      count: "333",
      image: chuyImg,
    },
    {
      id: "issyk-kul",
      name: "Ысык-Көл облусу",
      count: "134",
      image: IKImg,
    },
  ];

  const filteredRegions = regions.filter((reg) =>
    reg.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRegionClick = (region) => {
    navigate(`/libraries/${region.id}`, {
      state: {
        region,
      },
    });
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">
        Китепканалар
      </h2>

      <div className="mb-6 grid grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Library size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            Жалпы китепканалар
          </p>

          <div className="mt-1 text-2xl font-bold">
            1,789
          </div>
        </div>
      </div>

      <AnimatedSearch
        value={search}
        onChange={setSearch}
      />

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredRegions.map((reg, index) => (
          <div
            key={reg.id}
            onClick={() => handleRegionClick(reg)}
            className="
              group
              relative
              flex
              h-36
              cursor-pointer
              items-center
              justify-between
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            <div className="z-10 flex h-full flex-col justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {reg.name}
              </h3>

              <p className="text-xs text-gray-500">
                Китепканалар:{" "}
                <span className="font-semibold text-slate-700">
                  {reg.count}
                </span>
              </p>
            </div>

            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-1/2
                overflow-hidden
                rounded-r-2xl
                bg-gray-100
              "
            >
              <img
                src={reg.image}
                alt={reg.name}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="
                  block
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-white
                  via-white/80
                  to-black/70
                  opacity-100
                  transition-opacity
                  duration-500
                  ease-in-out
                  group-hover:opacity-0
                "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};