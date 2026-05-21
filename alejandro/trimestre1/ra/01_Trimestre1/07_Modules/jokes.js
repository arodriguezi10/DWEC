// This module manages the jokes array and adding new jokes

// Array to store all user-added jokes
export let jokesArray = JSON.parse(localStorage.getItem("jokes")) || [];

/**
 * Adds a new joke to the array if valid.
 * @param {string} joke - The joke text entered by the user
 * @returns {boolean} - True if joke was added successfully, false otherwise
 */
export function addJoke(joke) {
    // Remove whitespace at start and end
    const trimmedJoke = joke.trim();

    // Check if joke is empty
    if (trimmedJoke === "") {
        alert("The joke cannot be empty.");
        return false;
    }

    // Check if joke already exists in the array (case-insensitive)
    const exists = jokesArray.some(j => j.toLowerCase() === trimmedJoke.toLowerCase());
    if (exists) {
        alert("This joke already exists.");
        return false;
    }

    // Add the joke to the array
    jokesArray.push(trimmedJoke);

    // Save the updated array to localStorage
    localStorage.setItem("jokes", JSON.stringify(jokesArray));

    return true;
}
