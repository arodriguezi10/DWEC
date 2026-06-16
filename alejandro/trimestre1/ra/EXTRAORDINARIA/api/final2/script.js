const btnCargarProductos = document.getElementById("btnCargarProductos");
const contenedorProductos = document.getElementById("contenedorProductos");

btnCargarProductos.addEventListener("click", cargarCatalogo);

function cargarCatalogo() {
  fetch("https://fakestoreapi.com/products/category/electronics")
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar");
      }
      return respuesta.json();
    })

    .then((data) => {
      console.log(data);

      let html = "";

      data.forEach((producto) => {
        html += `
            <div class="producto">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>${producto.price} €</p>
            </div>
        `;
      });

      contenedorProductos.innerHTML = html;
    })

    .catch((error) => {
      console.error("Error al cargar la API: " + error);
      contenedorProductos.innerHTML = "Catalogo no disponible";
    });
}
