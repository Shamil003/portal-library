import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getRegisteredUsers, addRegisteredUser } from "../../utils/mockUsers";

const UsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(getRegisteredUsers());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [libraryName, setLibraryName] = useState("");

  const targetRole = user?.role === 1 ? 2 : 3;

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !libraryName) return;

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      libraryName,
      position: `Уровень ${targetRole}`,
      role: targetRole,
      libraryId: `lib-${Date.now()}`,
      image: "",
    };

    addRegisteredUser(newUser);
    setUsers(getRegisteredUsers());
    setEmail(""); setPassword(""); setName(""); setLibraryName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
          <Users size={24} className="text-[#1C3458]" />
        </div>
        <div>
          <h1 className="text-[22px] font-semibold text-[#1C3458]">Пользователи</h1>
          <p className="mt-1 text-sm text-[#8A93A3]">Создание аккаунтов для библиотек {targetRole}-го уровня</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#1C3458]">Новый аккаунт</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="text-sm text-[#48556A]">Название библиотеки</label>
              <input type="text" value={libraryName} onChange={e => setLibraryName(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="Ошская областная библиотека" required />
            </div>
            <div>
              <label className="text-sm text-[#48556A]">Имя сотрудника</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="Иван Иванов" required />
            </div>
            <div>
              <label className="text-sm text-[#48556A]">Email (Логин)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="oblast@mail.ru" required />
            </div>
            <div>
              <label className="text-sm text-[#48556A]">Пароль</label>
              <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="123456" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C3458] p-3 text-white transition hover:bg-[#294873]">
              <Plus size={18} /> Создать аккаунт
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#1C3458]">Созданные аккаунты</h2>
          {users.length === 0 ? (
            <p className="text-sm text-gray-500">Пока нет созданных аккаунтов.</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-4">
                  <div>
                    <p className="font-medium text-[#1C3458]">{u.libraryName}</p>
                    <p className="text-xs text-[#8992A3]">{u.email} · {u.name}</p>
                  </div>
                  <span className="rounded-lg bg-[#EAF1FA] px-2 py-1 text-xs font-semibold text-[#1C3458]">{u.position}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;