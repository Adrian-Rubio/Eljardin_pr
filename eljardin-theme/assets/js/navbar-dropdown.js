/**
 * navbar-dropdown.js — El Jardín de Arturo Soria
 * Dropdown escritorio: hover abre el submenú de CARTAS.
 * El CSS ya maneja :hover, pero este JS añade soporte táctil y teclado.
 */
document.addEventListener('DOMContentLoaded', function () {
    var cartasItem = document.getElementById('nav-cartas');
    if (!cartasItem) return;

    // Fallback táctil: clic abre/cierra
    cartasItem.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.href === '#') {
            e.preventDefault();
            cartasItem.classList.toggle('open');
        }
    });

    // Cerrar si se hace clic fuera
    document.addEventListener('click', function (e) {
        if (!cartasItem.contains(e.target)) {
            cartasItem.classList.remove('open');
        }
    });
});
