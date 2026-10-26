import { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Notifications = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, title: t("notif_new_report"), text: t("notif_new_report_text"), time: t("notif_5m") },
    { id: 2, title: t("notif_update"), text: t("notif_update_text"), time: t("notif_1h") },
    { id: 3, title: t("notif_warning"), text: t("notif_warning_text"), time: t("notif_2h") },
  ];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-gray-100 cursor-pointer">
        <Bell size={24} strokeWidth={1.8} className="text-[#1C3458]" />
        {notifications.length > 0 && (
          <span className="absolute right-2 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h3 className="text-lg font-semibold text-[#1C3458]">{t("notif_title")}</h3>
              <p className="mt-0.5 text-sm text-gray-400">{t("notif_count", { count: notifications.length })}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Bell size={18} className="text-[#1C3458]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-[#1C3458]">{notification.title}</h4>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  </div>
                  <p className="mt-1 text-sm leading-5 text-gray-500">{notification.text}</p>
                  <span className="mt-1.5 block text-xs text-gray-400">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 p-3">
            <button onClick={() => setIsOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-[#1C3458] transition hover:bg-gray-50 cursor-pointer">
              <Check size={17} />
              {t("notif_mark_all")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;