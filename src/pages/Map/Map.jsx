import { useEffect, useRef, useState } from "react";
import mapSvg from "./img/kg.svg?raw";

const regionData = {
  KGB: {
    name: "Баткен облусу",
    label: "Баткен",
    color: "#F4A261",
    libraries: 125,
    users: 2450,
    books: 45200,
  },

  KGC: {
    name: "Чүй облусу",
    label: "Чүй",
    color: "#4EA8DE",
    libraries: 215,
    users: 5340,
    books: 82400,
  },

  KGJ: {
    name: "Жалал-Абад облусу",
    label: "Жалал-Абад",
    color: "#70C1B3",
    libraries: 187,
    users: 4210,
    books: 71300,
  },

  KGN: {
    name: "Нарын облусу",
    label: "Нарын",
    color: "#9B8AFB",
    libraries: 98,
    users: 1850,
    books: 32800,
  },

  KGO: {
    name: "Ош облусу",
    label: "Ош",
    color: "#E76F51",
    libraries: 234,
    users: 6120,
    books: 95300,
  },

  KGT: {
    name: "Талас облусу",
    label: "Талас",
    color: "#8AB17D",
    libraries: 86,
    users: 1640,
    books: 29100,
  },

  KGY: {
    name: "Ысык-Көл облусу",
    label: "Ысык-Көл",
    color: "#5DADE2",
    libraries: 143,
    users: 3270,
    books: 58700,
  },

  KGGB: {
    name: "Бишкек шаары",
    label: "Бишкек",
    color: "#F2C14E",
    libraries: 74,
    users: 8940,
    books: 126500,
  },

  KGGO: {
    name: "Ош шаары",
    label: "Ош",
    color: "#D95D39",
    libraries: 52,
    users: 4380,
    books: 67200,
  },
};

