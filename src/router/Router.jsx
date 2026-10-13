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
      <Route
        path="/"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />

      <Route
        path="/libraries"
        element={
          <PageTransition>
            <LibrariesPage />
          </PageTransition>
        }
      />

      <Route
        path="/libraries/:regionId"
        element={
          <PageTransition>
            <RegionDetailPage />
          </PageTransition>
        }
      />

      <Route
        path="/library"
        element={
          <PageTransition>
            <LibrarySection />
          </PageTransition>
        }
      />

      <Route
        path="/another"
        element={
          <PageTransition>
            <AnotherPage />
          </PageTransition>
        }
      />

      <Route
        path="/profile"
        element={
          <PageTransition>
            <Profile user={user} />
          </PageTransition>
        }
      />

      <Route
        path="/map"
        element={
          <PageTransition>
            <Map />
          </PageTransition>
        }
      />

      <Route
        path="/rep"
        element={
          <PageTransition>
            <ReportPage />
          </PageTransition>
        }
      />

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