///////////////////////////////////////////////////
////// IMPORTACIONES Y CONFIGURACIÓN INICIAL //////
///////////////////////////////////////////////////

// Importarmos la librerias necesarios 
const express = require("express"); // creamos el servidor web
const cors = require("cors");  // permite que el navegador se comunique con este archivo: servidor
const Trivia = require("./Trivia"); // clase

// iniciamos el servidor web y definimos el puerto
const app = express(); 
const PORT = 3000;

///////////////////////////////////////////////////
/////////// MIDDLEWARES (INTERMEDIARIOS) //////////
///////////////////////////////////////////////////

// intermediarios que procesan la infomacion ante de que llege a nuestras rutas
app.use(cors());
app.use(express.json()); // para que el servidor lea le json de preguntas
app.use(express.static('public'));

//////////////////////////////////////////////////////////////////
/////////// DÓNDE INICIALIZAMOS LOS DATOS EN LA MEMORIA //////////
//////////////////////////////////////////////////////////////////

const juego = new Trivia("./questions.json"); //creamos instancia del juego para cargar las preguntas

let rankingGlobal = []; // lista vacía en la memora del servidor donde se guardar el ranking 

///////////////////////////////////////////////////////////
/////////// RUTAS O ENDPOINTS (LA API DEL JUEGO) //////////
///////////////////////////////////////////////////////////

// req : peticion 
// res : respuesta

// RUTA A: pedimos la lista de categorias disponibles
app.get("/categorias", function (req, res) {
    try {
        const categorias = juego.obtenerCategorias(); //obtnemos la categorias desde la clase Trivia y la guardamos en una constante
        res.json(categorias); // las enviamos al cliente como json
    } catch (error) {
        manejarError(res, error, "Error interno del servidor al cargar categorías");
    }
});

// RUTA B: vemos las preguntas de la base de datos
app.get("/preguntas", (req, res) => {
    res.json(juego.preguntas);
});

// RUTA C: pedimos una pregunta aleatoria, opcionalmente filtrada por la categoria
app.get("/pregunta-aleatoria", (req, res) => {
    try {
        const categoriaPedida = req.query.categoria; //extraemos la categoria de la url
        const pregunta = juego.obtenerPreguntaAleatoria(categoriaPedida); // le decimos a la clase Trivial que nos de una pregunta aleatoria para la categoria pedida
        
        //validaciones
        if (pregunta === null || pregunta === undefined) {
            return res.status(404).json({ error: "No hay preguntas disponibles para esta categoría" });
        }

        // enviamos del json solo la info necesaria y ocultamos la respuesta correcta.
        res.json({
            categoria: pregunta.categoria,
            pregunta: pregunta.pregunta,
            opciones: pregunta.opciones
        });

    } catch (error) {
        manejarError(res, error, "Error interno al obtener pregunta aleatoria");
    }
});

// RUTA D: comprobamos si el usuario a acertado la pregunta 
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

// RUTA E: añadimos nuevas preguntas
app.post("/questions", (req, res) => {
    try {
        const nuevaPregunta = req.body;
        juego.preguntas.push(nuevaPregunta);
        res.json({ ok: true, message: "Pregunta añadida correctamente" });
    } catch (error) {
        manejarError(res, error, "Error interno al añadir pregunta");
    }
});


// RUTA F: aqui es donde guardamos la puntuacion final de la partida
app.post("/puntuacion", (req, res) => {
    try {
        const { nombre, puntos, quesitos } = req.body;

        // Comprobamos que no falte ningún dato importante
        if (nombre === undefined || puntos === undefined || quesitos === undefined) {
            return res.status(400).json({ error: "Datos incompletos: Se requiere 'nombre', 'puntos' y 'quesitos'." });
        }

        // añadimos un nuevo registro al ranking y ordenamos este, de mayor a menor puntuación
        rankingGlobal.push({
            nombre,
            puntos,
            quesitos,
            fecha: new Date().toLocaleDateString()
        });

        rankingGlobal.sort(function(a, b) {
            return b.puntos - a.puntos;
        });
        
        // delvolvemos el ranking actualizado
        res.json({ 
            message: "Puntuación registrada con éxito", 
            ranking: rankingGlobal 
        });
    } catch (error) {
        manejarError(res, error, "Error interno al guardar la puntuación");
    }
});

///////////////////////////////////////////
/////////// FUNCIONES AUXILIARES //////////
///////////////////////////////////////////

// manejo de errores, centralizandolos todos para no repetir
function manejarError(res, error, mensajeUsuario) {
    console.error(mensajeUsuario, error);
    res.status(500).json({ error: mensajeUsuario });
}

////////////////////////////////////////////
/////////// INICIAMOS EL SERVIDOR //////////
////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Servidor Trivial escuchando en el puerto ${PORT}`);
});