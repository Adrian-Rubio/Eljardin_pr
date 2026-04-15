/**
 * mobile-menu.js — El Jardín de Arturo Soria
 * Controla apertura/cierre del menú móvil y el submenú de CARTAS
 */
document.addEventListener('DOMContentLoaded', function () {
    var btn       = document.getElementById('mobile-toggle-btn');
    var menu      = document.getElementById('mobile-menu');
    var iconMenu  = document.getElementById('icon-menu');
    var iconClose = document.getElementById('icon-close');

    if (!btn || !menu) return;

    function openMenu() {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        if (iconMenu)  iconMenu.style.display  = 'none';
        if (iconClose) iconClose.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        if (iconMenu)  iconMenu.style.display  = 'block';
        if (iconClose) iconClose.style.display = 'none';
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar al hacer clic en cualquier enlace con clase mobile-close
    document.querySelectorAll('.mobile-close').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Submenú CARTAS en móvil
    var cartasToggle = document.getElementById('mobile-cartas-toggle');
    var cartasSub    = document.getElementById('mobile-cartas-sub');

    if (cartasToggle && cartasSub) {
        cartasToggle.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = cartasSub.style.display !== 'none';
            cartasSub.style.display = isOpen ? 'none' : 'block';
        });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
        }
    });
});
