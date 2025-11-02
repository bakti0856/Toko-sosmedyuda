import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "news.json");

  // GET → ambil berita
  if (req.method === "GET") {
    try {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Gagal membaca berita." });
    }
  }

  // POST → ubah berita
  else if (req.method === "POST") {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Pesan kosong." });

    fs.writeFileSync(file, JSON.stringify({ message }, null, 2));
    res.status(200).json({ message: "Berita berhasil diperbarui!" });
  }

  else res.status(405).json({ error: "Method not allowed." });
}
