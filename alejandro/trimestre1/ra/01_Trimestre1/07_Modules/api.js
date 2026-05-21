// This module handles fetching a joke from the Chuck Norris API

/**
 * Fetches a random Chuck Norris joke from the API and displays it in the given element.
 * @param {HTMLElement} element - The element where the joke will be displayed
 */
export function fetchJoke(element) {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            // Display the joke in the element
            element.textContent = data.value;
        })
        .catch(() => {
            // Show error message if fetch fails
            element.textContent = "Error: Could not load a joke from the API.";
        });
}
