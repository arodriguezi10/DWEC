const frase = document.getElementById("frase");
const input = document.getElementById("inputTarea");
const btnAdd = document.getElementById("btnAdd");
const lista = document.getElementById("lista");

// Recuperar tareas guardadas en localStorage
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(function (data) {
        frase.innerHTML = ""; // limpiar div
        for (let user of data) {
            frase.innerHTML += `<p>${user.name} - ${user.email}</p>`;
        }
    })
    .catch(() => {
        frase.innerHTML = "No se pudo cargar la información.";
    });

function mostrarTareas() {
    lista.innerHTML = "";
    tareas.forEach((tarea) => {
        // Usamos onclick directamente en el botón
        lista.innerHTML += `
            <li class="item">
                ${tarea}
                <button onclick="this.parentElement.remove()">Delete</button> </li>
            
        `;
    });

    //borramos en el dom pero no en el array ni en el localstorage
}

mostrarTareas();


btnAdd.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) return;

    tareas.push(texto);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
    input.value = "";
});