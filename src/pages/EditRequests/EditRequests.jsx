import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, FileEdit } from "lucide-react";

const STORAGE_KEY = "libraryReports";
const EDIT_REQUESTS_KEY = "editRequests";

const EditRequests = () => {
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);

  /* =========================
     Toast-уведомление
  ========================= */
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  useEffect(() => {
    const savedRequests = JSON.parse(
      localStorage.getItem(EDIT_REQUESTS_KEY) || "[]",
    );
    const savedReports = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    setRequests(savedRequests);
    setReports(savedReports);
  }, []);

  const saveRequests = (list) => {
    setRequests(list);
    localStorage.setItem(EDIT_REQUESTS_KEY, JSON.stringify(list));
  };

  const saveReports = (list) => {
    setReports(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  /* =========================
     Решение по запросу
  ========================= */

  const handleDecision = (requestId, decision) => {
    const request = requests.find((r) => r.id === requestId);
    if (!request) return;

    const updatedRequests = requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: decision,
            decidedAt: new Date().toLocaleString("ru-RU"),
          }
        : r,
    );
    saveRequests(updatedRequests);

    const updatedReports = reports.map((report) => {
      if (report.id !== request.reportId) return report;

      if (decision === "approved") {
        return {
          ...report,
          status: "На редактировании",
          editRequest: {
            status: "approved",
            requestedAt: request.requestedAt,
          },
        };
      }

      return {
        ...report,
        editRequest: {
          status: "rejected",
          requestedAt: request.requestedAt,
        },
      };
    });
    saveReports(updatedReports);

    showToast(
      decision === "approved" ? "Жактырылды" : "Четке кагылды",
      decision === "approved" ? "success" : "error",
    );
  };

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  return (
    <div className="min-h-full bg-[#F3F5F9] px-6 py-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.06)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
            <FileEdit size={24} className="text-[#1C3458]" />
          </div>

          <div>
            <h1 className="text-[22px] font-semibold text-[#1C3458]">
              Редактирлөө үчүн сурамдар
            </h1>

            <p className="mt-1 text-sm text-[#8A93A3]">
              Китепканалардан келген сурамдарды жактыруу же четке кагуу
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <h2 className="mb-4 text-[18px] font-semibold text-[#1C3458]">
            Кароону күтүүдө ({pending.length})
          </h2>

          {pending.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#8992A3]">
              Жаңы сурамдар жок
            </p>
          ) : (
            <div className="space-y-3">
              {pending.map((req) => {
                const report = reports.find((r) => r.id === req.reportId);

                return (
                  <div
                    key={req.id}
                    className="flex flex-col gap-3 rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-[#1C3458]">
                        {report?.library || "Китепкана"}
                      </p>

                      <p className="mt-1 text-xs text-[#8992A3]">
                        {report?.region} · {report?.period}
                      </p>

                      <p className="mt-1 text-xs text-[#8992A3]">
                        Суралды: {req.requestedAt}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDecision(req.id, "approved")}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#20A35A] px-4 text-sm font-medium text-white transition hover:bg-[#188A4B]"
                      >
                        <CheckCircle2 size={16} />
                        Жактыруу
                      </button>

                      <button
                        onClick={() => handleDecision(req.id, "rejected")}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#DC2626] px-4 text-sm font-medium text-white transition hover:bg-[#B91C1C]"
                      >
                        <XCircle size={16} />
                        Четке кагуу
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* History */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(28,52,88,0.05)]">
          <h2 className="mb-4 text-[18px] font-semibold text-[#1C3458]">
            Чечимдердин тарыхы
          </h2>

          {processed.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#8992A3]">
              Азырынча иштетилген сурамдар жок
            </p>
          ) : (
            <div className="space-y-3">
              {processed.map((req) => {
                const report = reports.find((r) => r.id === req.reportId);

                return (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-xl border border-[#E3E8EF] bg-white p-4"
                  >
                    <div>
                      <p className="font-medium text-[#1C3458]">
                        {report?.library || "Китепкана"}
                      </p>

                      <p className="mt-1 text-xs text-[#8992A3]">
                        Чечилди: {req.decidedAt || "—"}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                        req.status === "approved"
                          ? "bg-[#F0FBF4] text-[#167A42]"
                          : "bg-[#FEF2F2] text-[#B91C1C]"
                      }`}
                    >
                      {req.status === "approved" ? (
                        <>
                          <CheckCircle2 size={15} /> Жактырылды
                        </>
                      ) : (
                        <>
                          <XCircle size={15} /> Четке кагылды
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-4 text-white shadow-2xl ${
            toast.type === "success" ? "bg-[#1C3458]" : "bg-[#DC2626]"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={20} className="text-[#4ADE80]" />
          ) : (
            <XCircle size={20} className="text-white" />
          )}

          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default EditRequests;
