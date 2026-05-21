// Pedimos los datos del usuario a través una "ventana"
let name = prompt ("Enter your name");
let age = prompt ("Enter your age");
let color = prompt ("Enter your favourite color");

//Ahora creamos una variable para almacenar el mensaje
let message = "Hello " + name + "! You are " + age + " and your favourite color is " + color + ".";

//Mostramos el mensaje
console.log(message);

//Comprobamos si el usuario es mayor o menor de edad
if(age > 18){
    console.log("You're an adult");
}else{
    console.log("You're a child");
}

//Cambiamos el color de fondo por el color favorito que el usuario a introducido
document.body.style.backgroundColor = color;