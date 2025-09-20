import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound_404 from "./pages/404";
import Unauthorize from "./pages/Unauthorize";
import GuardianRoute from "./hooks/GuardianRoute";
import TambahBerita from "./components/templates/dashboard/guru/berita/TambahBerita";
import UserDashboard from "./components/templates/dashboard/UserDashboard";
import GuruDashboard from "./components/templates/dashboard/guru/GuruDashboard";
import ManajemenBerita from "./components/templates/dashboard/guru/berita/ManajemenBerita";
import LayoutBerita from "./components/templates/dashboard/guru/berita/layout";
import SemuaBerita from "./pages/SemuaBerita";
import DetailBerita from "./pages/DetailBerita";
import LayoutSiswa from "./components/templates/dashboard/guru/manajemen-siswa/layout";
import DaftarKelas from "./components/templates/dashboard/guru/manajemen-siswa/DaftarKelas";
import DaftarSiswaPerKelas from "./components/templates/dashboard/guru/manajemen-siswa/DaftarSiswaPerKelas";
import PengumumanSiswa from "./components/templates/dashboard/siswa/PengumumanSiswa";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<SemuaBerita />} />
        <Route path="/news/:slug/:id" element={<DetailBerita />} />

        <Route
          path="/dashboard/siswa"
          element={
            <GuardianRoute allowedRoles={["Siswa"]}>
              <Dashboard />
            </GuardianRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="pengumuman" element={<PengumumanSiswa />} />
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

          {/* Route Manajemen Berita */}
          <Route path="berita" element={<LayoutBerita />}>
            <Route index element={<ManajemenBerita />} />
            <Route path="tambah" element={<TambahBerita />} />
            <Route path="update/:id" element={<TambahBerita />} />
          </Route>

          {/* Route Manajemen Siswa */}
          <Route path="data-siswa" element={<LayoutSiswa />}>
            <Route index element={<DaftarKelas />}/>
            <Route path="kelas/:idkelas" element={<DaftarSiswaPerKelas />} />
            {/* <Route path="update/:id" element={<TambahBerita />} /> */}
          </Route>
          {/* Route Profile Guru */}
          <Route path="profile" element={<div>Profile Guru</div>} />
        </Route>

        <Route path="*" element={<NotFound_404 />} />
        <Route path="/unauthorize" element={<Unauthorize />} />
      </Routes>
    </main>
  );
}

export default App;
