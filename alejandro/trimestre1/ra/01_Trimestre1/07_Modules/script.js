// Import modules
import { jokesArray, addJoke } from './jokes.js';
import { fetchJoke } from './api.js';
import { setupColorButton } from './color.js';

// Get DOM elements
const jokeList = document.getElementById("lista");       // Container for user-added jokes
const apiJoke = document.getElementById("cita");        // H2 element for the API joke
const jokeInput = document.getElementById("texto");     // Input field for new jokes
const addButton = document.getElementById("btnAdd");    // Button to add a new joke
const colorButton = document.getElementById("btnColor"); // Button to apply selected color
const colorSelect = document.getElementById("color");    // Select element to choose color

/**
 * Display all jokes saved in the array
 */
function showJokes() {
    jokeList.innerHTML = ""; // Clear previous list

    if (jokesArray.length === 0) {
        jokeList.textContent = "No jokes saved.";
        return;
    }

    const ul = document.createElement("ul");
    jokesArray.forEach((joke, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}: ${joke}`;
        ul.appendChild(li);
    });
    jokeList.appendChild(ul);
}

// Initially display saved jokes
showJokes();

// Add a new joke when the "Add" button is clicked
addButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const newJoke = jokeInput.value; // Get value from input
    if (addJoke(newJoke)) {          // Validate and add joke
        jokeInput.value = "";         // Clear input
        showJokes();                  // Update displayed list
    }
});

// Fetch and display a random Chuck Norris joke
fetchJoke(apiJoke);

// Set up the color change button functionality
setupColorButton(colorButton, colorSelect, apiJoke);
