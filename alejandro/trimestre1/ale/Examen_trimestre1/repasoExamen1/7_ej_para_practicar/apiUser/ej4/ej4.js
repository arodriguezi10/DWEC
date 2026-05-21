//Muestra cuántos posts tiene cada usuario (del 1 al 10).
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        print10post(json)
    });

function print10post(data){

    const resultado = document.getElementById('container');

    const contador = {};

    for(let i=0; i<data.length; i++){
        const r = data[i];
        const userId = r.userId;

        if(contador[userId]){
            contador[userId]++;
        }else{
            contador[userId] = 1;
        }
    }

    for(let usuario = 1; usuario <= 10; usuario++){
        resultado.innerHTML += `
            <p>
                Usuario ${usuario}: ${contador[usuario]} posts
            </p>
        `;
    }
}