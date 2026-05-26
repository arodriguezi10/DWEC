const urlApi = 'http://localhost:3000';

// Estado del juego para 2 jugadores
let jugadores = [
    { id: 'j1', nombre: '', puntos: 0, quesitos: new Set(), aciertos: {} },
    { id: 'j2', nombre: '', puntos: 0, quesitos: new Set(), aciertos: {} }
];
let turnoActual = 0; // 0 = Jugador 1, 1 = Jugador 2

let preguntaActual = null;
let categoriaSeleccionada = '';
let categorias = [];
let esPreguntaDeQuesito = false;

let temporizador = null;
let tiempoRestante = 30;

let anguloActual = 0;
let velocidadGiro = 0;
let ruletaGirando = false;
const coloresRuleta = ["#f39c12", "#e74c3c", "#3498db", "#9b59b6", "#2ecc71", "#1abc9c", "#1e0e35"];

// Pantallas
const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaResultados = document.getElementById('pantalla-resultados');
const panelProgreso = document.getElementById('panel-progreso');

// Elementos Bienvenida
const inputNombreJ1 = document.getElementById('nombre-j1');
const inputNombreJ2 = document.getElementById('nombre-j2');
const btnEmpezarJuego = document.getElementById('btn-empezar-juego');

// Elementos Marcador
const indicadorTurno = document.getElementById('indicador-turno');
const panelJ1 = document.getElementById('panel-j1');
const panelJ2 = document.getElementById('panel-j2');
const infoJ1 = document.getElementById('info-j1');
const infoJ2 = document.getElementById('info-j2');

// Elementos Ruleta
const canvasRuleta = document.getElementById('canvas-ruleta');
const ctx = canvasRuleta ? canvasRuleta.getContext('2d') : null;
const btnGirar = document.getElementById('btn-girar');
const temaSeleccionado = document.getElementById('tema-seleccionado');
const btnEmpezar = document.getElementById('btn-empezar');

// Elementos Juego
const avisoQuesito = document.getElementById('aviso-quesito');
const textoTiempo = document.getElementById('texto-tiempo');
const textoPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const resultado = document.getElementById('resultado');
const botonSiguiente = document.getElementById('siguiente-btn');

// Elementos Resultados
const textoPuntuacion = document.getElementById('texto-puntuacion');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnGuardarRecord = document.getElementById('btn-guardar-record');
const seccionRegistro = document.getElementById('seccion-registro');
const seccionRanking = document.getElementById('seccion-ranking');
const listaRanking = document.getElementById('lista-ranking');

// Listeners
btnEmpezarJuego.addEventListener('click', iniciarPartida);
btnGirar.addEventListener('click', iniciarGiroRuleta);
btnEmpezar.addEventListener('click', irAPregunta);
botonSiguiente.addEventListener('click', manejarSiguienteAccion);
btnReiniciar.addEventListener('click', volverAlInicio);
btnGuardarRecord.addEventListener('click', guardarRecordsMultijugador);

function cambiarPantalla(pantallaDestino) {
    pantallaBienvenida.classList.remove('activa');
    pantallaInicio.classList.remove('activa');
    pantallaJuego.classList.remove('activa');
    pantallaResultados.classList.remove('activa');
    pantallaDestino.classList.add('activa');
}

function volverAlInicio() {
    panelProgreso.classList.add('oculto');
    inputNombreJ1.value = "";
    inputNombreJ2.value = "";
    cambiarPantalla(pantallaBienvenida);
}

async function iniciarPartida() {
    const n1 = inputNombreJ1.value.trim();
    const n2 = inputNombreJ2.value.trim();

    if (!n1 || !n2) {
        alert("Ambos jugadores deben introducir su nombre.");
        return;
    }

    // Aciertos debe ser un objeto {} para guardar rachas por categoría
    jugadores[0] = { id: 'j1', nombre: n1, puntos: 0, quesitos: new Set(), aciertos: {} };
    jugadores[1] = { id: 'j2', nombre: n2, puntos: 0, quesitos: new Set(), aciertos: {} };
    turnoActual = 0;

    document.querySelectorAll('.quesito').forEach(q => q.classList.remove('obtenido'));
    
    panelProgreso.classList.remove('oculto');
    
    await cargarCategorias();
    actualizarInterfazMarcadores();
    prepararSiguienteTurno();
}

