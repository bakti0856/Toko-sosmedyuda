// Simpan sementara berita terbaru di RAM
let beritaTerbaru = "Belum ada berita saat ini.";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Ambil pesan dari body
      const { pesan } = req.body;

      if (!pesan || pesan.trim() === "") {
        return res.status(400).json({ error: "Pesan kosong" });
      }

      beritaTerbaru = pesan;
      console.log("📰 Berita baru diterima:", pesan);

      return res.status(200).json({ success: true, pesan });
    }

    if (req.method === "GET") {
      // Kirim berita terbaru
      return res.status(200).json({ pesan: beritaTerbaru });
    }

    // Method lain tidak diizinkan
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Metode ${req.method} tidak diizinkan` });

  } catch (err) {
    console.error("❌ Error API:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
