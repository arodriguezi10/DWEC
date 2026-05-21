class Trivia {
  constructor(rutaArchivo) {
    try {
      const datosCrudos = require(rutaArchivo);
      this.categoriasDisponibles = Object.keys(datosCrudos);
      this.preguntas = this.normalizarDatos(datosCrudos);
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error.message);
      this.preguntas = [];
      this.categoriasDisponibles = [];
    }
  }

  normalizarDatos(datos) {
    let preguntasFormateadas = [];
    for (const categoria in datos) {
      datos[categoria].forEach(item => {
        preguntasFormateadas.push({
          categoria: categoria,
          pregunta: item.text,
          opciones: item.choices,
          respuestaCorrecta: item.answer
        });
      });
    }
    return preguntasFormateadas;
  }

  obtenerCategorias() {
    return this.categoriasDisponibles;
  }

  obtenerPreguntaAleatoria(categoriaBuscada = null) {
    let preguntasFiltradas = this.preguntas;
    
    if (categoriaBuscada) {
      preguntasFiltradas = this.preguntas.filter(p => p.categoria === categoriaBuscada);
    }

    if (preguntasFiltradas.length === 0) return null;
    
    const indiceAleatorio = Math.floor(Math.random() * preguntasFiltradas.length);
    return preguntasFiltradas[indiceAleatorio];
  }
}

module.exports = Trivia;