function actualizarInterfazMarcadores() {
    const jugadorActivo = jugadores[turnoActual];
    indicadorTurno.textContent = `Turno de: ${jugadorActivo.nombre}`;
    indicadorTurno.style.color = turnoActual === 0 ? '#3498db' : '#e74c3c';

    // Se muestran los puntos y la cantidad de quesitos (tamaño del Set)
    infoJ1.textContent = `${jugadores[0].nombre} | ${jugadores[0].puntos} pts | ${jugadores[0].quesitos.size} Quesitos`;
    infoJ2.textContent = `${jugadores[1].nombre} | ${jugadores[1].puntos} pts | ${jugadores[1].quesitos.size} Quesitos`;

    if (turnoActual === 0) {
        panelJ1.style.opacity = "1";
        panelJ1.style.boxShadow = "0 0 10px #3498db";
        panelJ2.style.opacity = "0.5";
        panelJ2.style.boxShadow = "none";
    } else {
        panelJ2.style.opacity = "1";
        panelJ2.style.boxShadow = "0 0 10px #e74c3c";
        panelJ1.style.opacity = "0.5";
        panelJ1.style.boxShadow = "none";
    }
}

function prepararSiguienteTurno() {
    actualizarInterfazMarcadores();
    temaSeleccionado.textContent = "Tema: ---";
    btnEmpezar.style.display = 'none';
    btnGirar.disabled = false;
    cambiarPantalla(pantallaInicio);
}

async function cargarCategorias() {
    try {
        const respuesta = await fetch(`${urlApi}/categorias`);
        categorias = await respuesta.json();
        dibujarRuleta();
    } catch (error) {
        temaSeleccionado.textContent = "Error al conectar con el servidor.";
    }
}

function dibujarRuleta() {
    if (categorias.length === 0) return;
    const centroX = canvasRuleta.width / 2;
    const centroY = canvasRuleta.height / 2;
    const radio = centroX - 10;
    const arco = (2 * Math.PI) / categorias.length;

    ctx.clearRect(0, 0, canvasRuleta.width, canvasRuleta.height);

    for (let i = 0; i < categorias.length; i++) {
        const anguloInicio = anguloActual + i * arco;
        const anguloFin = anguloInicio + arco;

        ctx.beginPath();
        ctx.fillStyle = coloresRuleta[i % coloresRuleta.length];
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(centroX, centroY);
        ctx.rotate(anguloInicio + arco / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(categorias[i], radio - 20, 6);
        ctx.restore();
    }
}

function iniciarGiroRuleta() {
    if (ruletaGirando || categorias.length === 0) return;
    ruletaGirando = true;
    btnGirar.disabled = true;
    btnEmpezar.style.display = 'none';
    velocidadGiro = Math.random() * 0.2 + 0.3;
    animarRuleta();
}

function animarRuleta() {
    if (velocidadGiro > 0.002) {
        anguloActual += velocidadGiro;
        velocidadGiro *= 0.98;
        dibujarRuleta();
        requestAnimationFrame(animarRuleta);
    } else {
        ruletaGirando = false;
        determinarCategoriaSeleccionada();
    }
}

function determinarCategoriaSeleccionada() {
    const arco = (2 * Math.PI) / categorias.length;
    const anguloNormalizado = anguloActual % (2 * Math.PI);
    let anguloPuntero = (1.5 * Math.PI - anguloNormalizado + 2 * Math.PI) % (2 * Math.PI);
    const indiceGanador = Math.floor(anguloPuntero / arco);
    
    categoriaSeleccionada = categorias[indiceGanador];
    temaSeleccionado.textContent = `Tema: ${categoriaSeleccionada}`;
    
    btnEmpezar.style.display = 'inline-block';
    btnGirar.disabled = false;
}

function irAPregunta() {
    cambiarPantalla(pantallaJuego);
    cargarNuevaPregunta();
}

async function cargarNuevaPregunta() {
    limpiarInterfazJuego();
    const jugadorActivo = jugadores[turnoActual];
    let aciertos = jugadorActivo.aciertos[categoriaSeleccionada] || 0;
    
    // Si tiene 2 aciertos y aún no tiene el quesito, 75% de probabilidad
    if (aciertos >= 2 && !jugadorActivo.quesitos.has(categoriaSeleccionada)) {
        esPreguntaDeQuesito = Math.random() <= 0.75; 
    } else {
        esPreguntaDeQuesito = false;
    }

    avisoQuesito.style.display = esPreguntaDeQuesito ? 'block' : 'none';
    
    try {
        const respuesta = await fetch(`${urlApi}/pregunta-aleatoria?categoria=${encodeURIComponent(categoriaSeleccionada)}`);
        preguntaActual = await respuesta.json();
        renderizarPregunta(preguntaActual);
        iniciarTemporizador();
    } catch (error) {
        textoPregunta.textContent = "Error al cargar la pregunta.";
    }
}

function renderizarPregunta(pregunta) {
    textoPregunta.textContent = pregunta.pregunta;
    pregunta.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion';
        boton.addEventListener('click', () => verificarRespuesta(opcion));
        contenedorOpciones.appendChild(boton);
    });
}

