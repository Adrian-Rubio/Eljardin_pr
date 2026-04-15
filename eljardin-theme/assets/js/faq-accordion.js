/**
 * faq-accordion.js — El Jardín de Arturo Soria
 * Acordeón FAQ: abre/cierra respuestas con animación max-height.
 * Equivale al AnimatePresence con height: 0 → auto de Home.jsx.
 */
document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
        var btn    = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');

        if (!btn || !answer) return;

        btn.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');

            // Cerrar todos
            items.forEach(function (other) {
                other.classList.remove('open');
                var otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
            });

            // Abrir el actual si estaba cerrado
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
