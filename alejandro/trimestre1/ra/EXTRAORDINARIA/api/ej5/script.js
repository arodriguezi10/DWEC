const btnCargarPeliculas = document.getElementById("btnCargarPeliculas");
const listaPeliculas = document.getElementById("listaPeliculas");

btnCargarPeliculas.addEventListener("click", cargarPeliculas);

function cargarPeliculas() {
  fetch("https://ghibliapi.vercel.app/films")
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      const fecha = data.filter((data) => {
        return data.release_date >= 2000;
      });

      let html = "";

      fecha.forEach((f) => {
        html += `
                <li><strong>Titulo: ${f.title} (${f.release_date}) - ${f.director}</strong></li>
            `;
      });

      listaPeliculas.innerHTML = html;
    })

    .catch((error) => {
      console.error("Error al cargar: " + error);
    });
}
