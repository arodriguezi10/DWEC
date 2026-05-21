//Muestra el id y el titulo del usuario 10

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        printIdTitulo(json)
    });

function printIdTitulo(data){

    const resultado = document.getElementById('container');

    for(i=0; i<data.length; i++){
        const r = data[i];

        if(r.userId === 10){
            resultado.innerHTML += `
            <p>
                id: ${r.id}
                <br>title: ${r.title}
            </p>
        `;
        }
    }
}