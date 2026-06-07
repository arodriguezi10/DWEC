//recogemos los elementos del dom
const nombreMostrado = document.getElementById("nombreMostrado");
const inputNombre = document.getElementById("inputNombre");
const btnGuardar = document.getElementById("btnGuardar");
const btnBorrar = document.getElementById("btnBorrar");

btnGuardar.addEventListener("click", guardar);
btnBorrar.addEventListener("click", borrar);

function guardar() {
  //validaciones
  if (inputNombre.value.trim() === "") {
    alert("Debe introducir un nombre");
    return;
  }

  localStorage.setItem("nombre", JSON.stringify(inputNombre.value));

  nombreMostrado.textContent = inputNombre.value;

  inputNombre.value = "";
}

function borrar() {
  localStorage.removeItem("nombre", JSON.stringify(nombreMostrado.value));

  nombreMostrado.textContent = "Ninguno";
}

function cargarDatosIniciales() {
  const nombreGuardado = localStorage.getItem("nombre");

  if (nombreGuardado !== null) {
    nombreMostrado.textContent = nombreGuardado;
  }
}

cargarDatosIniciales();