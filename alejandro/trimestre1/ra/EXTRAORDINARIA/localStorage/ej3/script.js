const inputNombre = document.getElementById("inputNombre");
const inputPuesto = document.getElementById("inputPuesto");
const btnGuardarPerfil = document.getElementById("btnGuardarPerfil");
const tarjetaPerfil = document.getElementById("tarjetaPerfil");

btnGuardarPerfil.addEventListener("click", guardarPerfil);

function guardarPerfil() {
  const nombre = inputNombre.value.trim();
  const puesto = inputPuesto.value.trim();

  if (nombre === "" || puesto === "") return;

  const usuario = {
    nombre: nombre,
    puesto: puesto
  };

  localStorage.setItem("perfilUsuario", JSON.stringify(usuario));

  inputNombre.value = "";
  inputPuesto.value = "";

  mostrarPerfil();
}

function mostrarPerfil() {
  const perfilUsuario = JSON.parse(localStorage.getItem("perfilUsuario"));

  let html = "";

  if (perfilUsuario !== null) {
    html += `
        <h3>${perfilUsuario.nombre}</h3>
        <p>${perfilUsuario.puesto}</p>
    `;

    tarjetaPerfil.innerHTML = html;
  } else {
    return;
  }
}
