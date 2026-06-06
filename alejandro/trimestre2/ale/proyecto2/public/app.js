////////////////////////////////////////
////////// clase Jugador.js ////////////
////////////////////////////////////////

class Jugador {
  // constructor
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.puntos = 0;
    this.quesitos = new Set();
    this.fallos = {};
    this.aciertos = {};
    this.fallosPorCategoria = {};
    this.turnosBloqueados = 0;
    this.comodinUsado = false;
  }

  // metodos
  registrarFallo(categoria) {
    if (this.fallosPorCategoria[categoria] == undefined) {
      this.fallosPorCategoria[categoria] = 0;
    }

    this.fallosPorCategoria[categoria] = this.fallosPorCategoria[categoria] + 1;

    // Evaluamos el castigo: ¿Ha llegado a 2 fallos seguidos?
    if (this.fallosPorCategoria[categoria] >= 2) {
      this.turnosBloqueados = this.turnosBloqueados + 2; // Le sumamos 2 turnos de bloqueo
      this.fallosPorCategoria[categoria] = 0; // Limpiamos la racha para que empiece de cero
    }
  }

  pasarTurnoBloqueado(categoria) {
    this.fallosPorCategoria[categoria] = 0;
  }
}

///////////////////
///// CLIENTE /////
///////////////////

///////////////////////////////////////////////////////////////////////////////
///// 1. CONFIGURACIÓN PRINCIPAL Y VARIABLES GLOBALES (MEMORIA DEL JUEGO) /////
///////////////////////////////////////////////////////////////////////////////

const urlApi = "http://localhost:3000"; // nuestro servidor

// lista para guardar toda la información de los dos jugadores

let jugadores = [];

// control de turno:
// turno = 0 = Jugador 1
// turno = 1 = Jugador 2
let turnoActual = 0;

// Variables para recordar qué está pasando en este momento exacto
let preguntaActual = null;
let categoriaSeleccionada = "";
let categorias = [];
let esPreguntaDeQuesito = false;
let categoriaMalditaActual = "";

// Variables para controlar el tiempo del usuario
let temporizador = null;
let tiempoRestante = 30;

// Variables matemáticas para que la ruleta gire visualmente
let anguloActual = 0;
let velocidadGiro = 0;
let ruletaGirando = false;
const coloresRuleta = [
  "#f39c12",
  "#e74c3c",
  "#3498db",
  "#9b59b6",
  "#2ecc71",
  "#1abc9c",
  "#1e0e35",
];

//////////////////////////////////////////////////////////////////////////////
////////// 2. ENLACES CON EL HTML (BÚSQUEDA DE ELEMENTOS VISUALES) ///////////
/////////////////////////////////////////////////////////////////////////////

// Pantallas completas
const pantallaBienvenida = document.getElementById("pantalla-bienvenida");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaResultados = document.getElementById("pantalla-resultados");
const panelProgreso = document.getElementById("panel-progreso");

// Formularios iniciales
const inputNombreJ1 = document.getElementById("nombre-j1");
const inputNombreJ2 = document.getElementById("nombre-j2");
const btnEmpezarJuego = document.getElementById("btn-empezar-juego");
const etiquetaMaldita = document.getElementById("etiqueta-maldita");

// Marcadores superiores
const indicadorTurno = document.getElementById("indicador-turno");
const panelJ1 = document.getElementById("panel-j1");
const panelJ2 = document.getElementById("panel-j2");
const infoJ1 = document.getElementById("info-j1");
const infoJ2 = document.getElementById("info-j2");

// Elementos de la Ruleta
const canvasRuleta = document.getElementById("canvas-ruleta");
const ctx = canvasRuleta ? canvasRuleta.getContext("2d") : null;
const btnGirar = document.getElementById("btn-girar");
const temaSeleccionado = document.getElementById("tema-seleccionado");
const btnEmpezar = document.getElementById("btn-empezar");

// Elementos durante la Pregunta
const avisoQuesito = document.getElementById("aviso-quesito");
const textoTiempo = document.getElementById("texto-tiempo");
const textoPregunta = document.getElementById("texto-pregunta");
const contenedorOpciones = document.getElementById("contenedor-opciones");
const resultado = document.getElementById("resultado");
const botonSiguiente = document.getElementById("siguiente-btn");

// boton de usar comodin
const botonComodin = document.getElementById("btn-comodin");

//aviso de pregunta de riesgo
const avisoRiesgo = document.getElementById("aviso-riesgo");

