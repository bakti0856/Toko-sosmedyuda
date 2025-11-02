document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1, // Elemen muncul saat 10% terlihat
        rootMargin: '0px 0px -50px 0px' // Offset untuk memicu lebih awal
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Amati semua elemen dengan class 'fade-in'
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});
   
// === Popup Berita dari server ===
fetch("/api/news")
  .then(r => r.json())
  .then(d => {
    if (d.message) showNewsPopup(d.message);
  });

function showNewsPopup(text) {
  const box = document.createElement("div");
  box.className = "news-popup";
  box.innerHTML = `📰 <b>Berita:</b> ${text}`;
  document.body.appendChild(box);
  setTimeout(() => box.classList.add("show"), 200);
  setTimeout(() => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 500);
  }, 7000);
}
 document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/berita');
    const data = await res.json();

    if (data && data.berita) {
      const alertBox = document.createElement('div');
      alertBox.innerHTML = `
        <div style="position:fixed; top:20px; left:50%; transform:translateX(-50%);
                    background:#fffae6; color:#222; border:1px solid #ffd700; 
                    padding:15px 25px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.2);
                    font-size:1rem; font-weight:bold; z-index:9999;">
          📰 ${data.berita}
        </div>`;
      document.body.appendChild(alertBox);
      setTimeout(() => alertBox.remove(), 8000);
    }
  } catch (err) {
    console.error('Gagal memuat berita:', err);
  }
});
