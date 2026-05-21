const container = document.getElementById('container');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(function(data){
        data.forEach(user => {
            container.innerHTML += `
                <p>
                    ${user.name} <br>
                    ${user.email}
                </p>
            `;
        });
    })
    .catch(function(error){
            container.innerHTML += `
                <h1>
                    No se a podido cargar la informacion
                </h1>
            `;
    });

//------------------------------------------------------------------

const texto = document.getElementById("inputTarea");
const boton = document.getElementById("btnAñadir");
const lista = document.getElementById("lista");
const ul = document.createElement("ul");

lista.appendChild(ul);

boton.addEventListener("click", añadir);

let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Cargar tareas si existen
mostrar();

function añadir(){

    tareas.push(texto.value);
    texto.value = "";

    mostrar();
    
    console.log(tareas);
}

function mostrar(){

    ul.innerHTML = "";

    localStorage.setItem('tareas', JSON.stringify(tareas));

    tareas.forEach((tarea, index)=>{

        const li = document.createElement("li");
        li.innerHTML = tarea;
        ul.appendChild(li);

        // boton para eliminar tarea
        li.innerHTML += `
            <button type="button" onclick="eliminar(${index}, this)">X</button>
        `;
    });

    lista.appendChild(ul);
}

// eliminar tarea
function eliminar(indice, btnEliminar) {
    tareas.splice(indice, 1); 
    localStorage.setItem('tareas', JSON.stringify(tareas));
    btnEliminar.parentElement.remove();         
}




