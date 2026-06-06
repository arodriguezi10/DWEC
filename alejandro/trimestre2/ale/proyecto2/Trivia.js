/////////////////////////////
////// clase Trivia.js //////
/////////////////////////////

class Trivia {
  //////////////////////////
  ////// CONSTRUCTOR ///////
  //////////////////////////
  constructor(rutaArchivo) {
    this.preguntas = [];
    this.categoriasDisponibles = [];
    this.categoriaMaldita;

    try {
      // Usamos require estándar para cargar el JSON directamente
      const datosCrudos = require(rutaArchivo);

      // 2. Extraemos los nombres de las categorías
      // Object.keys() coge las llaves principales: "Geografía", "Historia", etc.
      this.categoriasDisponibles = Object.keys(datosCrudos);

      const indiceAleatorio = Math.floor(Math.random() * this.categoriasDisponibles.length);
      this.categoriaMaldita = this.categoriasDisponibles[indiceAleatorio];

      // 3. Formateamos las preguntas para que sean más fáciles de manejar
      this.preguntas = this.normalizarDatos(datosCrudos);
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error.message);
    }
  }

  ///////////////////////
  ////// MÉTODOS ////////
  ///////////////////////

  normalizarDatos(datosDelJson) {
    let listaPlanaDePreguntas = [];

    // Recorremos cada categoría del JSON (Ej: pasamos por "Geografía", luego "Ciencia"...)
    for (let nombreCategoria in datosDelJson) {
      // Extraemos solo la lista de preguntas de esa categoría concreta
      let listaDePreguntas = datosDelJson[nombreCategoria];

      // Usamos un bucle clásico para recorrer esa lista pregunta por pregunta
      for (let i = 0; i < listaDePreguntas.length; i++) {
        let preguntaCruda = listaDePreguntas[i];

        // Construimos un objeto nuevo y limpio
        let preguntaLimpia = {
          categoria: nombreCategoria,
          pregunta: preguntaCruda.text,
          opciones: preguntaCruda.choices,
          respuestaCorrecta: preguntaCruda.answer,
          riesgo: preguntaCruda.riesgo,
        };

        // Lo metemos en nuestra lista final
        listaPlanaDePreguntas.push(preguntaLimpia);
      }
    }

    return listaPlanaDePreguntas;
  }

  // el servidor llama a esta funcion para cuando necesita saber que categorias hay
  obtenerCategorias() {
    return this.categoriasDisponibles;
  }

  obtenerCategoriaMaldita(){
    return this.categoriaMaldita;
  }

  // el servidor llama a esta funcion, una vex obtenidas toda, para obtner una pregunta al azar
  obtenerPreguntaAleatoria(categoriaDeseada = null) {
    let grupoDePreguntasParaElegir = [];

    // PASO 1: ¿De dónde sacamos la pregunta?
    if (categoriaDeseada === null) {
      // Si no nos piden una categoría concreta, podemos elegir de entre todas
      grupoDePreguntasParaElegir = this.preguntas;
    } else {
      // Si nos piden una categoría concreta, tenemos que buscar cuáles coinciden
      for (let i = 0; i < this.preguntas.length; i++) {
        let preguntaActual = this.preguntas[i];

        if (preguntaActual.categoria === categoriaDeseada) {
          grupoDePreguntasParaElegir.push(preguntaActual);
        }
      }
    }

    // PASO 2: Control de errores. ¿Y si la categoría no existe y la lista está vacía?
    if (grupoDePreguntasParaElegir.length === 0) {
      return null;
    }

    // PASO 3: Matemáticas para elegir una al azar
    // Math.random() genera un decimal (ej: 0.54). Lo multiplicamos por el total de preguntas (ej: 8).
    let decimalAleatorio = Math.random() * grupoDePreguntasParaElegir.length;

    // Math.floor() quita los decimales para darnos un índice exacto (ej: 4)
    let indiceGanador = Math.floor(decimalAleatorio);

    // PASO 4: Devolvemos la pregunta que estaba en esa posición
    return grupoDePreguntasParaElegir[indiceGanador];
  }

  // el servidor llama a esta funcion para cuando el se necesita el comodin
  aplicarComodin(textoPregunta) {
    let preguntaEncontrada = null;

    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].pregunta === textoPregunta) {
        preguntaEncontrada = this.preguntas[i];
        break;
      }
    }

    if (preguntaEncontrada === null) {
      return null;
    }

    let correcta = preguntaEncontrada.respuestaCorrecta;
    let opcionesIncorrectas = [];

    for (let i = 0; i < preguntaEncontrada.opciones.length; i++) {
      let opcionActual = preguntaEncontrada.opciones[i];
      if (opcionActual !== correcta) {
        opcionesIncorrectas.push(opcionActual);
      }
    }

    // 3. Seleccionamos una opción incorrecta al azar
    let indiceAleatorio = Math.floor(
      Math.random() * opcionesIncorrectas.length,
    );
    let incorrectaAlAzar = opcionesIncorrectas[indiceAleatorio];

    // 4. Devolvemos un array que contenga únicamente la correcta y la incorrecta elegida
    return [correcta, incorrectaAlAzar];
  }
}

module.exports = Trivia;
