//capturamos los elementos del DOM
const favoritoMostrado = document.getElementById("favoritoMostrado");
const inputFavorito = document.getElementById("inputFavorito");
const btnGuardar = document.getElementById("btnGuardar");
const btnCargar = document.getElementById("btnCargar");
const contenedorUsuarios = document.getElementById("contenedorUsuarios");

//addEventListeners
btnGuardar.addEventListener('click', guardar)
btnCargar.addEventListener('click', cargar)

function cargarFavorito() {
  const usuarioFavorito = localStorage.getItem("nombre");

  if (usuarioFavorito !== null) {
    favoritoMostrado.textContent = usuarioFavorito;
  }
}

cargarFavorito();


function guardar(){
    //validamos que el input no este vacío
    if(inputFavorito.value.trim() === "" ){
        alert("Debe introducir un nombre");
        return
    }

    localStorage.setItem("nombre", inputFavorito.value)

    favoritoMostrado.textContent = inputFavorito.value;

    inputFavorito.value = "";
}

function cargar(){
    fetch("https://jsonplaceholder.typicode.com/users")

    .then(respuesta => respuesta.json())

    .then(usuarios => {
        
        let resultado = "";

        usuarios.forEach(u => {
            resultado += `<p><strong>${u.name} ${u.email}</strong></p>`
        });

        contenedorUsuarios.innerHTML = resultado;
    })

    .catch(error => {
        console.error("Error", error);
        contenedorUsuarios.innerHTML = `<p>Ocurrió un error al cargar</p>`
    })
}