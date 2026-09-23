const canvas = document.getElementById('espacio-canvas');
const ctx = canvas.getContext('2d');

function ajustarTamanio() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarTamanio);
ajustarTamanio();

// Configuración de las estrellas
const estrellas = [];
const CANTIDAD_ESTRELLAS = 150;

class Estrella {
    constructor() {
        this.resetear();
    }

    // Genera una estrella en una posición aleatoria
    resetear() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.radio = Math.random() * 1.5 + 0.5;
    }

    // Actualiza la posición para simular que se acerca
    actualizar() {
        this.z -= 2; // Velocidad de acercamiento
        
        // Si la estrella "pasa" la pantalla, vuelve al fondo
        if (this.z <= 0) {
            this.resetear();
            this.z = canvas.width;
        }
    }

    // Dibuja la estrella en el canvas calculando la perspectiva
    dibujar() {
        let posX = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
        let posY = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
        
        let radioProyectado = this.radio * (canvas.width / this.z);

        ctx.beginPath();
        ctx.arc(posX, posY, radioProyectado, 0, Math.PI * 2);
        ctx.fillStyle = '#E2E8F0'; 
        ctx.fill();
    }
}

// Llenar el array con las estrellas
for (let i = 0; i < CANTIDAD_ESTRELLAS; i++) {
    estrellas.push(new Estrella());
}

// Bucle que dibuja los frames continuamente
function animarEspacio() {
    // Fondo semitransparente para dejar una "estela" en el movimiento
    ctx.fillStyle = 'rgba(9, 13, 20, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    estrellas.forEach(estrella => {
        estrella.actualizar();
        estrella.dibujar();
    });

    requestAnimationFrame(animarEspacio);
}

animarEspacio(); // Iniciar animación del fondo


// SCROLL Y ANIMACIONES
document.addEventListener('DOMContentLoaded', () => {
    
    const textoDesc = document.getElementById('texto-desc');
    
    if (textoDesc) {
        const observadorDesc = new IntersectionObserver((entradas) => {
            if (entradas[0].isIntersecting) {
                textoDesc.classList.add('aparecer');
            }
        }, { threshold: 0.4 });
        
        observadorDesc.observe(textoDesc);
    }

    // Anclar el encabezado
    const headerOculto = document.getElementById('header-oculto');
    const seccionIntegrantes = document.getElementById('seccion-integrantes');

    if (headerOculto && seccionIntegrantes) {
        window.addEventListener('scroll', () => {
            const distanciaTop = seccionIntegrantes.getBoundingClientRect().top;
            
            if (distanciaTop <= 100) {
                headerOculto.classList.add('visible');
            } else {
                headerOculto.classList.remove('visible');
            }
        });
    }
});