/**
 * hero-carousel.js — El Jardín de Arturo Soria
 * Carrusel de imagen hero con crossfade, flechas y puntos.
 * Equivale al AnimatePresence del Hero en Home.jsx.
 */
document.addEventListener('DOMContentLoaded', function () {
    var imgs   = document.querySelectorAll('.hero-img');
    var dots   = document.querySelectorAll('.hero-dot');
    var btnPrev = document.getElementById('hero-prev');
    var btnNext = document.getElementById('hero-next');

    if (!imgs.length) return;

    var current  = 0;
    var total    = imgs.length;
    var interval = null;

    function goTo(index) {
        imgs[current].classList.remove('active');
        if (dots[current]) dots[current].style.width = '8px';

        current = (index + total) % total;

        imgs[current].classList.add('active');
        if (dots[current]) dots[current].style.width = '24px';
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
        interval = setInterval(next, 8000);
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    // Inicializar
    goTo(0);
    startAutoplay();

    if (btnNext) btnNext.addEventListener('click', function () { stopAutoplay(); next(); startAutoplay(); });
    if (btnPrev) btnPrev.addEventListener('click', function () { stopAutoplay(); prev(); startAutoplay(); });

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            stopAutoplay();
            goTo(i);
            startAutoplay();
        });
    });
});
