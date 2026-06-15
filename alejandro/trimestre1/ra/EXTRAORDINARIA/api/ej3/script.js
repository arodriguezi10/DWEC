const btnGenerar = document.getElementById("btnGenerar");
const imagen = document.getElementById("imagenPerro");

btnGenerar.addEventListener("click", generar);

function generar() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((respuesta) => respuesta.json())

    .then((imagen) => {
      console.log(imagen);

      const resultado = imagen.message;

      imagen.src = resultado;
    })

    .catch(error => {
        console.error("Error: " + error)
    })
}
