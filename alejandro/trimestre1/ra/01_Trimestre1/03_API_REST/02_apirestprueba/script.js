//Name Andrés Pérez Domínguez
//function fetchData() {
    
// Variables and constants 
const output_apd = document.getElementById("salida");
const keyword_apd = document.getElementById("clave").value.toLowerCase();
const radios_apd = document.getElementsByName("opcion");
let results_apd = [];

// Comment (Q1): const is used for variables that won't be reassigned;
// and let is for those that may change.

// Determine the selected mode based on the checked radio button
let mode_apd = "name";
for (let i = 0; i < radios_apd.length; i++) {
  if (radios_apd[i].checked) {
    mode_apd = radios_apd[i].value;
  }
}
// Connecting to the API 
fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
            // Comment (Q2): response.json() converts the received HTTP data into a JavaScript object.
        .then(function(data) {
            output_apd.innerHTML = "";
            for (let user of data) {
                let value = user[mode_apd];
                if (value.toLowerCase().includes(keyword_apd)) {
                    results_apd.push(value);
                    output_apd.innerHTML += `<p>${value}</p>`;
                }
            }
            output_apd.innerHTML += `<p>total: ${results_apd.length}</p>`;
            // Comment (Q3): innerHTML allows writing HTML tags directly inside an element.
        });
        // Comment (Q4): An anonymous function has no name and is used directly inside another statement.

//}

