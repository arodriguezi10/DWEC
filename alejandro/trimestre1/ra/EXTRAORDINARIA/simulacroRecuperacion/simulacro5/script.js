// locaStorage
// api
// colores

const selectorColorTexto = document.getElementById("selectorColorTexto");
const btnAplicarColor = document.getElementById("btnAplicarColor");
const inputPokemon = document.getElementById("inputPokemon");
const btnCapturar = document.getElementById("btnCapturar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");
const listaCapturados = document.getElementById("listaCapturados");

btnCapturar.addEventListener("click", capturarPokemon);
btnAplicarColor.addEventListener("click", aplicarColor);

const arrayPokemons = JSON.parse(localStorage.getItem("misPokemons")) || [];

function capturarPokemon() {
  const pokemon = inputPokemon.value.trim();

  if (pokemon === "") return;

  inputPokemon.value = "";

  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then((respuesta) => {
      if (respuesta.ok === false) {
        throw new Error("Error al cargar la API");
      } else {
        return respuesta.json();
      }
    })

    .then((data) => {
      console.log(data);

      let html = `
                <div class="tarjeta">
                    <p><strong>${data.name}</strong></p>
                    <img src="${data.sprites.front_default}" alt="${data.name}"/>
                    <br>
                    <span>Nº.${data.id}</span>
                </div>
            `;

      resultadoBusqueda.innerHTML = html;

      const nuevoPokemon = {
        nombre: data.name,
        imagen: data.sprites.front_default,
      };

      arrayPokemons.push(nuevoPokemon);

      localStorage.setItem("misPokemons", JSON.stringify(arrayPokemons));

      pintarCapturados();
    })

    .catch((error) => {
      console.error("Error al cargar la API: " + error);
      resultadoBusqueda.innerHTML = "No se ha encotrado el pokemon";
    });
}

function pintarCapturados() {
  listaCapturados.innerHTML = "";

  let html = "";

  arrayPokemons.forEach((p, index) => {
    html += `
        <div class="historial-item">
            <span>${index + 1}. ${p.nombre}</span>
            <img src="${p.imagen}">
            <button class="btn-liberar" onclick="liberarPokemon(${index})">Liberar</button>
        </div>
    `;
  });

  listaCapturados.innerHTML = html;
}

function liberarPokemon(index) {
  arrayPokemons.splice(index, 1);
  localStorage.setItem("misPokemons", JSON.stringify(arrayPokemons));
  pintarCapturados();
}

function aplicarColor() {
  const color = selectorColorTexto.value;

  document.body.ATTRIBUTE_NODEstyle.body = color;

  localStorage.setItem("colorGuardado", color);
}

function cambiarColor() {
  const colorElegido = localStorage.getItem("colorGuardado");

  if (colorElegido !== null) {
    document.body.style.body = colorElegido;
    selectorColorTexto.value = colorElegido;
  }
}

pintarCapturados();
cambiarColor();
