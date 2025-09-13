import { createSlice } from "@reduxjs/toolkit";

const menusByRole = {
  Admin: [
    { key: "dashboard-admin", text: "Dashboard", icon: "Home", type: "item" },
    {
      key: "manajemen",
      text: "Manajemen",
      icon: "FolderCog",
      type: "section",
      children: [
        { key: "users", text: "Users", icon: "Users", type: "item" },
        { key: "settings", text: "Settings", icon: "Settings", type: "item" },
      ],
    },
  ],
  Guru: [
    { key: "dashboard-guru", text: "Dashboard", icon: "Home", type: "item" },
    {
      key: "data-user-konten",
      text: "Master Data & Konten",
      icon: "FolderCog",
      type: "section",
      children: [
        { key: "data-siswa", text: "Data Siswa", icon: "UserRoundCog", type: "item" },
        { key: "berita-guru", text: "Manajemen Berita", icon: "Globe", type: "item" },
      ],
    },
    {
      key: "materi",
      text: "Master Akademik",
      icon: "GraduationCap",
      type: "section",
      children: [
        { key: "materi-guru", text: "Manajemen Materi", icon: "FileText", type: "item" },
        { key: "penugasan-guru", text: "Manajemen Penugasan", icon: "BookCheck", type: "item" },
        { key: "ujian-guru", text: "Manajemen Ujian", icon: "ClipboardPenLine", type: "item" },
         { key: "jurnal-guru", text: "Jurnal Kelas", icon: "NotebookPen", type: "item" },
        { key: "absensi-guru", text: "Absensi Siswa", icon: "CalendarClock", type: "item" },
        { key: "jadawal-guru", text: "Manajemen Jadwal", icon: "ClipboardClock", type: "item" },
      ],
    },
  ],

  Alumni: [
    { key: "dashboard-alumni", text: "Dashboard", icon: 'Home' },
  ],
  Siswa: [
    { key: "dashboard-siswa", type: "item", text: "Dashboard", icon: 'Home' },
    { key: "materi-siswa", type: "item", text: "Materi", icon: 'NotepadText' },
    { key: "penugasan-siswa", type: "item", text: "Penugasan", icon: 'PencilRuler' },
    { key: "ujian-siswa", type: "item", text: "Ujian", icon: 'ClipboardPenLine' },
    { key: "nilai-siswa", type: "item", text: "Nilai", icon: 'GraduationCap' },
    { key: "pengumuman-siswa", type: "item", text: "Pengumuman", icon: 'Megaphone' },
  ],
};

const getInitialMenu = (role) => {
  const menus = menusByRole[role] || menusByRole["Siswa"];
  return menus[0]?.key;
};

const initialState = (role = "Siswa") => ({
  role,
  activeMenu: getInitialMenu(role),
  menus: menusByRole[role] || menusByRole["Siswa"],
  expandedSections: {},
});

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState("Siswa"),
  reducers: {
    setRole: (state, action) => {
      const role = action.payload;
      state.role = role;
      state.menus = menusByRole[role] || menusByRole["Siswa"];
      state.activeMenu = state.menus[0]?.key;
      state.expandedSections = {};
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    toggleSection: (state, action) => {
      const key = action.payload;
      state.expandedSections[key] = !state.expandedSections[key];
    },
  },
});

export const { setRole, setActiveMenu, toggleSection } = menuSlice.actions;
export default menuSlice.reducer;
