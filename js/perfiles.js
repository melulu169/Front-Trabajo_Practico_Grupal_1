document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos la tarjeta completa
    const tarjeta = document.getElementById('tarjeta-perfil');

    // Le agregamos el evento de clic
    tarjeta.addEventListener('click', () => {
        tarjeta.classList.toggle('girada');
    });
});