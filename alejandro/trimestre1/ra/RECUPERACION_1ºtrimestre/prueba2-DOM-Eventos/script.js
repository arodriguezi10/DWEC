//capturar los elementos del DOM
const input = document.getElementById("nuevoObjetivo");
const btnAnadir = document.getElementById("btnAnadir");
const objetivos = document.getElementById("listaObjetivos");

btnAnadir.addEventListener("click", añadir);

function añadir() {
  //validacion
  if (input.value.trim() === "") {
    alert("El campo debe rellenarse");
    return;
  }

  const li = document.createElement("li");

  li.textContent = input.value;

  objetivos.appendChild(li);

  input.value = "";
}
