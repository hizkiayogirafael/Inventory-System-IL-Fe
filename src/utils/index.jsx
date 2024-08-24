export function formatDate(dateString) {
  const date = new Date(dateString);

  // Mendapatkan hari, bulan, dan tahun
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format tanggal yang dirapikan
  return `${day} ${month} ${year}`;
}
