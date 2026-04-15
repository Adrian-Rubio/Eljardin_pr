/**
 * menu-accordion.js — El Jardín de Arturo Soria
 * Acordeón de categorías en la página de menú.
 * Equivale al AnimatePresence de los acordeones en Menu.jsx.
 */
document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.category-section');

    sections.forEach(function (section) {
        var header = section.querySelector('.category-header');
        var items  = section.querySelector('.category-items');

        if (!header || !items) return;

        header.addEventListener('click', function () {
            var isOpen = section.classList.contains('open');

            if (isOpen) {
                section.classList.remove('open');
                items.style.maxHeight = '0';
            } else {
                section.classList.add('open');
                items.style.maxHeight = items.scrollHeight + 'px';
            }
        });
    });
});
