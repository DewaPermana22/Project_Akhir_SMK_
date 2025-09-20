export const getTimeAgo = (dateString, timeString) => {
  const date = new Date(`${dateString} ${timeString}`);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  }
};
