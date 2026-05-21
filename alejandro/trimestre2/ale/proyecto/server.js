import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
//import { questionsByTopic } from './data.js';

import {arraydepreguntas} from './questions.js'; //Un objeto con 4 arrays 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/topics', (req, res) => {
    const topics = Object.keys(questionsByTopic);
    res.json(topics);
});

app.get('/api/questions/:topic', (req, res) => {
    const topic = req.params.topic;
    //const allTopicQuestions = questionsByTopic[topic];
    const preguntas =arraydepreguntas.

    if (!allTopicQuestions) {
        return res.status(404).json({ error: "Tema no encontrado" });
    }

    const shuffledQuestions = [...allTopicQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 5);

    res.json(selectedQuestions);
});

// -----------------------------
// START SERVER
// -------------------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});