/**
 * dish-gallery.js — El Jardín de Arturo Soria
 * Galería de platos deslizable: muestra 4 fotos, navega con flechas.
 * Equivale al galleryIndex + visibleDishes de Home.jsx.
 */
document.addEventListener('DOMContentLoaded', function () {
    var allItems = document.querySelectorAll('.dish-gallery .gallery-item-all');
    var gallery  = document.querySelector('.dish-gallery');
    var btnPrev  = document.querySelector('.slider-arrow.left');
    var btnNext  = document.querySelector('.slider-arrow.right');

    if (!allItems.length || !gallery) return;

    var total   = allItems.length;
    var visible = 4;
    var current = 0;

    function render() {
        // Ocultar todos
        allItems.forEach(function (item) { item.style.display = 'none'; });

        // Mostrar los 4 desde current
        for (var i = 0; i < visible; i++) {
            var idx = (current + i) % total;
            allItems[idx].style.display = '';
        }
    }

    function next() {
        current = (current + 1) % (total - visible + 1);
        if (current < 0) current = 0;
        render();
    }

    function prev() {
        current = current === 0 ? total - visible : current - 1;
        render();
    }

    render();

    if (btnNext) btnNext.addEventListener('click', next);
    if (btnPrev) btnPrev.addEventListener('click', prev);
});
