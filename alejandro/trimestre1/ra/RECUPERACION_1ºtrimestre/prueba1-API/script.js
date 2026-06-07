// 1. REFERENCIAS AL DOM
const formulario = document.getElementById('formulario');
const inputClave = document.getElementById('clave');
const opcionesRadio = document.getElementsByName('opcion');
const salida = document.getElementById('salida');

// 2. VARIABLES DE ESTADO Y CONFIGURACIÓN
let resultados = [];
const palabraClave = "Leanne";
const modo = "name";

// 3. PETICIÓN API Y LÓGICA
function consultarAPI() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            let contenidoHTML = '';
            resultados = [];

            usuarios.forEach(usuario => {
                // Obtenemos el valor de la propiedad ("name" o "email")
                const valorPropiedad = usuario[modo];

                // Comprobamos que la propiedad exista y contenga la palabra clave
                if (valorPropiedad && valorPropiedad.includes(palabraClave)) {
                    resultados.push(usuario);
                    contenidoHTML += `<p><strong>Nombre:</strong> ${usuario.name} | <strong>Email:</strong> ${usuario.email}</p>`;
                }
            });

            contenidoHTML += `<p><em>Total de resultados encontrados: ${resultados.length}</em></p>`;
            salida.innerHTML = contenidoHTML;
        })
        .catch(error => {
            console.error('Error en la petición:', error);
            salida.innerHTML = '<p>Error al obtener los datos de la API.</p>';
        });
}

// Ejecución
consultarAPI();