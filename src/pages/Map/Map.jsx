import { useEffect, useRef, useState } from "react";
import mapSvg from "./img/kg.svg?raw";

const regionData = {
  KGB: {
    name: "Баткенская область",
    label: "Баткен",
    color: "#E8A87C",
    libraries: 125,
    users: 2450,
    books: 45200,
  },

  KGC: {
    name: "Чуйская область",
    label: "Чуй",
    color: "#85C7DE",
    libraries: 215,
    users: 5340,
    books: 82400,
  },

  KGJ: {
    name: "Джалал-Абадская область",
    label: "Джалал-Абад",
    color: "#A8D5BA",
    libraries: 187,
    users: 4210,
    books: 71300,
  },

  KGN: {
    name: "Нарынская область",
    label: "Нарын",
    color: "#C3B1E1",
    libraries: 98,
    users: 1850,
    books: 32800,
  },

  KGO: {
    name: "Ошская область",
    label: "Ош",
    color: "#F2C6DE",
    libraries: 234,
    users: 6120,
    books: 95300,
  },

  KGT: {
    name: "Таласская область",
    label: "Талас",
    color: "#B8D8BA",
    libraries: 86,
    users: 1640,
    books: 29100,
  },

  KGY: {
    name: "Иссык-Кульская область",
    label: "Иссык-Куль",
    color: "#9EC5FE",
    libraries: 143,
    users: 3270,
    books: 58700,
  },

  KGGB: {
    name: "Бишкек",
    label: "Бишкек",
    color: "#F6D186",
    libraries: 74,
    users: 8940,
    books: 126500,
  },

  KGGO: {
    name: "Ош",
    label: "Ош",
    color: "#D4A5A5",
    libraries: 52,
    users: 4380,
    books: 67200,
  },
};

