export class Quiz {
    questions;
    #score = 0;
    #questionIndex = 0;
    #results = []; 

    constructor(questions) {
        this.questions = questions;
    }

    get score() { return this.#score; }
    get questionIndex() { return this.#questionIndex; }
    get results() { return this.#results; }

    getCurrentQuestion() {
        return this.questions[this.#questionIndex];
    }

    guess(answer) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = currentQuestion.isCorrectAnswer(answer);

        if (isCorrect) {
            this.#score++; 
        }

        this.#results.push({
            questionText: currentQuestion.text,
            userAnswer: answer,
            correctAnswer: currentQuestion.answer,
            isCorrect: isCorrect
        });

        this.#questionIndex++;
    }

    isEnded() {
        return this.#questionIndex === this.questions.length;
    }
}