// 1. IIFE: Función Autoinvocada para aislar el scope y que nadie acceda desde la consola
(() => {
    "use strict";

    // Referencias al DOM
    const canvas = document.querySelector('#miLienzo');
    const ctx = canvas.getContext('2d');
    const btnStart = document.querySelector('#btn-start');
    const btnStop = document.querySelector('#btn-stop');
    const colorInput = document.querySelector('#color-picker');

    // 2. CLOSURE: Esta función "encierra" el estado de la animación
    const crearAnimacion = () => {
        let x = 50;
        let y = 50;
        let dx = 4; // Velocidad X
        let dy = 4; // Velocidad Y
        let color = "#ff0000";
        let animacionId = null;

        // Esta función interna es el closure: "recuerda" x, y, dx, dy
        function dibujar() {
            // Limpiar el lienzo antes de cada frame (Evita rastro)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar la pelota
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();

            // Lógica de rebote
            if(x + dx > canvas.width || x + dx < 0) dx = -dx;
            if(y + dy > canvas.height || y + dy < 0) dy = -dy;

            x += dx;
            y += dy;

            // requestAnimationFrame: Sincroniza con los Hz del monitor (60fps)
            animacionId = requestAnimationFrame(dibujar);
        }

        return {
            iniciar: () => {
                if (!animacionId) dibujar();
            },
            detener: () => {
                cancelAnimationFrame(animacionId);
                animacionId = null;
            },
            cambiarColor: (nuevoColor) => {
                color = nuevoColor;
            }
        };
    };

    const controlAnimacion = crearAnimacion();

    // 3. Arrow Functions para Event Handlers
    btnStart.addEventListener('click', () => {
        controlAnimacion.iniciar();
        btnStart.classList.add('active');
        btnStop.classList.remove('active');
    });

    btnStop.addEventListener('click', () => {
        controlAnimacion.detener();
        btnStop.classList.add('active');
        btnStart.classList.remove('active');
    });

    colorInput.addEventListener('input', (e) => {
        controlAnimacion.cambiarColor(e.target.value);
    });

})();