// 1. Captura del DOM
const cuerpoPagina = document.getElementById("cuerpoPagina");
const selectorTema = document.getElementById("selectorTema");
const btnAplicar = document.getElementById("btnAplicar");

// 2. Eventos (Qué pasa al interactuar)
btnAplicar.addEventListener("click", aplicarYGuardar);

// 3. Funciones
function aplicarYGuardar() {
    // Obtenemos el texto del desplegable ("claro" o "oscuro")
    const temaElegido = selectorTema.value;

    // Cambiamos el diseño en pantalla asignando la clase CSS
    cuerpoPagina.className = temaElegido;

    // Guardamos el string directo en el navegador
    localStorage.setItem("temaGuardado", temaElegido);
}

function cargarTema() {
    // Intentamos recuperar la información
    const temaRecuperado = localStorage.getItem("temaGuardado");

    // Si hay un tema guardado previamente...
    if (temaRecuperado !== null) {
        // ... aplicamos la clase al body
        cuerpoPagina.className = temaRecuperado;
        
        // ... y hacemos que el desplegable muestre la opción correcta
        selectorTema.value = temaRecuperado;
    }
}

// 4. Inicialización
cargarTema();