// === /api/berita.js ===
// API untuk menerima & mengirim berita dari bot WhatsApp

let beritaTerbaru = "Belum ada berita saat ini."; // Disimpan sementara (RAM)

export default function handler(req, res) {
  if (req.method === "POST") {
    // kirim berita baru dari bot
    const { pesan } = req.body;
    if (!pesan) return res.status(400).json({ error: "Pesan kosong" });
    beritaTerbaru = pesan;
    console.log("📰 Berita baru diterima:", pesan);
    return res.status(200).json({ success: true, pesan });
  }

  if (req.method === "GET") {
    // ambil berita terbaru (buat web & bot)
    return res.status(200).json({ pesan: beritaTerbaru });
  }

  res.status(405).json({ error: "Metode tidak diizinkan" });
}
