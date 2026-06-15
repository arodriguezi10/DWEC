const textoConsejo = document.getElementById("textoConsejo");
const btnNuevoConsejo = document.getElementById("btnNuevoConsejo");

btnNuevoConsejo.addEventListener("click", obtenerConsejo);

function obtenerConsejo() {
  fetch("https://api.adviceslip.com/advice")
    .then((respuesta) => respuesta.json())

    .then((consejo) => {
      console.log(consejo);
      const consejoTexto = consejo.slip.advice;

      textoConsejo.textContent = consejoTexto;

      textoConsejo.classList.remove("error");
    })

    .catch((error) => {
      console.error("Error al mostrar los datos: ", error);
      textoConsejo.innerHTML = "<p>Error al cargar el consejo.</p>";
      textoConsejo.classList.add("error");
    });
}
