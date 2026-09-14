import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { LibrariesPage } from "../pages/LibrariesPage";
import LibrarySection from "../pages/Library/LibrarySection";
import { Profile } from "../pages/Profile";
import AnotherPage from "../pages/AnotherPage/AnotherPage";

export const Router = ({ user }) => {
  return (
    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/libraries"
        element={<LibrariesPage />}
      />

      <Route
        path="/library"
        element={<LibrarySection />}
      />

      <Route
        path="/another"
        element={<AnotherPage />}
      />

      <Route
        path="/profile"
        element={<Profile user={user} />}
      />

    </Routes>
  );
};