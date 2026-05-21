export class Question {
    #text; 
    #choices;
    #answer;

    constructor(text, choices, answer) {
        this.#text = text;
        this.#choices = choices;
        this.#answer = answer;
    }

    get text() { return this.#text; }
    get choices() { return this.#choices; }
    get answer() { return this.#answer; }

    isCorrectAnswer(choice) {
        return this.#answer === choice;
    }
}