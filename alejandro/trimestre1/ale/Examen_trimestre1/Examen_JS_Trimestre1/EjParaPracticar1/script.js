const container = document.getElementById("container");

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json =>
        printUser(json)
    )
    .catch(error =>{
        document.getElementById('error').textContent =
        'Error al obtener los datos: ' + error;
    });

function printUser(data){

    const primerosCinco = data.slice(0, 5);

    for(let i=0; i<primerosCinco.length; i++){

        const d = primerosCinco[i]

        container.innerHTML += `

            <h3>
                ${d.title};
            </h3>
            <p>
                ${d.body};
            </p>
        `;
    }
}

//------------------------------------------------------------------

const texto = document.getElementById('InputCompra');
const botonAñadir = document.getElementById('btnAñadir');
const lista = document.getElementById("lista");
const ul = document.createElement("ul");
const botonBorrar = document.getElementById("btnBorrar")

lista.appendChild(ul);

botonAñadir.addEventListener('click', añadir);
botonBorrar.addEventListener('click', borrar);


let compra = JSON.parse(localStorage.getItem('compra')) || []; // Cargar tareas si existen
mostrar();

function añadir(){

    compra.push(texto.value);
    texto.value = "";

    //Llamar a mostar()

    mostrar();
    console.log(compra);
}

function mostrar(){

    ul.innerHTML = "";

    localStorage.setItem('compra', JSON.stringify(compra));

    compra.forEach(producto =>{
        const li = document.createElement('li');
        li.innerHTML = producto;
        ul.appendChild(li);
    });

}

function borrar(){
    compra=[];
    mostrar();
}

