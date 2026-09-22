/* ============================================
   EL CAMUCO - script.js
   Funciones:
   1. Cerrar menú hamburguesa móvil al hacer clic en un enlace
   2. Scroll suave con offset del header
   3. Filtro por categorías
   4. Botón "Volver arriba"
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       1. CERRAR MENÚ HAMBURGUESA AL HACER CLIC EN UN ENLACE
       ========================================== */
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');

    document.querySelectorAll('.menu-links a').forEach(function (enlace) {
        enlace.addEventListener('click', function () {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    /* ==========================================
       2. SCROLL SUAVE CON OFFSET DEL HEADER
       ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
        enlace.addEventListener('click', function (e) {
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                const alturaHeader = header.offsetHeight;
                const posicionDestino = destino.getBoundingClientRect().top + window.pageYOffset - alturaHeader;

                window.scrollTo({
                    top: posicionDestino,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       3. FILTRO POR CATEGORÍAS
       ========================================== */
    const seccionMenu = document.getElementById('menu');
    if (seccionMenu) {
        // Crear contenedor de botones de filtro
        const contenedorFiltros = document.createElement('div');
        contenedorFiltros.classList.add('filtros-menu');

        const categorias = [
            { id: 'todos', nombre: 'Todos' },
            { id: 'desayunos', nombre: 'Desayunos' },
            { id: 'guisos', nombre: 'Guisos' },
            { id: 'pollo', nombre: 'Pollo' },
            { id: 'carnes', nombre: 'Carnes' },
            { id: 'cabrito', nombre: 'Cabrito' },
            { id: 'tienda', nombre: 'Tienda' }
        ];

        categorias.forEach(function (cat, index) {
            const btn = document.createElement('button');
            btn.classList.add('btn-filtro');
            if (index === 0) btn.classList.add('activo');
            btn.textContent = cat.nombre;
            btn.dataset.categoria = cat.id;
            btn.addEventListener('click', function () {
                document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');
                filtrarTarjetas(cat.id);
            });
            contenedorFiltros.appendChild(btn);
        });

        // Insertar los filtros antes del primer card
        seccionMenu.insertBefore(contenedorFiltros, seccionMenu.firstChild);

        // Función de filtrado
        function filtrarTarjetas(categoria) {
            const tarjetas = seccionMenu.querySelectorAll('.card');
            tarjetas.forEach(function (tarjeta) {
                if (categoria === 'todos' || tarjeta.dataset.categoria === categoria) {
                    tarjeta.style.display = '';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        }
    }

    /* ==========================================
       4. BOTÓN "VOLVER ARRIBA"
       ========================================== */
    const btnArriba = document.createElement('button');
    btnArriba.classList.add('btn-volver-arriba');
    btnArriba.setAttribute('aria-label', 'Volver arriba');
    btnArriba.innerHTML = '↑';
    document.body.appendChild(btnArriba);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            btnArriba.classList.add('visible');
        } else {
            btnArriba.classList.remove('visible');
        }
    });

    btnArriba.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});