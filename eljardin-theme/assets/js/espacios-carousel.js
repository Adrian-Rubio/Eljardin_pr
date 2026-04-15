/**
 * espacios-carousel.js — El Jardín de Arturo Soria
 * Carrusel independiente por cada espacio (Chill Out, Salón, Terraza, Jardín).
 * Equivale al espacioIndex state de Home.jsx.
 */
document.addEventListener('DOMContentLoaded', function () {
    var espacios = document.querySelectorAll('.espacio-card');

    espacios.forEach(function (card) {
        var imgs   = card.querySelectorAll('.espacio-img');
        var btnP   = card.querySelector('.espacio-prev');
        var btnN   = card.querySelector('.espacio-next');

        if (!imgs.length) return;

        var current = 0;

        function goTo(index) {
            imgs[current].classList.remove('active');
            current = (index + imgs.length) % imgs.length;
            imgs[current].classList.add('active');
        }

        // Inicializar primera imagen
        imgs[0].classList.add('active');

        if (btnP) btnP.addEventListener('click', function () { goTo(current - 1); });
        if (btnN) btnN.addEventListener('click', function () { goTo(current + 1); });
    });
});
