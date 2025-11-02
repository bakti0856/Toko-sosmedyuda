// ================= Fade-In Elemen =================
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ================= Popup Berita Modern =================
  async function getNews() {
    try {
      const res = await fetch("/api/berita");
      if (!res.ok) throw new Error("Gagal ambil data berita");
      const data = await res.json();
      if (data?.pesan) showNewsPopup(data.pesan);
    } catch (err) {
      console.error('❌ Tidak bisa ambil berita:', err);
    }
  }

  getNews();
  setInterval(getNews, 30000);
});

// ================= Fungsi showNewsPopup Modern Premium =================
function showNewsPopup(text) {
  if (document.querySelector('.news-popup')) return;

  // ====== BACKDROP BLUR ======
  const backdrop = document.createElement('div');
  backdrop.className = 'popup-backdrop';
  Object.assign(backdrop.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.2)',
    backdropFilter: 'blur(4px)',
    zIndex: '9998',
    opacity: '0',
    transition: 'opacity 0.4s ease'
  });
  document.body.appendChild(backdrop);
  setTimeout(() => backdrop.style.opacity = '1', 50);

  // ====== POPUP ======
  const box = document.createElement('div');
  box.className = 'news-popup';
  box.innerHTML = `
    <div style="display:flex; align-items:center; gap:15px; flex:1;">
      <span style="font-size:2rem;">🚀</span>
      <span style="flex:1; font-weight:600; font-size:1rem;">📰 <b>Berita:</b> ${text}</span>
    </div>
    <button class="popup-close">&times;</button>
  `;

  Object.assign(box.style, {
    position: 'fixed',
    top: '20px',
    right: '-450px', // slide dari kanan
    background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
    color: '#fff',
    borderRadius: '12px',
    padding: '15px 20px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.35)',
    fontSize: '1rem',
    fontWeight: '600',
    zIndex: '9999',
    minWidth: '320px',
    maxWidth: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: '0',
    transition: 'right 0.5s ease, opacity 0.5s ease'
  });

  document.body.appendChild(box);

  // Tombol close
  const closePopup = () => {
    box.style.right = '-450px';
    box.style.opacity = '0';
    backdrop.style.opacity = '0';
    setTimeout(() => {
      box.remove();
      backdrop.remove();
    }, 500);
  };
  box.querySelector('.popup-close').addEventListener('click', closePopup);
  backdrop.addEventListener('click', closePopup);

  // Animasi masuk
  setTimeout(() => {
    box.style.right = '20px';
    box.style.opacity = '1';
  }, 100);

  // Auto close setelah 8 detik
  setTimeout(() => {
    if (document.body.contains(box)) closePopup();
  }, 8000);
}
