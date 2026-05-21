//Parte1 

//1. 
const palabraClave_ARI = document.getElementById("clave").value.trim().toLowerCase();
const form_ARI = document.getElementById("formulario");
let modo_ARI = form_ARI.elements["opcion"].value;
//const seleccion = document.querySelector('input[name="opcion":checked]').value;

let array_ARI = [];

const resultado = document.getElementById('salida');


fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        printUser(json)
    });

function printUser(data){

    let contador_ARI = 0;

    for(let i=0; i<data.length; i++){
       let name = data[i].name;
       let email = data[i].email;

        if(name.toLowerCase().includes(palabraClave_ARI) || email.toLowerCase().includes(palabraClave_ARI)){
            contador_ARI++;

            array_ARI.push(data[i]);

            resultado.innerHTML += `
                <p>
                    Name: ${palabraClave_ARI};
                    Encontrado: ${contador_ARI}            
                </p>
            `;       
        }
   } 
}
