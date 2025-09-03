export const assignments = [
  {
    id: 1,
    title: "Tugas Matematika - Integral",
    subject: "Matematika",
    deadline: "2025-11-15",
    time: "23:59",
    status: "completed",
    score: 95,
    teacher: "Bu Sari",
  },
  {
    id: 2,
    title: "Esai Sejarah Indonesia",
    subject: "Sejarah",
    deadline: "2025-11-18",
    time: "23:59",
    status: "pending",
    score: null,
    teacher: "Pak Budi",
  },
  {
    id: 3,
    title: "Praktikum Kimia - Larutan",
    subject: "Kimia",
    deadline: "2025-11-12",
    time: "10:00",
    status: "late",
    score: 80,
    teacher: "Bu Dewi",
  },
  {
    id: 4,
    title: "Resume Buku Sosiologi",
    subject: "Sosiologi",
    deadline: "2025-11-20",
    time: "23:59",
    status: "pending",
    score: null,
    teacher: "Pak Agus",
  },
  {
    id: 5,
    title: "Presentasi Bahasa Inggris",
    subject: "Bahasa Inggris",
    deadline: "2025-11-10",
    time: "23:59",
    status: "completed",
    score: 88,
    teacher: "Bu Rina",
  },
];

export const statusOptions = ["all", "completed", "pending", "late"];

export const statusLabels = {
  all: "Semua Status",
  completed: "Selesai",
  pending: "Belum Dikerjakan",
  late: "Terlambat",
};

export const sortOptions = ["deadline", "subject", "status"];

export const sortLabels = {
  deadline: "Deadline",
  subject: "Mata Pelajaran",
  status: "Status",
};