# Chuck Norris Jokes Project

A simple web project that allows users to:

- Fetch a random Chuck Norris joke from an API.
- Add their own jokes to a personal list.
- Avoid duplicate jokes.
- Change the color of the API joke using a button.
- Store jokes and selected color in `localStorage` for persistence.

---

## Project Structure

chuck-norris-jokes/
├── index.html # Main HTML file
├── script.js # Main JS file importing modules
├── jokes.js # Module for handling jokes array, addJoke function
├── api.js # Module for fetching Chuck Norris jokes
├── color.js # Module for handling color changes
├── README.md # Project description and instructions
└── .gitignore # Files to ignore in GitHub (optional)

yaml
Copiar código

---

## Modules

This project uses JavaScript ES6 modules:

- `jokes.js`: Handles the main array of jokes and the `addJoke` function.
- `api.js`: Fetches random Chuck Norris jokes from `https://api.chucknorris.io/jokes/random`.
- `color.js`: Handles the color change functionality for the API joke.

In `index.html`, the main script is imported as a **module**:

```html
<script type="module" src="script.js" defer></script>
type="module" allows using import and export statements in script.js.

How to Use
Open index.html in a modern browser.

The API joke is loaded automatically into the <h2> element.

Use the color dropdown and Change Color button to set the color of the API joke.

Add your own jokes in the input field and click Add.

Duplicate jokes are not allowed; an alert will notify the user.

All jokes and color preferences are saved in localStorage, so they persist on page reload.

Example of Usage
Adding a new joke:

Type your joke in the input field.

Click Add.

The joke appears in the list below.

Changing the color of the API joke:

Select a color from the dropdown.

Click Change Color.

The color of the API joke <h2> updates and is saved in localStorage.

Notes
The project uses fetch to call the Chuck Norris API.

Errors during API fetching are handled gracefully, displaying an error message if needed.

The project demonstrates modular JavaScript, local storage usage, and DOM manipulation.


