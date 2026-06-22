// 1. localStorage
// 2. api
// 3. colores

const resultado = document.getElementById("resultado");
const inputNombre = document.getElementById("nombre");
const btnBuscar = document.getElementById("buscar");
const color = document.getElementById("color");
const btnColor = document.getElementById("btnColor");
const lista = document.getElementById("lista");

btnBuscar.addEventListener("click", buscar);
btnColor.addEventListener("click", cambiarColor);

const personas = JSON.parse(localStorage.getItem("personas")) || [];

function buscar() {
  const nombre = inputNombre.value.trim();

  if (nombre === "") return;

  personas.push(nombre);

  localStorage.setItem("personas", JSON.stringify(personas));

  inputNombre.value = "";

  fetch("https://api.nationalize.io/?name=" + nombre)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar la API");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      if (data.country.length === 0) {
        resultado.textContent = "No hay datos para este nombre.";
        return;
      }

      const datos = data.country[0];

      const nombre = data.name;
      const probobilidad = datos.probability;
      const id = datos.country_id;

      resultado.innerHTML =
        nombre + "Id: " + id + "Probabilidad: " + probobilidad;
    })

    .catch((error) => {
      console.error("Error al cargar los datos: " + error);
      resultado.innerHTML = "No sea ha encotrado el nombre";
    });

  mostrar();
}

function mostrar() {
  lista.innerHTML = "";

  const ul = document.createElement("ul");

  personas.forEach((p, index) => {
    const li = document.createElement("li");

    li.textContent = `${index + 1}: ${p}`;

    ul.appendChild(li);
  });

  lista.appendChild(ul);
}

function cambiarColor() {
  const colorElegido = color.value;

  resultado.style.color = colorElegido;

  localStorage.setItem("colorPreferido", colorElegido);
}

function cargarColor() {
  const colorGuardado = localStorage.getItem("colorPreferido");

  if (colorGuardado !== null) {
    resultado.style.color = colorGuardado;
    color.value = colorGuardado;
  }
}

mostrar();
cargarColor();