// Elementos en la Pantalla Final (Resultados)
const textoPuntuacion = document.getElementById("texto-puntuacion");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnGuardarRecord = document.getElementById("btn-guardar-record");
const seccionRegistro = document.getElementById("seccion-registro");
const seccionRanking = document.getElementById("seccion-ranking");
const listaRanking = document.getElementById("lista-ranking");

//////////////////////////////////////////////////////////////////////////////
////////// 3. EVENTOS (CUANDO EL USUARIO HACE CLIC EN LOS BOTONES) ///////////
//////////////////////////////////////////////////////////////////////////////
btnEmpezarJuego.addEventListener("click", iniciarPartida);
btnGirar.addEventListener("click", iniciarGiroRuleta);
btnEmpezar.addEventListener("click", prepararPantallaPregunta);
botonSiguiente.addEventListener("click", comprobarSiAlguienHaGanadoOPasarTurno);
btnReiniciar.addEventListener("click", volverAlaPantallaInicial);
btnGuardarRecord.addEventListener("click", guardarRecordsEnElServidor);
botonComodin.addEventListener("click", aplicarComodinVisual);

//////////////////////////////////////////////////////////////////////////////
////////////////////// 4. FUNCIONES DE LÓGICA PASO A PASO ////////////////////
//////////////////////////////////////////////////////////////////////////////

function cambiarPantallaVisual(pantallaDestino) {
  // Escondemos absolutamente todas las pantallas primero
  pantallaBienvenida.classList.remove("activa");
  pantallaInicio.classList.remove("activa");
  pantallaJuego.classList.remove("activa");
  pantallaResultados.classList.remove("activa");

  // Y mostramos únicamente la que hemos pedido
  pantallaDestino.classList.add("activa");
}

function volverAlaPantallaInicial() {
  panelProgreso.classList.add("oculto");
  inputNombreJ1.value = "";
  inputNombreJ2.value = "";
  cambiarPantallaVisual(pantallaBienvenida);
}

async function iniciarPartida() {
  const nombreJugador1 = inputNombreJ1.value.trim();
  const nombreJugador2 = inputNombreJ2.value.trim();

  // Validaciones por si algunos de los campos está vacio
  if (nombreJugador1 === "" || nombreJugador2 === "") {
    alert("Ambos jugadores deben introducir su nombre.");
    return;
  }

  try {
    const padirMaldita = await fetch(urlApi + "/categoria-maldita");

    const datosDelServidor = await padirMaldita.json();

    categoriaMalditaActual = datosDelServidor.categoria;
    etiquetaMaldita.textContent = categoriaMalditaActual;
  } catch (error) {
    console.error( "Error al bloquear categoria");
  }


  // reiniciamos los datos en memoria de los usuarios por si venimos de una partida anterior
  jugadores[0] = new Jugador("j1", nombreJugador1);
  jugadores[1] = new Jugador("j2", nombreJugador2);
  turnoActual = 0;

  // Limpiamos los colores visuales de los quesitos en el HTML
  let todosLosQuesitos = document.querySelectorAll(".quesito");
  // recorremos los qusitos
  for (let i = 0; i < todosLosQuesitos.length; i++) {
    todosLosQuesitos[i].classList.remove("obtenido");
  }

  panelProgreso.classList.remove("oculto");

  // Pedimos las categorías al servidor y preparamos el entorno
  await pedirCategoriasAlServidor();
  refrescarMarcadoresEnPantalla();
  prepararRuletaParaSiguienteTurno();
}

// Actualiza los colores y textos del panel superior según a quién le toque
function refrescarMarcadoresEnPantalla() {
  let jugadorActivo = jugadores[turnoActual]; // recogemos el turno actual del jugador y lo guardamos en una variable

  // Mostramos el nombre de a quién le toca y aplicamos su color
  indicadorTurno.textContent = "Turno de: " + jugadorActivo.nombre;

  //aplicamos estilo para cada uno de los jugadores.
  if (turnoActual === 0) {
    // jugador 1
    indicadorTurno.style.color = "#3498db";

    // Destacamos el panel del Jugador 1
    panelJ1.style.opacity = "1";
    panelJ1.style.boxShadow = "0 0 10px #3498db";
    panelJ2.style.opacity = "0.5";
    panelJ2.style.boxShadow = "none";
  } else {
    // jugador 2
    indicadorTurno.style.color = "#e74c3c";

    // Destacamos el panel del Jugador 2
    panelJ2.style.opacity = "1";
    panelJ2.style.boxShadow = "0 0 10px #e74c3c";
    panelJ1.style.opacity = "0.5";
    panelJ1.style.boxShadow = "none";
  }

  // Actualizamos los textos de puntos y cantidad de quesitos
  infoJ1.textContent =
    jugadores[0].nombre +
    " | " +
    jugadores[0].puntos +
    " pts | " +
    jugadores[0].quesitos.size +
    " Quesitos";
  infoJ2.textContent =
    jugadores[1].nombre +
    " | " +
    jugadores[1].puntos +
    " pts | " +
    jugadores[1].quesitos.size +
    " Quesitos";
}

