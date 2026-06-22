// 1. localstorage
// 2. api
// 3. colores

const inputBusqueda = document.getElementById("inputBusqueda");
const btnBuscar = document.getElementById("btnBuscar");
const resultadosBusqueda = document.getElementById("resultadosBusqueda");
const areaFavoritos = document.getElementById("areaFavoritos");
const selectorFondo = document.getElementById("selectorFondo");
const btnAplicarFondo = document.getElementById("btnAplicarFondo");
const listaDeseos = document.getElementById("listaDeseos");

btnBuscar.addEventListener("click", buscarProducto);
btnAplicarFondo.addEventListener("click", seleccionarFondo);

const arrayProductos = JSON.parse(localStorage.getItem("arrayProductos")) || [];

function buscarProducto() {
  const producto = inputBusqueda.value.trim();

  if (producto === "") return;

  inputBusqueda.value = "";

  //api
  fetch("https://fakestoreapi.com/products")
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar la API");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      const filtrado = data.filter((data) => {
        return data.title.toLowerCase().includes(producto.toLowerCase());
      });

      let html = "";

      filtrado.forEach((f) => {
        html += `
            <h3>Producto: ${f.id}</h3> <br>
            ${f.title}<br>
            ${f.price}<br>
            ${f.description}<br>
        `;
      });

      resultadosBusqueda.innerHTML = html;

      arrayProductos.push(producto);

      localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

      pintarProductos();
    })

    .catch((error) => {
      console.error("Error al cargar la API: " + error);
      resultadosBusqueda.innerHTML = "No se ha encontrado el producto";
    });
}

function pintarProductos() {
  //limpiamos la lista
  listaDeseos.innerHTML = "";

  let html = "";

  arrayProductos.forEach((p, index) => {
    html += `
            <li>
                ${index + 1}. ${p} 
                <button class="btn-borrar" onclick="borrarProducto(${index})">Borrar</button>
            </li>
        `;
  });

  listaDeseos.innerHTML = html;
}

function borrarProducto(index) {
  arrayProductos.splice(index, 1);

  localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

  //pintamos otra vez los productos
  pintarProductos();
}

function seleccionarFondo() {
  const fondo = selectorFondo.value;

  areaFavoritos.style.backgroundColor = fondo;

  localStorage.setItem("colorElegido", JSON.stringify(fondo));
}

function aplicarFondo() {
  const colorElegido = localStorage.getItem("colorElegido");

  if (colorElegido !== null) {
    areaFavoritos.style.backgroundColor = colorElegido;
    selectorFondo.value = colorElegido;
  }
}

pintarProductos();
aplicarFondo();
