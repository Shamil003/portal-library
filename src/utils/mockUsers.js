import Userimg from "../assets/images/library.png";

export const MOCK_USERS = [
  {
    email: "nbkr@gmail.com",
    password: "123456",
    name: "НБКР",
    position: "Уровень 1 (НБКР)",
    role: 1,
    libraryId: "nbkr-main",
    libraryName: "НБКР имени Алыкула Осмонова",
    image: Userimg,
  },
  {
    email: "oblast@gmail.com",
    password: "123456",
    name: "Ошская область",
    position: "Уровень 2 (Областная)",
    role: 2,
    libraryId: "oblast-osh",
    libraryName: "Ошская областная библиотека",
    image: Userimg,
  },
  {
    email: "rayon@gmail.com",
    password: "123456",
    name: "Кара-Суйский район",
    position: "Уровень 3 (Районная)",
    role: 3,
    libraryId: "rayon-karasuu",
    libraryName: "Кара-Суйская районная библиотека",
    image: Userimg,
  },
  {
    email: "library@gmail.com",
    password: "123456",
    name: "Library",
    position: "Уровень 4 (Библиотекарь)",
    role: 4,
    libraryId: "lib-balanceva",
    libraryName: "Баланчаева а. китепкана",
    image: Userimg,
  },
];

export const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  } catch {
    return [];
  }
};

export const addRegisteredUser = (user) => {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
};

export const getAllUsers = () => {
  return [...MOCK_USERS, ...getRegisteredUsers()];
};