function prepararRuletaParaSiguienteTurno() {
  refrescarMarcadoresEnPantalla();
  temaSeleccionado.textContent = "Tema: ---";
  btnEmpezar.style.display = "none";
  btnGirar.disabled = false;
  cambiarPantallaVisual(pantallaInicio);
}

async function pedirCategoriasAlServidor() {
  try {
    const respuestaServidor = await fetch(urlApi + "/categorias");
    categorias = await respuestaServidor.json();
    dibujarRuleta();
  } catch (error) {
    temaSeleccionado.textContent = "Error de conexion con el servidor.";
  }
}

//////////////////////////////////////////////////////////////////////////////
///////////////// 5. FUNCIONES VISUALES (MOTOR DE LA RULETA) /////////////////
//////////////////////////////////////////////////////////////////////////////

function dibujarRuleta() {
  if (categorias.length === 0) return;

  let centroX = canvasRuleta.width / 2;
  let centroY = canvasRuleta.height / 2;
  let radio = centroX - 10;
  let arcoPorCategoria = (2 * Math.PI) / categorias.length;

  // Limpiamos el canvas antes de volver a dibujar
  ctx.clearRect(0, 0, canvasRuleta.width, canvasRuleta.height);

  for (let i = 0; i < categorias.length; i++) {
    let anguloDeInicio = anguloActual + i * arcoPorCategoria;
    let anguloFinal = anguloDeInicio + arcoPorCategoria;

    // Dibujamos la porcion de la ruleta (el triangulo curvado)
    ctx.beginPath();
    ctx.fillStyle = coloresRuleta[i % coloresRuleta.length];
    ctx.moveTo(centroX, centroY);
    ctx.arc(centroX, centroY, radio, anguloDeInicio, anguloFinal);
    ctx.fill();
    ctx.stroke();

    // Escribimos el texto de la categoria
    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(anguloDeInicio + arcoPorCategoria / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(categorias[i], radio - 20, 6);
    ctx.restore();
  }
}

function iniciarGiroRuleta() {
  if (ruletaGirando === true || categorias.length === 0) {
    return; // Evitamos que el usuario pulse multiples veces
  }

  ruletaGirando = true;
  btnGirar.disabled = true;
  btnEmpezar.style.display = "none";

  // Damos una fuerza inicial aleatoria para que no siempre caiga igual
  velocidadGiro = Math.random() * 0.2 + 0.3;
  animarGiro();
}

function animarGiro() {
  if (velocidadGiro > 0.002) {
    // Mientras tenga velocidad, sumamos el angulo y reducimos la fuerza un 2%
    anguloActual = anguloActual + velocidadGiro;
    velocidadGiro = velocidadGiro * 0.98;
    dibujarRuleta();
    requestAnimationFrame(animarGiro);
  } else {
    // Cuando pierde toda la velocidad, se detiene
    ruletaGirando = false;
    calcularQueCategoriaHaGanado();
  }
}

function calcularQueCategoriaHaGanado() {
  let arco = (2 * Math.PI) / categorias.length;
  let anguloNormalizado = anguloActual % (2 * Math.PI);
  let anguloPuntero =
    (1.5 * Math.PI - anguloNormalizado + 2 * Math.PI) % (2 * Math.PI);
  let indiceCategoriaElegida = Math.floor(anguloPuntero / arco);

  categoriaSeleccionada = categorias[indiceCategoriaElegida];
  temaSeleccionado.textContent = "Tema: " + categoriaSeleccionada;

  // Mostramos el boton para ir a la pregunta
  btnEmpezar.style.display = "inline-block";
  btnGirar.disabled = false;
}

//////////////////////////////////////////////////////////////////////
///////////////// 6. FLUJO DE PREGUNTAS Y RESPUESTAS /////////////////
//////////////////////////////////////////////////////////////////////

function prepararPantallaPregunta() {
  cambiarPantallaVisual(pantallaJuego);
  cargarNuevaPreguntaDesdeServidor();
}

async function cargarNuevaPreguntaDesdeServidor() {
  // 1. Limpiamos cualquier rastro de la pregunta anterior, limpiamos todo
  contenedorOpciones.innerHTML = "";
  resultado.textContent = "";
  botonSiguiente.style.display = "none";

  let jugadorActivo = jugadores[turnoActual]; // recojemos el turno actual

  // 2. Revisamos cuantos aciertos lleva en esta categoría
  let cantidadDeAciertos = 0;
  if (jugadorActivo.aciertos[categoriaSeleccionada] !== undefined) {
    cantidadDeAciertos = jugadorActivo.aciertos[categoriaSeleccionada];
  }

  // 3. Logica del Quesito: Necesita al menos 2 aciertos previos seguidos
  // y no tener ya el quesito conseguido. Si cumple, 75% de que aparezca.
  let noTieneQuesitoAun = !jugadorActivo.quesitos.has(categoriaSeleccionada);

  // 1. Por defecto, asumimos que no hay premio
  esPreguntaDeQuesito = false;

  // 2. Solo si cumple las condiciones, tiramos los dados para ver si le toca
  if (cantidadDeAciertos >= 0 && noTieneQuesitoAun === true) {
    let numeroAleatorio = Math.random();
    if (numeroAleatorio <= 0.99) {
      esPreguntaDeQuesito = true;
    }
  }

  // 4. Mostramos el aviso visual si toca quesito
  if (esPreguntaDeQuesito === true) {
    avisoQuesito.style.display = "block";
  } else {
    avisoQuesito.style.display = "none";
  }

  // si el judador no ha usado el comodin

  if (jugadorActivo.comodin !== true) {
    botonComodin.style.display = "block";
  } else {
    botonComodin.style.display = "none";
  }

  // 5. Pedimos la pregunta real al servidor
  try {
    const urlSegura =
      urlApi +
      "/pregunta-aleatoria?categoria=" +
      encodeURIComponent(categoriaSeleccionada);
    const respuesta = await fetch(urlSegura);
    preguntaActual = await respuesta.json();

    //////////////////////////////////////
    ////////////// RIESGO ////////////////
    //////////////////////////////////////

    if (preguntaActual.riesgo === true) {
      avisoRiesgo.style.display = "block";
    } else {
      avisoRiesgo.style.display = "none";
    }

    pintarPreguntaEnHtml(preguntaActual);
    iniciarRelojDescuento();
  } catch (error) {
    // AÑADE ESTA LÍNEA para que nos chive el error real en la consola
    console.error("El error oculto es:", error);
    textoPregunta.textContent = "Fallo al cargar la pregunta del servidor.";
  }
}

function pintarPreguntaEnHtml(datosPregunta) {
  textoPregunta.textContent = datosPregunta.pregunta;

  // Por cada opción, creamos un boton
  for (let i = 0; i < datosPregunta.opciones.length; i++) {
    let nombreOpcion = datosPregunta.opciones[i];

    let botonHtml = document.createElement("button");
    botonHtml.textContent = nombreOpcion;
    botonHtml.className = "opcion";

    // Al pulsar el boton, llamamos a la verificacion
    botonHtml.addEventListener("click", function () {
      verificarSiRespuestaEsCorrecta(nombreOpcion);
    });

    contenedorOpciones.appendChild(botonHtml);
  }
}

function iniciarRelojDescuento() {
  clearInterval(temporizador);
  tiempoRestante = 30;
  textoTiempo.textContent = "Tiempo: " + tiempoRestante + "s";

  temporizador = setInterval(function () {
    tiempoRestante = tiempoRestante - 1;
    textoTiempo.textContent = "Tiempo: " + tiempoRestante + "s";

    // Si el reloj llega a cero, forzamos un error enviando 'null'
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      verificarSiRespuestaEsCorrecta(null);
    }
  }, 1000);
}

