import { useState, useEffect } from "react";
import { Library, Plus, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { 
  getRegisteredUsers, 
  addRegisteredUser, 
  getLibraries, 
  addLibrary 
} from "../../utils/mockUsers";

const UsersPage = () => {
  const { user } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [libraries, setLibraries] = useState([]);

  // Поля для создания
  const [libName, setLibName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Определяем, какой уровень создаем (1-й создает 2-й, 2-й создает 3-й)
  const targetRole = user?.role === 1 ? 2 : 3;
  const targetRoleName = targetRole === 2 ? "Областная" : "Районная";

  useEffect(() => {
    setUsers(getRegisteredUsers());
    setLibraries(getLibraries());
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!libName || !email || !password) return;

    const newLibraryId = `lib-${Date.now()}`;

    // 1. Создаем саму библиотеку
    const newLibrary = {
      id: newLibraryId,
      name: libName,
      type: targetRoleName,
      parentId: user?.libraryId || "nbkr-main",
      region: user?.role === 1 ? libName : "Область",
    };
    addLibrary(newLibrary);

    // 2. Создаем ГЛАВНЫЙ аккаунт для этой библиотеки
    const mainAccount = {
      id: Date.now(),
      email,
      password,
      name: `Главный (${libName})`,
      position: `Уровень ${targetRole} (Главный)`,
      role: targetRole,
      libraryId: newLibraryId,
      libraryName: libName,
      isMain: true,
      image: "",
    };
    addRegisteredUser(mainAccount);

    // Обновляем списки на экране
    setUsers(getRegisteredUsers());
    setLibraries(getLibraries());
    
    // Очищаем форму
    setLibName(""); setEmail(""); setPassword("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF1FA]">
          <Library size={24} className="text-[#1C3458]" />
        </div>
        <div>
          <h1 className="text-[22px] font-semibold text-[#1C3458]">Библиотеки и аккаунты</h1>
          <p className="mt-1 text-sm text-[#8A93A3]">
            Создание {targetRoleName.toLowerCase()} библиотек и главных аккаунтов
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ФОРМА СОЗДАНИЯ БИБЛИОТЕКИ */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E3E8EF]">
          <h2 className="mb-4 text-lg font-semibold text-[#1C3458] flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#20A35A]" />
            Новая {targetRoleName} библиотека
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-sm text-[#48556A]">Название библиотеки</label>
              <input 
                type="text" 
                value={libName} 
                onChange={e => setLibName(e.target.value)} 
                className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" 
                placeholder={targetRole === 2 ? "Чуйская областная библиотека" : "Сокулукская районная библиотека"} 
                required 
              />
            </div>
            <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E3E8EF]">
              <p className="text-xs font-medium text-[#8992A3] mb-3">Данные главного аккаунта (создателя)</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-[#48556A]">Email (Логин)</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="chuy@mail.ru" required />
                </div>
                <div>
                  <label className="text-sm text-[#48556A]">Пароль</label>
                  <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-[#1C3458] outline-none" placeholder="Придумайте пароль" required />
                </div>
              </div>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C3458] p-3 text-white transition hover:bg-[#294873]">
              <Plus size={18} /> Создать библиотеку и аккаунт
            </button>
          </form>
        </div>

        {/* СПИСКИ */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E3E8EF]">
            <h2 className="mb-4 text-lg font-semibold text-[#1C3458]">Созданные библиотеки</h2>
            {libraries.length === 0 ? (
              <p className="text-sm text-gray-500">Пока нет созданных библиотек.</p>
            ) : (
              <div className="space-y-3">
                {libraries.map((lib) => (
                  <div key={lib.id} className="flex items-center justify-between rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-4">
                    <div>
                      <p className="font-medium text-[#1C3458]">{lib.name}</p>
                      <p className="text-xs text-[#8992A3]">Тип: {lib.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E3E8EF]">
            <h2 className="mb-4 text-lg font-semibold text-[#1C3458]">Созданные аккаунты</h2>
            {users.length === 0 ? (
              <p className="text-sm text-gray-500">Пока нет созданных аккаунтов.</p>
            ) : (
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between rounded-xl border border-[#E3E8EF] bg-[#FAFBFC] p-4">
                    <div>
                      <p className="font-medium text-[#1C3458]">{u.libraryName}</p>
                      <p className="text-xs text-[#8992A3]">{u.email} · {u.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;