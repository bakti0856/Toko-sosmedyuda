// === Efek Fade-In Elemen ===
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// === Popup Berita dari API ===
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Pastikan endpoint cocok dengan API kamu
    const res = await fetch('/api/berita');
    const data = await res.json();

    if (data && data.berita) {
      showNewsPopup(data.berita);
    } else if (data && data.message) {
      showNewsPopup(data.message);
    }
  } catch (err) {
    console.error('❌ Tidak bisa ambil berita:', err);
  }
});

function showNewsPopup(text) {
  const box = document.createElement('div');
  box.className = 'news-popup';
  box.innerHTML = `📰 <b>Berita:</b> ${text}`;
  
  // Gaya popup elegan
  Object.assign(box.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fffae6',
    color: '#222',
    border: '1px solid #ffd700',
    padding: '15px 25px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    fontSize: '1rem',
    fontWeight: 'bold',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 0.5s ease'
  });

  document.body.appendChild(box);

  // Animasi masuk & keluar
  setTimeout(() => box.style.opacity = '1', 200);
  setTimeout(() => {
    box.style.opacity = '0';
    setTimeout(() => box.remove(), 500);
  }, 8000);
}
