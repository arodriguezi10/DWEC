const btnCargarTareas = document.getElementById("btnCargarTareas");
const listaTareas = document.getElementById("listaTareas");

btnCargarTareas.addEventListener("click", cargarTareas);

function cargarTareas() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((respuesta) => respuesta.json())

    .then((tareas) => {
      console.log(tareas);
      //filtrar
      const filtrados = tareas.filter((tareas) => {
        return tareas.completed === true;
      });

      // sacar solo los 5 primeros elementos del array
      const top5tareas = filtrados.slice(0, 5);

      //generar html
      let contenidoHTML = "";

      top5tareas.forEach((tarea) => {
        contenidoHTML += `<li>${tarea.title}</li>`;
      });

      listaTareas.innerHTML = contenidoHTML;
    })

    .catch((error) => {
      console.error("Error en la petición:", error);
      listaTareas.innerHTML = "<li>Error al cargar las tareas.</li>";
    });
}
