//Muestra los 10 primeros posts

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        print10post(json)
    });

function print10post(data){

    const resultado = document.getElementById('container');

    for(let i=0; i<10; i++){
        const post = data[i];

        resultado.innerHTML += `
            <p>
                userID: ${post.userId}
                <br> id: ${post.id}
                <br> title: ${post.title}
                <br> body: ${post.body}
            </p>
        `;
    }
}