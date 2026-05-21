import { Quiz } from './quiz.js';
import { UI } from './ui.js';
import { Question } from './questions.js';

const ui = new UI();

const renderPage = (quiz, ui) => {
    if (quiz.isEnded()) {
        ui.showScore(quiz.score, quiz.results);
    } else {
        const currentQuestion = quiz.getCurrentQuestion();
        
        ui.showQuestion(currentQuestion.text);
        ui.showProgress(quiz.questionIndex, quiz.questions.length);

        ui.showChoices(currentQuestion.choices, (currentChoice) => {
            quiz.guess(currentChoice);
            renderPage(quiz, ui); 
        });
    }
};

const startQuizForTopic = async (topic) => {
    try {
        const response = await fetch(`/api/questions/${topic}`);
        const rawQuestions = await response.json();

        const questions = rawQuestions.map(
            q => new Question(q.text, q.choices, q.answer)
        );

        const quiz = new Quiz(questions);
        ui.toggleScreens(true);
        renderPage(quiz, ui);
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
    }
};

async function main() {
    try {
        const response = await fetch('http://localhost:3000/api/topic');
        const topics = await response.json();
        

       const questions = rawQuestions.map(
            q => new Question(q.text, q.choices, q.answer)
        );

       /* ui.showTopics(topics, (selectedTopic) => {
            startQuizForTopic(selectedTopic);
        });*/
    } catch (error) {
        console.error("Error al cargar los temas:", error);
    }
};

main();