// This module handles changing the color of the joke

/**
 * Sets up the color change button to apply the selected color to the target element
 * and save the choice to localStorage.
 * @param {HTMLElement} button - The button that triggers the color change
 * @param {HTMLSelectElement} select - The select element to pick a color
 * @param {HTMLElement} target - The element whose color will be changed
 */
export function setupColorButton(button, select, target) {
    // Load saved color from localStorage
    const savedColor = localStorage.getItem("jokeColor");
    if (savedColor) {
        target.style.color = savedColor;
        select.value = savedColor;
    }

    // Apply color when button is clicked
    button.addEventListener("click", () => {
        const color = select.value;
        target.style.color = color;

        // Save color choice in localStorage
        localStorage.setItem("jokeColor", color);
    });
}
