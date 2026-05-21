//Creamos una funcion llamada calcular 
function calcular(){

    //Recogemos los datos introducidos por el usuario y los convertimos a numeros 
    let op1 = parseFloat(document.getElementById("op1").value); 
    let op2 = parseFloat(document.getElementById("op2").value);

    let operation = document.forms[0].elements["operation"].value;

    //Guardamos el resultado en una variable
    let resultado;

    if(operation === "suma"){
        resultado = op1 + op2;
    }else if(operation === "resta"){
        resultado = op1 - op2;
    }else if(operation === "multiplicacion"){
        resultado = op1 * op2;
    }else if(operation === "division"){
        if(op2 !== 0){
            resultado = op1 / op2;
        }else{
            console.log("No se puede dividir por 0");
            return;
        }
    }

    //Mostramos el resultado por consola
    console.log("Resultado: ", resultado);


}