import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound_404 from "./pages/404";
import Unauthorize from "./pages/Unauthorize";
import GuardianRoute from "./hooks/GuardianRoute";
import { useSelector } from "react-redux";
import LoadingComponent from "./components/templates/LoadingComponent";
import { useEffect, useState } from "react";
import TambahBerita from "./components/templates/dashboard/guru/berita/TambahBerita";
import UserDashboard from "./components/templates/dashboard/UserDashboard";
import GuruDashboard from "./components/templates/dashboard/guru/GuruDashboard";
import ManajemenBerita from "./components/templates/dashboard/guru/berita/ManajemenBerita";
import LayoutBerita from "./components/templates/dashboard/guru/berita/layout";

function App() {
  const { isLoading } = useSelector((state) => state.loading);
  const [showRoutes, setShowRoutes] = useState(!isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowRoutes(false);
    }
  }, [isLoading]);

  const handleLoadingExit = () => {
    setShowRoutes(true);
  };

  return (
    <>
      {showRoutes && (
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard/siswa"
              element={
                <GuardianRoute
                  allowedRoles={["Siswa"]}
                >
                  <Dashboard />
                </GuardianRoute>
              }
            >
              <Route index element={<UserDashboard />} />
            </Route>

            <Route path="/dashboard/guru" element={<Dashboard />}>
              <Route
                index
                element={
                  <GuardianRoute allowedRoles={["Guru"]}>
                    <GuruDashboard />
                  </GuardianRoute>
                }
              />

              <Route path="berita" element={<LayoutBerita />}>
                <Route index element={<ManajemenBerita />} />
                <Route path="tambah" element={<TambahBerita />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound_404 />} />
            <Route path="/unauthorize" element={<Unauthorize />} />
          </Routes>
        </main>
      )}

      <LoadingComponent isVisible={isLoading} onExit={handleLoadingExit} />
    </>
  );
}

export default App;
