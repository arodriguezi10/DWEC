const express = require("express");
const cors = require("cors");
const Trivia = require("./Trivia");

const app = express();
const PORT = 3000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Inicialización de la lógica de negocio
const juego = new Trivia("./questions.json");
let rankingGlobal = [];

// --- ENDPOINTS ---

app.get("/categorias", (req, res) => {
    try {
        const categorias = juego.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        manejarError(res, error, "Error interno del servidor al cargar categorías");
    }
});

app.get("/preguntas", (req, res) => {
    res.json(juego.preguntas);
});

app.get("/pregunta-aleatoria", (req, res) => {
    try {
        const { categoria } = req.query; 
        const pregunta = juego.obtenerPreguntaAleatoria(categoria);
        
        if (!pregunta) {
            return res.status(404).json({ error: "No hay preguntas disponibles para esta categoría" });
        }

        // Se envía solo la información necesaria al cliente por seguridad
        res.json({
            categoria: pregunta.categoria,
            pregunta: pregunta.pregunta,
            opciones: pregunta.opciones
        });
    } catch (error) {
        manejarError(res, error, "Error interno al obtener pregunta aleatoria");
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
            esCorrecta,
            respuestaCorrecta: esCorrecta ? null : preguntaOriginal.respuestaCorrecta
        });
    } catch (error) {
        manejarError(res, error, "Error interno al verificar respuesta");
    }
});

app.post("/questions", (req, res) => {
    try {
        const nuevaPregunta = req.body;
        juego.preguntas.push(nuevaPregunta);
        res.json({ ok: true, message: "Pregunta añadida correctamente" });
    } catch (error) {
        manejarError(res, error, "Error interno al añadir pregunta");
    }
});

app.post("/puntuacion", (req, res) => {
    try {
        const { nombre, puntos, quesitos } = req.body;

        if (!nombre || puntos === undefined || quesitos === undefined) {
            return res.status(400).json({ error: "Datos incompletos: Se requiere 'nombre', 'puntos' y 'quesitos'." });
        }

        rankingGlobal.push({
            nombre,
            puntos,
            quesitos,
            fecha: new Date().toLocaleDateString()
        });

        rankingGlobal.sort((a, b) => b.puntos - a.puntos);

        res.json({ 
            message: "Puntuación registrada con éxito", 
            ranking: rankingGlobal 
        });
    } catch (error) {
        manejarError(res, error, "Error interno al guardar la puntuación");
    }
});

// --- FUNCIONES AUXILIARES ---

function manejarError(res, error, mensajeUsuario) {
    console.error(mensajeUsuario, error);
    res.status(500).json({ error: mensajeUsuario });
}

// --- INICIO DEL SERVIDOR ---

app.listen(PORT, () => {
    console.log(`Servidor Trivial escuchando en el puerto ${PORT}`);
});