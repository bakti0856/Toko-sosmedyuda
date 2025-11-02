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
