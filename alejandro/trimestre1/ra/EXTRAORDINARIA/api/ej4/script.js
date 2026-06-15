const fotoPerfil = document.getElementById("fotoPerfil");
const nombrePerfil = document.getElementById("nombrePerfil");
const emailPerfil = document.getElementById("emailPerfil");
const btnGenerarPerfil = document.getElementById("btnGenerarPerfil");

btnGenerarPerfil.addEventListener("click", generarPerfil);

function generarPerfil() {
  fetch("https://randomuser.me/api/")
    .then((respuesta) => respuesta.json())

    .then((usuario) => {
      console.log(usuario);

      const datos = usuario.results[0];

      const nombre = `${datos.name.first} ${datos.name.last}`;
      const foto = datos.picture.large
      const email = datos.email

      nombrePerfil.innerHTML = nombre
      fotoPerfil.src = foto
      emailPerfil.innerHTML = email
    })

    .catch((error) => {
      console.log("Error al cargar: " + error);
    });
}
