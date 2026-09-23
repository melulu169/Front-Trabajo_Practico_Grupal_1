document.addEventListener('DOMContentLoaded', () => {
    // Filtrado interactivo de entradas de la bitácora
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar clase activa en botones
            filtroBtns.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');

            const categoria = btn.getAttribute('data-filtro');

            timelineItems.forEach(item => {
                if (categoria === 'todos' || item.getAttribute('data-categoria') === categoria) {
                    item.classList.remove('oculto');
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('oculto');
                }
            });
        });
    });
});
