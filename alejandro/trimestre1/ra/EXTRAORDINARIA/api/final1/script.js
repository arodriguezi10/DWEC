const inputBusqueda = document.getElementById("inputBusqueda");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorResultado = document.getElementById("contenedorResultado");

btnBuscar.addEventListener("click", buscar);

function buscar() {
    const textoBuscado = inputBusqueda.value.trim().toLowerCase();
    
    // Evita hacer peticiones al servidor si el input está vacío
    if (textoBuscado === "") {
        return;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/" + textoBuscado)
        .then((respuesta) => {
            if (respuesta.ok === false) {
                throw new Error("No encontrado");
            }
            // Obligatorio usar return al abrir llaves
            return respuesta.json(); 
        })
        .then((data) => {
            // Accedemos directamente a las propiedades del objeto único
            let html = `
                <div class="tarjeta">
                    <p><strong>${data.name}</strong></p>
                    <img src="${data.sprites.front_default}" alt="${data.name}"/>
                    <br>
                    <span>Nº.${data.id}</span>
                </div>
            `;

            contenedorResultado.innerHTML = html;
        })
        .catch((error) => {
            console.error("Error: " + error);
            contenedorResultado.innerHTML = `<p class="error">Pokémon no encontrado.</p>`;
        });
}