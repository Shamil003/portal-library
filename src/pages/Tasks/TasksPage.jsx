import { useState, useEffect } from "react";
import { CalendarDays, Plus } from "lucide-react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !deadline) return;

    const newTask = { id: Date.now(), title, deadline };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTitle(""); setDeadline("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF7E6]">
          <CalendarDays size={24} className="text-[#B87500]" />
        </div>
        <div>
          <h1 className="text-[22px] font-semibold text-[#1C3458]">Задания и дедлайны</h1>
          <p className="mt-1 text-sm text-[#8A93A3]">Создание задач для библиотек</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-4 items-end mb-6">
          <div className="flex-1">
            <label className="text-sm text-[#48556A]">Название задания</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="Сдать годовой отчет" required />
          </div>
          <div>
            <label className="text-sm text-[#48556A]">Дедлайн</label>
            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" required />
          </div>
          <button type="submit" className="flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#1C3458] px-6 text-white transition hover:bg-[#294873]">
            <Plus size={18} /> Добавить
          </button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center border p-4 rounded-xl bg-gray-50">
              <p className="font-medium text-[#1C3458]">{task.title}</p>
              <p className="text-sm text-red-600 font-semibold">До: {task.deadline}</p>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-sm text-gray-500">Заданий пока нет</p>}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;