fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(json => {
        printTareas(json)
    });

function printTareas(data){

    let container = document.getElementById("user");

    data.forEach(tarea => {
        container.innerHTML += `
            <p>
                <br>Usuario: ${tarea.userId}
                <br>Título: ${tarea.title}
            </p>

        `;
    });
    
}