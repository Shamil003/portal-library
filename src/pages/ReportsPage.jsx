import { useState } from "react";
import { Upload } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedSearch from "../components/AnimatedSearch";
import uploadIcon from "../assets/images/Upload.svg";

export const ReportsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const region = location.state?.region;
  const library = location.state?.library;

  const [search, setSearch] = useState("");

  const reportsList = [
    {
      id: 1,
      date: "01/09/2021",
      status: "Отчет даяр",
      badge: "7 / 7",
      isReady: true,
      completedCards: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 2,
      date: "15/08/2021",
      status: "Отчет даяр эмес",
      badge: "5 / 7",
      isReady: false,
      completedCards: [1, 2, 3, 5, 7],
    },
    {
      id: 3,
      date: "01/07/2021",
      status: "Отчет даяр",
      badge: "7 / 7",
      isReady: true,
      completedCards: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 4,
      date: "15/06/2021",
      status: "Отчет даяр эмес",
      badge: "3 / 7",
      isReady: false,
      completedCards: [1, 4, 6],
    },
    {
      id: 5,
      date: "01/05/2021",
      status: "Отчет даяр",
      badge: "7 / 7",
      isReady: true,
      completedCards: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 6,
      date: "01/04/2021",
      status: "Отчет даяр",
      badge: "7 / 7",
      isReady: true,
      completedCards: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 7,
      date: "01/03/2021",
      status: "Отчет даяр эмес",
      badge: "2 / 7",
      isReady: false,
      completedCards: [2, 5],
    },
    {
      id: 8,
      date: "01/02/2021",
      status: "Отчет даяр",
      badge: "7 / 7",
      isReady: true,
      completedCards: [1, 2, 3, 4, 5, 6, 7],
    },
  ];

  const filteredReports = reportsList.filter((report) =>
    report.date.includes(search)
  );

  const readyReports = reportsList.filter(
    (report) => report.isReady
  ).length;

  const notReadyReports = reportsList.filter(
    (report) => !report.isReady
  ).length;

  const handleBack = () => {
    navigate(`/libraries/${region?.id || "osh"}`, {
      state: {
        region,
      },
    });
  };

  const handleReportClick = (report) => {
    navigate("/library", {
      state: {
        region,
        library,
        report,
      },
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
        <span
          onClick={() => navigate("/libraries")}
          className="cursor-pointer transition hover:text-blue-600"
        >
          Китепканалар
        </span>

        <span className="text-gray-400">/</span>

        <span
          onClick={handleBack}
          className="cursor-pointer transition hover:text-blue-600"
        >
          {region?.name || "Ош облусу"}
        </span>

        <span className="text-gray-400">/</span>

        <span className="font-bold text-slate-800">
          {library?.name || "Китепкананын аты"}
        </span>

        <span className="text-gray-400">/</span>

        <span className="font-bold text-slate-800">
          Отчеттор
        </span>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Upload size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            Жалпы китепканалар
          </p>

          <div className="mt-1 text-2xl font-bold">
            {reportsList.length}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Upload size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            Даяр отчеттор
          </p>

          <div className="mt-1 text-2xl font-bold">
            {readyReports}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Upload size={20} />
          </div>

          <p className="text-[10px] font-semibold uppercase text-gray-500">
            Даяр эмес отчеттор
          </p>

          <div className="mt-1 text-2xl font-bold">
            {notReadyReports}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm" />
      </div>

      <AnimatedSearch
        value={search}
        onChange={setSearch}
      />

      <div className="mt-6 space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => handleReportClick(report)}
            className="
              group
              flex
              cursor-pointer
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              px-6
              shadow-xs
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <div className="min-w-[180px]">
              <p className="text-sm font-semibold text-slate-800">
                {report.date}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`
                  text-xs
                  font-semibold
                  ${
                    report.isReady
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }
                `}
              >
                {report.status}
              </span>

              <img
                src={uploadIcon}
                alt="Жүктөө"
                className="h-5 w-5"
              />

              <span
                className={`
                  min-w-[55px]
                  rounded-full
                  border
                  px-4
                  py-1.5
                  text-center
                  text-xs
                  font-semibold
                  ${
                    report.isReady
                      ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }
                `}
              >
                {report.badge}
              </span>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-gray-500">
              Отчеттор табылган жок
            </p>
          </div>
        )}
      </div>
    </div>
  );
};