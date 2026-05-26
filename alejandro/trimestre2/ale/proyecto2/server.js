const express = require("express");
const cors = require("cors");
const Trivia = require("./Trivia");

const app = express();

app.use(cors());
// Middleware para procesar JSON (esencial para poder leer req.body)
app.use(express.json());
app.use(express.static('public'));

const juego = new Trivia("./questions.json");

// Memoria del servidor: array global para el ranking
let rankingGlobal = [];

app.get("/categorias", (req, res) => {
  try {
    res.json(juego.obtenerCategorias());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor al cargar categorías" });
  }
});

app.get("/preguntas", (req, res) => {
  res.json(juego.preguntas);
});

app.get("/pregunta-aleatoria", (req, res) => {
  try {
    const { categoria } = req.query; 
    const preguntaCompleta = juego.obtenerPreguntaAleatoria(categoria);
    
    if (!preguntaCompleta) {
      return res.status(404).json({ error: "No hay preguntas disponibles para esta categoría" });
    }

    const preguntaSegura = {
      categoria: preguntaCompleta.categoria,
      pregunta: preguntaCompleta.pregunta,
      opciones: preguntaCompleta.opciones
    };

    res.json(preguntaSegura);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener pregunta aleatoria" });
  }
});

app.post("/verificar-respuesta", (req, res) => {
  try {
    const { textoPregunta, respuestaUsuario } = req.body;
    const preguntaOriginal = juego.preguntas.find(p => p.pregunta === textoPregunta);

    if (!preguntaOriginal) {
      return res.status(404).json({ error: "Pregunta no encontrada en la base de datos" });
    }

    const esCorrecta = preguntaOriginal.respuestaCorrecta === respuestaUsuario;

    res.json({
      esCorrecta: esCorrecta,
      respuestaCorrecta: esCorrecta ? null : preguntaOriginal.respuestaCorrecta
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno al verificar respuesta" });
  }
});

app.post("/questions", (req, res) => {
  try {
    const nuevaPregunta = req.body;
    juego.preguntas.push(nuevaPregunta);
    res.json({ ok: true, message: "Pregunta añadida correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al añadir pregunta" });
  }
});

// --- NUEVO ENDPOINT: REGISTRO DE PUNTUACIÓN ---
app.post("/puntuacion", (req, res) => {
  try {
    const { nombre, puntos, quesitos } = req.body;

    // 1. Validación de seguridad básica
    if (!nombre || puntos === undefined ||quesitos === undefined) {
      return res.status(400).json({ error: "Datos incompletos: Se requiere 'nombre' y 'puntos'." });
    }

    // 2. Crear el registro
    const nuevoRegistro = {
      nombre: nombre,
      puntos: puntos,
      quesitos: quesitos,
      fecha: new Date().toLocaleDateString() // Añadimos la fecha como extra útil
    };

    // 3. Guardar en la memoria global
    rankingGlobal.push(nuevoRegistro);

    // 4. Ordenar el ranking de mayor a menor puntuación
    rankingGlobal.sort((a, b) => b.puntos - a.puntos);

    // 5. Devolver confirmación y el ranking actualizado
    res.json({ 
      message: "¡Puntuación registrada con éxito!", 
      ranking: rankingGlobal 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno al guardar la puntuación" });
  }
});

app.listen(3000, () => console.log("Servidor Trivial escuchando en el puerto 3000"));