export const Map = () => {
  const mapRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const svg = mapRef.current.querySelector("svg");

    if (!svg) return;

    const regions = svg.querySelectorAll("path");

    /*
      ==========================================
      СОЗДАЁМ НАЗВАНИЯ ОБЛАСТЕЙ
      ==========================================
    */

    Object.entries(regionData).forEach(([id, data]) => {
      const region = svg.querySelector(`#${id}`);

      if (!region) return;

      const box = region.getBBox();

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      text.setAttribute(
        "x",
        box.x + box.width / 2
      );

      text.setAttribute(
        "y",
        box.y + box.height / 2
      );

      text.setAttribute(
        "text-anchor",
        "middle"
      );

      text.setAttribute(
        "dominant-baseline",
        "middle"
      );

      text.textContent = data.label;

      text.style.fontSize = "12px";
      text.style.fontWeight = "600";
      text.style.fontFamily = "Arial, sans-serif";
      text.style.fill = "#1C3458";
      text.style.pointerEvents = "none";
      text.style.userSelect = "none";

      /*
        Белая обводка текста,
        чтобы надпись была хорошо видна
      */
      text.style.paintOrder = "stroke";
      text.style.stroke = "#ffffff";
      text.style.strokeWidth = "3px";
      text.style.strokeLinejoin = "round";

      text.dataset.regionLabel = id;

      svg.appendChild(text);
    });

    /*
      ==========================================
      НАСТРОЙКА ОБЛАСТЕЙ
      ==========================================
    */

    regions.forEach((region) => {
      const id = region.getAttribute("id");
      const data = regionData[id];

      if (!data) return;

      /*
        Если область выбрана
        сохраняем её цвет,
        но делаем КРАСНУЮ обводку
      */
      if (id === selectedRegion) {
        region.style.fill = data.color;
        region.style.stroke = "#EF4444";
        region.style.strokeWidth = "4";
        region.style.filter =
          "drop-shadow(0px 4px 7px rgba(239, 68, 68, 0.35))";
      } else {
        region.style.fill = data.color;
        region.style.stroke = "#ffffff";
        region.style.strokeWidth = "1";
        region.style.filter = "none";
      }

      region.style.cursor = "pointer";
      region.style.opacity = "1";

      /*
        Плавная анимация
      */
      region.style.transition = `
        fill 0.25s ease,
        stroke 0.25s ease,
        stroke-width 0.25s ease,
        opacity 0.25s ease,
        filter 0.25s ease,
        transform 0.25s ease
      `;

      region.style.transformBox = "fill-box";
      region.style.transformOrigin = "center";


      const handleMouseEnter = () => {
        if (id === selectedRegion) {
          region.style.stroke = "#DC2626";
          region.style.strokeWidth = "5";

          region.style.filter =
            "drop-shadow(0px 5px 9px rgba(239, 68, 68, 0.4))";

          return;
        }

        region.style.stroke = "#1C3458";
        region.style.strokeWidth = "3";

        region.style.transform = "scale(1.015)";

        region.style.filter =
          "drop-shadow(0px 5px 8px rgba(28, 52, 88, 0.25))";

        region.style.opacity = "1";
      };



      const handleMouseLeave = () => {
 
        if (id === selectedRegion) {
          region.style.fill = data.color;
          region.style.stroke = "#EF4444";
          region.style.strokeWidth = "4";
          region.style.transform = "scale(1)";

          region.style.filter =
            "drop-shadow(0px 4px 7px rgba(239, 68, 68, 0.35))";

          return;
        }

        region.style.fill = data.color;
        region.style.stroke = "#ffffff";
        region.style.strokeWidth = "1";
        region.style.transform = "scale(1)";
        region.style.filter = "none";
        region.style.opacity = "1";
      };

      const handleClick = () => {
        setSelectedRegion(id);
      };

      region.addEventListener(
        "mouseenter",
        handleMouseEnter
      );

      region.addEventListener(
        "mouseleave",
        handleMouseLeave
      );

      region.addEventListener(
        "click",
        handleClick
      );

      region._mapHandlers = {
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
      };
    });

    return () => {
      regions.forEach((region) => {
        if (!region._mapHandlers) return;

        region.removeEventListener(
          "mouseenter",
          region._mapHandlers.handleMouseEnter
        );

        region.removeEventListener(
          "mouseleave",
          region._mapHandlers.handleMouseLeave
        );

        region.removeEventListener(
          "click",
          region._mapHandlers.handleClick
        );

        delete region._mapHandlers;
      });

      svg
        .querySelectorAll("[data-region-label]")
        .forEach((label) => {
          label.remove();
        });
    };
  }, [selectedRegion]);

  const selectedData = selectedRegion
    ? regionData[selectedRegion]
    : null;

  return (
    <div className="w-full">

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-[#1C3458]">
          Карта Кыргызстана
        </h1>

        <p className="mt-1 text-gray-500">
          Выберите регион, чтобы посмотреть информацию
        </p>

      </div>


      <div className="flex items-start gap-6">

        <div className="w-2/3 rounded-2xl bg-white p-6 shadow-sm">

          <div
            ref={mapRef}
            className="
              w-full
              [&_svg]:h-auto
              [&_svg]:w-full
              [&_path]:transition-all
              [&_path]:duration-200
            "
            dangerouslySetInnerHTML={{
              __html: mapSvg,
            }}
          />

        </div>

        <div className="w-1/3">

          {selectedData ? (

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div
                  className="h-4 w-4 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      selectedData.color,
                  }}
                />

                <h2 className="text-xl font-bold text-[#1C3458]">
                  {selectedData.name}
                </h2>

              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">
                    Библиотек
                  </span>

                  <span className="font-semibold text-[#1C3458]">
                    {selectedData.libraries}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">
                    Пользователей
                  </span>

                  <span className="font-semibold text-[#1C3458]">
                    {selectedData.users.toLocaleString(
                      "ru-RU"
                    )}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Книг
                  </span>

                  <span className="font-semibold text-[#1C3458]">
                    {selectedData.books.toLocaleString(
                      "ru-RU"
                    )}
                  </span>

                </div>

              </div>

            </div>

          ) : (

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="py-8 text-center">

                <div className="mb-4 text-4xl">
                  🗺️
                </div>

                <h2 className="text-lg font-semibold text-[#1C3458]">
                  Выберите регион
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Нажмите на область на карте,
                  чтобы увидеть статистику
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};