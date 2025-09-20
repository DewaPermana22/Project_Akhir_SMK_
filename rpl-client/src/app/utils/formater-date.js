function normalizeIsoWithMicroseconds(iso) {
  if (typeof iso !== "string") {
    if (iso === null || iso === undefined) {
      console.warn("Nilai tanggal adalah null atau undefined");
      return null;
    }
    // konversi ke string jika memungkinkan
    iso = String(iso);
  }

  // Jika string kosong, kembalikan null
  if (iso.trim() === "") {
    console.warn("String tanggal kosong");
    return null;
  }

  try {
    // Regex untuk memformat microseconds menjadi milliseconds
    return iso.replace(/\.(\d{3})\d*Z$/, ".$1Z").replace(/\.0+Z$/, "Z");
  } catch (error) {
    console.error("Error dalam normalisasi tanggal:", error);
    return null;
  }
}

function parseIso(iso) {
  const normalized = normalizeIsoWithMicroseconds(iso);
  if (normalized === null) {
    return null;
  }

  try {
    const date = new Date(normalized);
    if (isNaN(date.getTime())) {
      console.warn("Tanggal tidak valid setelah parsing:", normalized);
      return null;
    }

    return date;
  } catch (error) {
    console.error("Error dalam parsing tanggal:", error);
    return null;
  }
}

export function formatLongWithZone(iso, useUTC = false) {
  // Validasi input
  if (iso === null || iso === undefined) {
    return "Tanggal tidak valid";
  }
  const d = parseIso(iso);
  if (d === null) {
    return "Tanggal tidak valid";
  }
  try {
    if (useUTC) {
      const day = d.getUTCDate();
      const month = new Intl.DateTimeFormat("id-ID", {
        month: "long",
        timeZone: "UTC",
      }).format(d);
      const year = d.getUTCFullYear();
      return `${day} ${month} ${year}`;
    } else {
      const opts = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return new Intl.DateTimeFormat("id-ID", opts).format(d);
    }
  } catch (error) {
    console.error("Error dalam memformat tanggal:", error);
    return "Error memformat tanggal";
  }
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
