// Muestra todos los posts pero con el título en MAYÚSCULAS.

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        printTituloMayus(json)
    });

function printTituloMayus(data){

    const resultado = document.getElementById('container');

    for(i=0; i<data.length; i++){
        const m = data[i];

        resultado.innerHTML += `
            <p>
                <br>Post: ${m.userId}
                <br>Title: ${m.title.toUpperCase()}
            </p>
        `;
    }

}