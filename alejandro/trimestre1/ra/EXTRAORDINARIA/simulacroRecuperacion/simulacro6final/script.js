// 1. localstorage
// 2. api
// 3. colores

const selectorBorde = document.getElementById("selectorBorde");
const btnAplicarBorde = document.getElementById("btnAplicarBorde");
const inputUser = document.getElementById("inputUser");
const btnBuscarUser = document.getElementById("btnBuscarUser");
const resultadoFicha = document.getElementById("resultadoFicha");
const listaConsultados = document.getElementById("listaConsultados");

btnAplicarBorde.addEventListener("click", aplicarBorde);
btnBuscarUser.addEventListener("click", buscarUser);

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function buscarUser() {
  const nombreUsuario = inputUser.value.trim();

  if (nombreUsuario === "") return;

  inputUser.value = "";

  //api
  fetch("https://api.github.com/users/" + nombreUsuario)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar la API");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      //api - siendo un objeto
      const avatar = data.avatar_url;
      const name = data.name;
      const repositorios = data.public_repos;

      resultadoFicha.innerHTML = `
        <div class="ficha">
            Nombre: ${name} <br>
            Avatar: <img src="${avatar}"/>
            Repositorios: ${repositorios}
        </div>
      `;
      // hasta aqui

      const usuarioGuardado = {
        nombre: data.name,
        imagen: data.avatar_url,
      };

      usuarios.push(usuarioGuardado);

      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      pintarUser();
    })

    .catch((error) => {
      console.error("Error en la API: " + error);
      resultadoFicha.innerHTML = "Ese nombre no esta disponible";
    });
}

function pintarUser() {
  listaConsultados.innerHTML = "";

  let html = "";

  usuarios.forEach((u, index) => {
    html += `  
            <div class="item-guardado">
                <p>${index + 1}. ${u.nombre}</p>
                <img src="${u.imagen}"/>
            </div>
        `;
  });

  listaConsultados.innerHTML = html;
}

function aplicarBorde() {
  const colorSeleccionado = selectorBorde.value;

  resultadoFicha.style.border = "2px solid " + colorSeleccionado;

  localStorage.setItem("colorElegido", colorSeleccionado);
}

function cambiarColor() {
  const colorElegido = localStorage.getItem("colorElegido");

  if (colorElegido !== null) {
    resultadoFicha.style.border = "2px solid " + colorSeleccionado;
    selectorBorde.value = colorElegido;
  }
}

pintarUser();
cambiarColor();