async function verificarSiRespuestaEsCorrecta(respuestaElegidaPorUsuario) {
    botonComodin.style.display = "none"
  // 1. Frenamos el reloj
  clearInterval(temporizador);

  // 2. Desactivamos todos los botones para evitar doble clic
  let botonesDeOpciones = document.querySelectorAll(".opcion");
  for (let i = 0; i < botonesDeOpciones.length; i++) {
    botonesDeOpciones[i].disabled = true;
  }

  let elUsuarioHaAcertado = false;
  let jugadorActivo = jugadores[turnoActual];

  // 3. Comprobamos si ha perdido por tiempo
  if (respuestaElegidaPorUsuario === null) {
    resultado.textContent = "Se acabo el tiempo.";
    resultado.style.color = "red";
  } else {
    // 4. Preguntamos al servidor si acertó
    try {
      const envioDeDatos = await fetch(urlApi + "/verificar-respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textoPregunta: preguntaActual.pregunta,
          respuestaUsuario: respuestaElegidaPorUsuario,
        }),
      });

      const datosDelServidor = await envioDeDatos.json();
      elUsuarioHaAcertado = datosDelServidor.esCorrecta;

      if (elUsuarioHaAcertado === true) {
        resultado.textContent = "¡Respuesta correcta!";
        resultado.style.color = "green";
      } else {
        resultado.textContent =
          "Has fallado. La respuesta era: " +
          datosDelServidor.respuestaCorrecta;
        resultado.style.color = "red";
      }
    } catch (error) {
      resultado.textContent = "Fallo interno al comprobar la respuesta.";
    }
  }

  // accedemos a la propiedad riesgo del objeto que envia el server.js
  let esRiesgo = preguntaActual.riesgo === true;

  // 5. Reparto de puntos y actualización de estado
  if (elUsuarioHaAcertado === true) {
    jugadorActivo.registrarFallo(categoriaSeleccionada);

    jugadorActivo.puntos = jugadorActivo.puntos + 1;

    if (esRiesgo) {
      jugadorActivo.puntos = jugadorActivo.puntos + 5;
    }

    if (categoriaSeleccionada === categoriaMalditaActual && esPreguntaDeQuesito === true) {
      esPreguntaDeQuesito = false; // Le anulamos el premio gordo
      alert("¡Maldición! Acertaste, pero " + categoriaMalditaActual + " no entrega quesitos en esta partida.");
    }

    if (esPreguntaDeQuesito === true) {
      // Premio gordo
      jugadorActivo.puntos = jugadorActivo.puntos + 2;
      jugadorActivo.quesitos.add(categoriaSeleccionada);

      // Reiniciar su racha a 0 en esta categoria porque ya ganó el premio
      jugadorActivo.aciertos[categoriaSeleccionada] = 0;

      // Iluminamos el quesito en la interfaz
      let prefijoTema = categoriaSeleccionada;
      if (categoriaSeleccionada === "Arte y Literatura") {
        prefijoTema = "Arte";
      }
      let identificadorCcs = "q-" + prefijoTema + "-" + jugadorActivo.id;
      document.getElementById(identificadorCcs).classList.add("obtenido");
    } else {
      // Solo aumentamos su racha de aciertos
      if (jugadorActivo.aciertos[categoriaSeleccionada] === undefined) {
        jugadorActivo.aciertos[categoriaSeleccionada] = 0;
      }
      jugadorActivo.aciertos[categoriaSeleccionada] =
        jugadorActivo.aciertos[categoriaSeleccionada] + 1;
    }
  } else {
    if (esRiesgo && esPreguntaDeQuesito) {
      jugadorActivo.puntos = jugadorActivo.puntos - 7;
    } else if (esRiesgo) {
      jugadorActivo.puntos = jugadorActivo.puntos - 5;
    } else if (esPreguntaDeQuesito) {
      jugadorActivo.puntos = jugadorActivo.puntos - 2;
    }

    if (jugadorActivo.puntos < 0) {
      jugadorActivo.puntos = 0;
    }

    jugadorActivo.registrarFallo(categoriaSeleccionada);

    // Si falla, pierde por completo su racha en esa categoría
    jugadorActivo.aciertos[categoriaSeleccionada] = 0;
  }

  refrescarMarcadoresEnPantalla();
  botonSiguiente.style.display = "inline-block";
}

