//Muetra un post aleatorio
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        printRandom(json)
    });

function printRandom(data){

    const resultado = document.getElementById('container');

    for(let i=0; i<1; i++){
        const numRamdom = Math.floor(Math.random() * data.length)

        const r = data[numRamdom];

         resultado.innerHTML += `
            <div>
                <h3>Post #${r.id}</h3>
                <p><strong>Usuario:</strong> ${r.userId}</p>
                <p><strong>Título:</strong> ${r.title}</p>
                <p><strong>Contenido:</strong> ${r.body}</p>
                <hr>
            </div>
        `;
    }
}