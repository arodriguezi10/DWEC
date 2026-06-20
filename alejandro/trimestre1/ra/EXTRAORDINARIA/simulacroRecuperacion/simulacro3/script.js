// 1. localStorage
// 2. api
// 3. colores

const inputNombre = document.getElementById("inputNombre");
const btnAnalizar = document.getElementById("btnAnalizar");
const panelResultado = document.getElementById("panelResultado");
const selectorTamano = document.getElementById("selectorTamano");
const btnAplicarTamano = document.getElementById("btnAplicarTamano");
const listaConsultas = document.getElementById("listaConsultas");

btnAnalizar.addEventListener("click", analizar);
btnAplicarTamano.addEventListener("click", aplicarTamano);

const arrayNombres = JSON.parse(localStorage.getItem("arrayNombres")) || [];

function analizar() {
  const nombre = inputNombre.value.trim();

  if (nombre === "") return;

  inputNombre.value = "";

  //api
  fetch("https://api.genderize.io/?name=" + nombre)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar la api");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      const nommbre = data.name;
      const sexo = data.gender;
      const probabilidad = data.probability;

      panelResultado.innerHTML = `
        Nombre: ${nombre} | Género: ${sexo} | Fiabilidad: ${probabilidad}
      `;

      arrayNombres.push(nombre);

      localStorage.setItem("arrayNombres", JSON.stringify(arrayNombres));

      mostrar();
    })

    .catch((error) => {
      console.error("Error al cargar la API: " + error);
      panelResultado.innerHTML = "No se ha encontrado el nombre";
    });

  
}

function mostrar() {
  listaConsultas.innerHTML = "";

  let html = "";

  arrayNombres.forEach((n, index) => {
    html += `
            <li>
                ${n} 
                <button class="btn-borrar" onclick="borrarNombre(${index})">Delete</button>
            </li>
        `;
  });

  listaConsultas.innerHTML = html;
}

function borrarNombre(index) {
  arrayNombres.splice(index, 1);

  localStorage.setItem("arrayNombres", JSON.stringify(arrayNombres));

  mostrar();
}

function aplicarTamano() {
  const tamano = selectorTamano.value;

  panelResultado.style.fontSize = tamano;

  localStorage.setItem("tamanoTexto", tamano);
}

function cambiarTamano() {
  const tamanoRecogido = localStorage.getItem("tamanoTexto");

  if (tamanoRecogido !== null) {
    panelResultado.style.fontSize = tamanoRecogido;
    selectorTamano.value = tamanoRecogido;
  }
}

mostrar();
cambiarTamano();
