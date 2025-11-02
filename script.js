// === Fade-In Produk ===
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// === Tambahkan CSS untuk Popup secara dinamis ===
const style = document.createElement('style');
style.innerHTML = `
.news-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  color: #111;
  padding: 25px 35px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
  font-size: 1.1rem;
  font-weight: bold;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  max-width: 90%;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.news-popup.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.news-popup .close-btn {
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.3s, transform 0.2s;
}
.news-popup .close-btn:hover {
  color: #ff0000;
  transform: scale(1.2);
}
.news-popup .news-text {
  flex: 1;
  text-align: left;
  margin-bottom: 10px;
}
@media (max-width: 768px) {
  .news-popup {
    width: 90%;
    padding: 20px 25px;
    font-size: 1rem;
  }
  .news-popup .close-btn {
    font-size: 1.3rem;
  }
}
`;
document.head.appendChild(style);

// === Popup Berita Persisten di Tengah ===
async function loadNewsPopup() {
  try {
    const res = await fetch('/api/berita');
    const data = await res.json();
    if (data?.pesan) showNewsPopup(data.pesan);
  } catch (err) {
    console.error("❌ Tidak bisa ambil berita:", err);
  }
}

function showNewsPopup(text) {
  // Cek jika sudah ada popup
  if (document.querySelector('.news-popup')) return;

  const box = document.createElement('div');
  box.className = 'news-popup';
  box.innerHTML = `
    <span class="close-btn">&times;</span>
    <div class="news-text">📰 <b>Berita:</b> ${text}</div>
  `;

  document.body.appendChild(box);

  // Tombol close
  box.querySelector('.close-btn').addEventListener('click', () => {
    box.remove();
  });

  // Animasi masuk
  setTimeout(() => box.classList.add('show'), 100);
}

// Load berita saat DOM siap
document.addEventListener('DOMContentLoaded', loadNewsPopup);
