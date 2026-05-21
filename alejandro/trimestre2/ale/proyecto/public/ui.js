export class UI {
    showQuestion(text) {
        const questionTitle = document.getElementById("question");
        if (questionTitle) questionTitle.innerText = text;
    }

    showChoices(choices, callback) {
        const choicesContainer = document.getElementById("choices");
        if (!choicesContainer) return;

        choicesContainer.innerHTML = "";

        for (let i = 0; i < choices.length; i++) {
            const button = document.createElement("button");
            button.innerText = choices[i];
            button.className = "button"; 
            button.addEventListener("click", () => callback(choices[i]));
            choicesContainer.appendChild(button);
        }
    }

    showScore(score, results) {
        const element = document.getElementById("quiz");
        if (!element) return;

        let quizEndHTML = `
            <h1>Resultado Final</h1>
            <h2 id="score">Tu puntuación es: ${score} de ${results.length}</h2>
            <div class="results-container">
        `;

        for (let i = 0; i < results.length; i++) {
            const res = results[i];
            const statusClass = res.isCorrect ? "correct" : "incorrect";
            const statusText = res.isCorrect ? "Correcto" : "Incorrecto";

            quizEndHTML += `
                <div class="result-card ${statusClass}">
                    <p><strong>Pregunta:</strong> ${res.questionText}</p>
                    <p><strong>Tu respuesta:</strong> ${res.userAnswer} - <span>${statusText}</span></p>
                    ${!res.isCorrect ? `<p><strong>Respuesta correcta:</strong> ${res.correctAnswer}</p>` : ''}
                </div>
            `;
        }

        quizEndHTML += `
            </div>
            <button class="button" style="margin-top: 24px;" onclick="location.reload()">Jugar de nuevo</button>
        `;

        element.innerHTML = quizEndHTML;
    }

    showProgress(currentIndex, total) {
        const progressElement = document.getElementById("progress");
        if (progressElement) {
            progressElement.innerHTML = `Pregunta ${currentIndex + 1} de ${total}`;
        }
    }

    showTopics(topics, callback) {
        const topicsContainer = document.getElementById("topics");
        topicsContainer.innerHTML = "";

        topics.forEach(topic => {
            const button = document.createElement("button");
            button.innerText = topic;
            button.className = "button";
            button.addEventListener("click", () => callback(topic));
            topicsContainer.appendChild(button);
        });
    }

    toggleScreens(showQuizScreen) {
        const menuScreen = document.getElementById("menu");
        const quizScreen = document.getElementById("quiz");

        if (showQuizScreen) {
            menuScreen.style.display = "none";
            quizScreen.style.display = "block";
        } else {
            menuScreen.style.display = "block";
            quizScreen.style.display = "none";
        }
    }
}