// localStorage
// api
// colores

const inputNombre = document.getElementById("inputNombre");
const btnPredecir = document.getElementById("btnPredecir");
const contenedorResultado = document.getElementById("contenedorResultado");
const selectorFondo = document.getElementById("selectorFondo");
const btnAplicarFondo = document.getElementById("btnAplicarFondo");
const listaConsultas = document.getElementById("listaConsultas");

btnPredecir.addEventListener("click", predecir);

btnAplicarFondo.addEventListener("click", aplicarFondo);

const nombres = JSON.parse(localStorage.getItem("historiaNombres")) || [];

function predecir() {
  const nombre = inputNombre.value.trim();
  if (nombre === "") return; //validar el input, para que no puede estar vacio

  nombres.push(nombre);

  localStorage.setItem("historiaNombres", JSON.stringify(nombres));

  inputNombre.value = "";

  //api
  fetch("https://api.agify.io/?name=" + nombre)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar los datos");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      const nombre = data.name;
      const edad = data.age;
      const count = data.count;

      contenedorResultado.innerHTML =
        "El nombre " + nombre + " tiene una edad estimada de " + edad + " años";
    })

    .catch((error) => {
      console.error("Error al cargar la API: " + error);

      contenedorResultado.innerHTML = "No hay datos asociados a ese nombre";
    });

  pintarLista();
}

function pintarLista() {
  listaConsultas.innerHTML = "";

  const ul = document.createElement("ul");

  nombres.forEach((n, index) => {
    const li = document.createElement("li");

    li.textContent = `${index + 1}. ${n}`;

    ul.appendChild(li);
  });

  listaConsultas.appendChild(ul);
}

function aplicarFondo() {
  // 1. recogemos el valor delcolor
  // 2. le damos estilo al contenedor
  // 3. guardamos el color en el localStorage

  const colorElegido = selectorFondo.value;

  contenedorResultado.style.color = colorElegido;

  localStorage.setItem("colorGuardado", JSON.stringify(colorElegido));
}

function cambiarColor() {
  // 1. recogemos el color del localStorage
  // 2. si hay color se lo apalicamos al contenedor
  // 3. actualizamos el value para que coincidan

  const colorRecogido = localStorage.getItem("colorGuardado");

  if (colorRecogido !== null) {
    contenedorResultado.style.color = colorRecogido;
    selectorFondo.value = colorRecogido;
  }
}

pintarLista();

cambiarColor();
