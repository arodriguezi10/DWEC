//recogemos los elementos del DOM
const btnCargar = document.getElementById('btnCargar');
const contenedorPosts = document.getElementById('contenedorPosts');

//evento para el boton
btnCargar.addEventListener('click', obtenerPost);

function obtenerPost() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(respuesta => respuesta.json())

    .then(publicaciones => {
      let html = '';

      const posts = publicaciones.slice(0, 5);

      posts.forEach(p => {
        html += `<p><strong>${p.title}</strong></p>`;
      });

      contenedorPosts.innerHTML = html;
    })

    .catch(error => {
      console.error("Error al mostrar los datos: ", error);
      contenedorPosts.innerHTML = '<p>Ocurrió un error al cargar.</p>';
    });
}


