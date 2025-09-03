export const getDaysRemainingText = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: `${-diffDays} hari terlambat`, className: "text-red-500 ml-1" };
  if (diffDays === 0) return { text: "Hari ini", className: "text-orange-600" };
  if (diffDays === 1) return { text: "Besok", className: "text-orange-600" };
  return { text: `${diffDays} hari lagi`, className: "text-gray-600" };
};

export const getStatusConfig = (status) => {
  const statusConfig = {
    completed: { text: "Selesai", color: "bg-green-200 text-green-800 " },
    pending: { text: "Belum Dikerjakan", color: "bg-yellow-200 text-yellow-800" },
    late: { text: "Terlambat", color: "bg-red-200 text-red-800" },
  };
  return statusConfig[status];
};

export const filterAssignments = (assignments, searchValue, statusFilter) => {
  return assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};

export const sortAssignments = (assignments, sortBy) => {
  return [...assignments].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortBy === "subject") {
      return a.subject.localeCompare(b.subject);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });
};