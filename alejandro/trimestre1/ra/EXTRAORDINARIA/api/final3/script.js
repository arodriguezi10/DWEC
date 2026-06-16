const inputUsuario = document.getElementById("inputUsuario");
const btnBuscarDev = document.getElementById("btnBuscarDev");
const resultadoPerfil = document.getElementById("resultadoPerfil");

btnBuscarDev.addEventListener("click", buscarPerfil);

function buscarPerfil() {
  const usuario = inputUsuario.value.trim().toLowerCase();

  if (inputUsuario.value === "") {
    alert("El campo no puede estar vacio");
    return;
  }

  fetch("https://api.github.com/users/" + usuario)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("No se a encontrado");
      }
      return respuesta.json();
    })

    .then((data) => {
      console.log(data);

      let html = "";

      html += `
            <div class="resultado">
                <img src="${data.avatar_url}" alt="Avatar de ${data.login}">
                <h2>${data.name || data.login}</h2>
                <p>Repositorios: ${data.public_repos}</p>
            </div>
        `;

      resultadoPerfil.innerHTML = html;
    })

    .catch((error) => {
      console.error("Error al cargar la API" + error);
      resultadoPerfil.innerHTML = "No existe el perfil que buscas";
    });
}