export const Map = () => {
  const mapRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const regionsRef = useRef([]);

  const [selectedRegion, setSelectedRegion] = useState(null);

  // ============================
  // ZOOM
  // ============================

  const zoomRef = useRef(1);

  const MIN_ZOOM = 0.8;
  const MAX_ZOOM = 2.5;
  const ZOOM_STEP = 0.15;

  // ============================
  // ПЕРЕМЕЩЕНИЕ КАРТЫ
  // ============================

  const positionRef = useRef({
    x: 0,
    y: 0,
  });

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startMapX: 0,
    startMapY: 0,
    hasMoved: false,
  });

  // ============================
  // ZOOM + DRAG
  // ============================

  useEffect(() => {
    const wrapper = mapWrapperRef.current;
    const map = mapRef.current;

    if (!wrapper || !map) return;

    const updateMapTransform = () => {
      const { x, y } = positionRef.current;
      const zoom = zoomRef.current;

      map.style.transform = `
        translate(${x}px, ${y}px)
        scale(${zoom})
      `;
    };

    // ============================
    // КОЛЕСО МЫШИ
    // ============================

    const handleWheel = (event) => {
      event.preventDefault();

      if (event.deltaY < 0) {
        // Вверх — увеличить
        zoomRef.current = Math.min(
          zoomRef.current + ZOOM_STEP,
          MAX_ZOOM
        );
      } else {
        // Вниз — уменьшить
        zoomRef.current = Math.max(
          zoomRef.current - ZOOM_STEP,
          MIN_ZOOM
        );
      }

      updateMapTransform();
    };

    // ============================
    // НАЖАТИЕ МЫШИ
    // ============================

    const handleMouseDown = (event) => {
      // Только левая кнопка
      if (event.button !== 0) return;

      dragRef.current.isDragging = true;
      dragRef.current.hasMoved = false;

      dragRef.current.startX = event.clientX;
      dragRef.current.startY = event.clientY;

      dragRef.current.startMapX =
        positionRef.current.x;

      dragRef.current.startMapY =
        positionRef.current.y;

      wrapper.style.cursor = "grabbing";

      event.preventDefault();
    };

    // ============================
    // ДВИЖЕНИЕ
    // ============================

    const handleMouseMove = (event) => {
      if (!dragRef.current.isDragging) return;

      const deltaX =
        event.clientX -
        dragRef.current.startX;

      const deltaY =
        event.clientY -
        dragRef.current.startY;

      // Если мышь реально двинулась
      if (
        Math.abs(deltaX) > 4 ||
        Math.abs(deltaY) > 4
      ) {
        dragRef.current.hasMoved = true;
      }

      positionRef.current.x =
        dragRef.current.startMapX + deltaX;

      positionRef.current.y =
        dragRef.current.startMapY + deltaY;

      updateMapTransform();
    };

    // ============================
    // ОТПУСКАНИЕ МЫШИ
    // ============================

    const handleMouseUp = () => {
      if (!dragRef.current.isDragging) return;

      dragRef.current.isDragging = false;

      wrapper.style.cursor = "grab";
    };

    // ============================
    // ПОДКЛЮЧАЕМ СОБЫТИЯ
    // ============================

    wrapper.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    wrapper.addEventListener(
      "mousedown",
      handleMouseDown
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    wrapper.style.cursor = "grab";

    return () => {
      wrapper.removeEventListener(
        "wheel",
        handleWheel
      );

      wrapper.removeEventListener(
        "mousedown",
        handleMouseDown
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, []);

  // ============================
  // СОЗДАНИЕ SVG КАРТЫ
  // ============================

  useEffect(() => {
    const container = mapRef.current;

    if (!container) return;

    container.innerHTML = mapSvg;

    const svg = container.querySelector("svg");

    if (!svg) return;

    regionsRef.current = [];

    // ============================
    // НАЗВАНИЯ РЕГИОНОВ
    // ============================

    Object.entries(regionData).forEach(
      ([id, data]) => {
        const region = svg.querySelector(
          `#${id}`
        );

        if (!region) return;

        const box = region.getBBox();

        const text =
          document.createElementNS(
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

        const isCity =
          id === "KGGB" ||
          id === "KGGO";

        // Города крупнее
        text.style.fontSize = isCity
          ? "18px"
          : "13px";

        text.style.fontWeight = "800";
        text.style.fontFamily =
          "Arial, sans-serif";

        text.style.fill = "#1C3458";

        text.style.pointerEvents = "none";
        text.style.userSelect = "none";

        // Белая обводка текста
        text.style.paintOrder = "stroke";
        text.style.stroke = "#ffffff";

        text.style.strokeWidth = isCity
          ? "5px"
          : "3px";

        text.style.strokeLinejoin = "round";

        text.dataset.regionLabel = id;

        svg.appendChild(text);
      }
    );

    // ============================
    // РЕГИОНЫ
    // ============================

    const regions =
      svg.querySelectorAll("path");

    regions.forEach((region) => {
      const id =
        region.getAttribute("id");

      const data = regionData[id];

      if (!data) return;

      const isCity =
        id === "KGGB" ||
        id === "KGGO";

      // ============================
      // ОСНОВНОЙ СТИЛЬ
      // ============================

      region.style.fill = data.color;

      region.style.stroke = "#ffffff";

      region.style.strokeWidth =
        isCity ? "2" : "1";

      region.style.opacity = "1";

      region.style.cursor = "pointer";

      region.style.filter = "none";

      region.style.transition = `
        fill 0.25s ease,
        stroke 0.25s ease,
        stroke-width 0.25s ease,
        filter 0.25s ease,
        transform 0.25s ease
      `;

      region.style.transformBox =
        "fill-box";

      region.style.transformOrigin =
        "center";

      // Бишкек и Ош немного больше
      if (isCity) {
        region.style.transform =
          "scale(1.08)";
      }

      // ============================
      // НАВЕДЕНИЕ
      // ============================

      const handleMouseEnter = () => {
        if (dragRef.current.hasMoved) return;

        if (
          region.dataset.selected ===
          "true"
        ) {
          region.style.stroke =
            "#DC2626";

          region.style.strokeWidth =
            isCity ? "6" : "5";

          region.style.filter =
            "drop-shadow(0px 5px 9px rgba(239, 68, 68, 0.4))";

          return;
        }

        region.style.stroke =
          "#1C3458";

        region.style.strokeWidth =
          isCity ? "4" : "3";

        if (!isCity) {
          region.style.transform =
            "scale(1.015)";
        } else {
          region.style.transform =
            "scale(1.11)";
        }

        region.style.filter =
          "drop-shadow(0px 5px 8px rgba(28, 52, 88, 0.25))";
      };

      // ============================
      // УБРАЛИ МЫШЬ
      // ============================

      const handleMouseLeave = () => {
        if (
          region.dataset.selected ===
          "true"
        ) {
          region.style.fill =
            data.color;

          region.style.stroke =
            "#EF4444";

          region.style.strokeWidth =
            isCity ? "5" : "4";

          region.style.transform =
            isCity
              ? "scale(1.08)"
              : "scale(1)";

          region.style.filter =
            "drop-shadow(0px 4px 7px rgba(239, 68, 68, 0.35))";

          return;
        }

        region.style.fill =
          data.color;

        region.style.stroke =
          "#ffffff";

        region.style.strokeWidth =
          isCity ? "2" : "1";

        region.style.transform =
          isCity
            ? "scale(1.08)"
            : "scale(1)";

        region.style.filter = "none";

        region.style.opacity = "1";
      };

      // ============================
      // КЛИК
      // ============================

      const handleClick = (event) => {
        // Если карту двигали —
        // не выбираем регион
        if (dragRef.current.hasMoved) {
          event.preventDefault();
          event.stopPropagation();

          // Сбрасываем после drag
          setTimeout(() => {
            dragRef.current.hasMoved =
              false;
          }, 0);

          return;
        }

        setSelectedRegion(id);
      };

      // ============================
      // СОБЫТИЯ
      // ============================

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

      regionsRef.current.push({
        region,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
      });
    });

    // ============================
    // CLEANUP
    // ============================

    return () => {
      regionsRef.current.forEach(
        ({
          region,
          handleMouseEnter,
          handleMouseLeave,
          handleClick,
        }) => {
          region.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );

          region.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );

          region.removeEventListener(
            "click",
            handleClick
          );
        }
      );

      regionsRef.current = [];

      container.innerHTML = "";
    };
  }, []);

  // ============================
  // ВЫБОР РЕГИОНА
  // ============================

  useEffect(() => {
    regionsRef.current.forEach(
      ({ region }) => {
        const id =
          region.getAttribute("id");

        const data = regionData[id];

        if (!data) return;

        const isCity =
          id === "KGGB" ||
          id === "KGGO";

        region.dataset.selected =
          "false";

        region.style.fill =
          data.color;

        region.style.stroke =
          "#ffffff";

        region.style.strokeWidth =
          isCity ? "2" : "1";

        region.style.transform =
          isCity
            ? "scale(1.08)"
            : "scale(1)";

        region.style.filter =
          "none";
      }
    );

    if (!selectedRegion) return;

    const selected =
      regionsRef.current.find(
        ({ region }) =>
          region.getAttribute("id") ===
          selectedRegion
      );

    if (!selected) return;

    const region = selected.region;

    const data =
      regionData[selectedRegion];

    const isCity =
      selectedRegion === "KGGB" ||
      selectedRegion === "KGGO";

    region.dataset.selected =
      "true";

    region.style.fill =
      data.color;

    region.style.stroke =
      "#EF4444";

    region.style.strokeWidth =
      isCity ? "5" : "4";

    region.style.transform =
      isCity
        ? "scale(1.08)"
        : "scale(1)";

    region.style.filter =
      "drop-shadow(0px 4px 7px rgba(239, 68, 68, 0.35))";
  }, [selectedRegion]);

  const selectedData = selectedRegion
    ? regionData[selectedRegion]
    : null;

  // ============================
  // RENDER
  // ============================

  return (
    <div className="w-full">

      {/* ============================
          ЗАГОЛОВОК
      ============================ */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1C3458]">
          Кыргызстандын картасы
        </h1>

        <p className="mt-1 text-gray-500">
          Маалыматты көрүү үчүн аймакты
          тандаңыз
        </p>
      </div>

      {/* ============================
          КАРТА + ИНФОРМАЦИЯ
      ============================ */}

      <div className="flex items-start gap-6">

        {/* ============================
            КАРТА
        ============================ */}

        <div className="w-2/3 rounded-2xl bg-white p-6 shadow-sm">

          <div
            ref={mapWrapperRef}
            className="
              relative
              w-full
              overflow-hidden
              rounded-xl
              select-none
            "
            style={{
              height: "600px",
              cursor: "grab",
            }}
          >

            <div
              ref={mapRef}
              className="
                absolute
                left-0
                top-1/2
                w-full
                origin-center
                [&_svg]:h-auto
                [&_svg]:w-full
              "
              style={{
                transform:
                  "translate(0px, 0px) scale(1)",
                transition:
                  "transform 0.15s ease-out",
              }}
            />

            {/* ============================
                ПОДСКАЗКА
            ============================ */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2
                rounded-full
                bg-white/90
                px-4
                py-2
                text-xs
                font-medium
                text-[#1C3458]
                shadow-md
                backdrop-blur-sm
              "
            >
              🖱️ Колесо — масштаб ·
              Зажмите мышь — перемещение
            </div>

          </div>
        </div>

        {/* ============================
            ИНФОРМАЦИЯ
        ============================ */}

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
                    Китепканалар
                  </span>

                  <span className="font-semibold text-[#1C3458]">
                    {selectedData.libraries}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">
                    Колдонуучулар
                  </span>

                  <span className="font-semibold text-[#1C3458]">
                    {selectedData.users.toLocaleString(
                      "ru-RU"
                    )}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Китептер
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
                  Аймакты тандаңыз
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Статистиканы көрүү үчүн
                  <br />
                  картадан аймакты басыңыз
                </p>

              </div>

            </div>

          )}

        </div>
      </div>
    </div>
  );
};