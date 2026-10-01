import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { LibrariesPage } from "../pages/LibrariesPage";
import { RegionDetailPage } from "../pages/RegionDetailPage";
import LibrarySection from "../pages/Library/LibrarySection";
import { Profile } from "../pages/Profile";
import AnotherPage from "../pages/AnotherPage/AnotherPage";
import PageTransition from "../components/PageTransition";
import { Map } from "../pages/Map/Map";
import ReportPage from "../pages/Report/ReportPage";
import { Reports } from "../pages/Reports/Reports";

export const Router = ({ user }) => {
  return (
    <Routes>
      {/* Главная */}
      <Route
        path="/"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />

      {/* Библиотеки */}
      <Route
        path="/libraries"
        element={
          <PageTransition>
            <LibrariesPage />
          </PageTransition>
        }
      />

      {/* Регион */}
      <Route
        path="/libraries/:regionId"
        element={
          <PageTransition>
            <RegionDetailPage />
          </PageTransition>
        }
      />

      {/* Библиотека */}
      <Route
        path="/library"
        element={
          <PageTransition>
            <LibrarySection />
          </PageTransition>
        }
      />

      {/* Другая страница */}
      <Route
        path="/another"
        element={
          <PageTransition>
            <AnotherPage />
          </PageTransition>
        }
      />

      {/* Профиль */}
      <Route
        path="/profile"
        element={
          <PageTransition>
            <Profile user={user} />
          </PageTransition>
        }
      />

      {/* Карта */}
      <Route
        path="/map"
        element={
          <PageTransition>
            <Map />
          </PageTransition>
        }
      />

      {/* Заполнение отчёта */}
      <Route
        path="/rep"
        element={
          <PageTransition>
            <ReportPage />
          </PageTransition>
        }
      />

      {/* Все отчёты */}
      <Route
        path="/reports"
        element={
          <PageTransition>
            <Reports />
          </PageTransition>
        }
      />
    </Routes>
  );
};