async function aplicarComodinVisual() {
    let jugadorActivo = jugadores[turnoActual];

    // 1. Actualizamos el estado: gastamos el comodín y ocultamos el botón inmediatamente
    jugadorActivo.comodin = true; 
    botonComodin.style.display = "none";

  try {
    const pedirComodin = await fetch(urlApi + "/comodin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pregunta: preguntaActual.pregunta,
      }),
    });

    const datosDelServidor = await pedirComodin.json();

    contenedorOpciones.innerHTML = "";

    pintarPreguntaEnHtml({
        pregunta: preguntaActual.pregunta,
        opciones: datosDelServidor.opcionesFiltradas,
    });
  } catch (error) {
    resultado.textContent = "Error al bloquer categoria";
  }

  
  botonComodin.style.display = "inline-block";
}

function comprobarSiAlguienHaGanadoOPasarTurno() {
  let jugadorActivo = jugadores[turnoActual];

  // Condicion de Victoria: Tener tantos quesitos como categorias existen
  if (jugadorActivo.quesitos.size >= categorias.length) {
    ejecutarFinalDeLaPartida(jugadorActivo);
  } else {
    if (turnoActual === 0) {
      // Si era el turno del Jugador 1, pasamos al Jugador 2
      turnoActual = 1;
    } else {
      // Si era el turno del Jugador 2, pasamos al Jugador 1
      turnoActual = 0;
    }

    let siguienteJugador = jugadores[turnoActual];

    if (siguienteJugador.turnosBloqueados > 0) {
      siguienteJugador.turnosBloqueados = siguienteJugador.turnosBloqueados - 1;

      alert(
        "¡El jugador " +
          siguienteJugador.nombre +
          " pierde su turno por acumular fallos!",
      );

      if (turnoActual === 0) {
        // Si era el turno del Jugador 1, pasamos al Jugador 2
        turnoActual = 1;
      } else {
        // Si era el turno del Jugador 2, pasamos al Jugador 1
        turnoActual = 0;
      }
    }

    prepararRuletaParaSiguienteTurno();
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////// 7. FUNCIONES DEL FINAL DEL JUEGO Y GUARDADO /////////////////
///////////////////////////////////////////////////////////////////////////////

function ejecutarFinalDeLaPartida(ganadorDefinitivo) {
  cambiarPantallaVisual(pantallaResultados);
  panelProgreso.classList.add("oculto");

  // Buscamos quién es el que ha perdido
  let perdedorDefinitivo;
  if (turnoActual === 0) {
    perdedorDefinitivo = jugadores[1];
  } else {
    perdedorDefinitivo = jugadores[0];
  }

  // Escribimos el resumen
  textoPuntuacion.innerHTML =
    "Gana la partida: <strong>" +
    ganadorDefinitivo.nombre +
    "</strong>.<br>" +
    "Ha conseguido " +
    ganadorDefinitivo.puntos +
    " puntos y " +
    ganadorDefinitivo.quesitos.size +
    " quesitos.<br><br>" +
    "El jugador " +
    perdedorDefinitivo.nombre +
    " queda en segundo lugar con " +
    perdedorDefinitivo.puntos +
    " puntos.";

  seccionRegistro.style.display = "block";
  seccionRanking.style.display = "none";
  btnGuardarRecord.disabled = false;
}

async function guardarRecordsEnElServidor() {
  btnGuardarRecord.disabled = true; // Bloqueamos para evitar clics dobles

  try {
    // Peticion 1: Guardamos al primer jugador
    await fetch(urlApi + "/puntuacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: jugadores[0].nombre,
        puntos: jugadores[0].puntos,
        quesitos: jugadores[0].quesitos.size,
      }),
    });

    // Peticion 2: Guardamos al segundo jugador y capturamos el resultado del ranking
    const respuestaServidor = await fetch(urlApi + "/puntuacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: jugadores[1].nombre,
        puntos: jugadores[1].puntos,
        quesitos: jugadores[1].quesitos.size,
      }),
    });

    const datosEnJson = await respuestaServidor.json();

    // Escondemos el boton y mostramos la lista
    seccionRegistro.style.display = "none";

    seccionRanking.style.display = "block";
    listaRanking.innerHTML = "";

    let textoLista = "<ol>";
    for (let i = 0; i < datosEnJson.ranking.length; i++) {
      let registro = datosEnJson.ranking[i];
      textoLista +=
        "<li>" +
        registro.nombre +
        ": " +
        registro.puntos +
        " puntos (" +
        registro.quesitos +
        " quesitos)</li>";
    }
    textoLista += "</ol>";

    listaRanking.innerHTML = textoLista;
  } catch (error) {
    btnGuardarRecord.disabled = false;
    alert("Ocurrio un problema tratando de conectar con la base de datos.");
  }
}