function iniciarTemporizador() {
    clearInterval(temporizador);
    tiempoRestante = 30;
    textoTiempo.textContent = `Tiempo: ${tiempoRestante}s`;
    temporizador = setInterval(() => {
        tiempoRestante--;
        textoTiempo.textContent = `Tiempo: ${tiempoRestante}s`;
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            verificarRespuesta(null);
        }
    }, 1000);
}

async function verificarRespuesta(opcion) {
    clearInterval(temporizador);
    document.querySelectorAll('.opcion').forEach(btn => btn.disabled = true);
    let fueCorrecta = false;
    const jugadorActivo = jugadores[turnoActual];

    if (opcion === null) {
        resultado.textContent = "Tiempo agotado.";
        resultado.style.color = "red";
    } else {
        try {
            const res = await fetch(`${urlApi}/verificar-respuesta`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textoPregunta: preguntaActual.pregunta, respuestaUsuario: opcion })
            });
            const data = await res.json();
            fueCorrecta = data.esCorrecta;
            resultado.textContent = fueCorrecta ? "Correcto" : `Incorrecto. Era: ${data.respuestaCorrecta}`;
            resultado.style.color = fueCorrecta ? "green" : "red";
        } catch (e) {
            resultado.textContent = "Error de validación.";
        }
    }

    if (fueCorrecta) {
        jugadorActivo.puntos += 10;
        if (esPreguntaDeQuesito) {
            jugadorActivo.puntos += 50;
            jugadorActivo.quesitos.add(categoriaSeleccionada);
            
            // Si consigue el quesito, su racha en esa categoría se reinicia a 0
            jugadorActivo.aciertos[categoriaSeleccionada] = 0; 
            
            const prefijoTema = categoriaSeleccionada === 'Arte y Literatura' ? 'Arte' : categoriaSeleccionada;
            const idHtml = `q-${prefijoTema}-${jugadorActivo.id}`;
            document.getElementById(idHtml)?.classList.add('obtenido');
            
        } else {
            // Sumar a la racha
            jugadorActivo.aciertos[categoriaSeleccionada] = (jugadorActivo.aciertos[categoriaSeleccionada] || 0) + 1;
        }
    } else {
        // Fallar la pregunta reinicia a 0 la racha de esa categoría
        jugadorActivo.aciertos[categoriaSeleccionada] = 0;
    }

    actualizarInterfazMarcadores();
    botonSiguiente.style.display = 'inline-block';
}

function manejarSiguienteAccion() {
    const jugadorActivo = jugadores[turnoActual];

    // Verificar si el jugador actual ha ganado al conseguir todas las categorías existentes
    if (jugadorActivo.quesitos.size >= categorias.length) {
        finalizarPartida(jugadorActivo);
    } else {
        // Cambiar turno y preparar la ruleta para el siguiente jugador
        turnoActual = (turnoActual + 1) % 2;
        prepararSiguienteTurno();
    }
}

function limpiarInterfazJuego() {
    contenedorOpciones.innerHTML = '';
    resultado.textContent = '';
    botonSiguiente.style.display = 'none';
}

function finalizarPartida(ganador) {
    cambiarPantalla(pantallaResultados);
    panelProgreso.classList.add('oculto');
    
    const perdedor = jugadores[(turnoActual + 1) % 2];
    
    textoPuntuacion.innerHTML = `
        🏆 ¡Gana: <strong>${ganador.nombre}</strong>!<br>
        Puntos: ${ganador.puntos} | Quesitos conseguidos: ${ganador.quesitos.size}<br><br>
        Segundo lugar: ${perdedor.nombre} con ${perdedor.puntos} puntos y ${perdedor.quesitos.size} quesitos.
    `;
    
    seccionRegistro.style.display = 'block';
    seccionRanking.style.display = 'none';
    btnGuardarRecord.disabled = false;
}

async function guardarRecordsMultijugador() {
    btnGuardarRecord.disabled = true;
    
    try {
        await fetch(`${urlApi}/puntuacion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombre: jugadores[0].nombre, 
                puntos: jugadores[0].puntos, 
                quesitos: jugadores[0].quesitos.size 
            })
        });
        
        const res2 = await fetch(`${urlApi}/puntuacion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombre: jugadores[1].nombre, 
                puntos: jugadores[1].puntos, 
                quesitos: jugadores[1].quesitos.size 
            })
        });
        
        const data = await res2.json();
        seccionRegistro.style.display = 'none';
        mostrarRanking(data.ranking);

    } catch (error) {
        console.error("Error guardando los récords:", error);
        btnGuardarRecord.disabled = false;
        alert("Ocurrió un error al guardar los datos en el servidor.");
    }
}

function mostrarRanking(ranking) {
    seccionRanking.style.display = 'block';
    listaRanking.innerHTML = '<ol>' + ranking.map(r => `<li>${r.nombre}: ${r.puntos} pts (${r.quesitos} quesitos)</li>`).join('') + '</ol>';
}