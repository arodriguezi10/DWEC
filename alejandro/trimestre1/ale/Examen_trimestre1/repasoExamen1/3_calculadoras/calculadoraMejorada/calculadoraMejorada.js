//Creamos la funcion para la calculadora
function calcular(){

    //Recogemos los elementos de input
    const input1 = document.getElementById("op1");
    const input2 = document.getElementById("op2");

    //Creamos las validaciones 
    //1º No puede haber campos vacios
    if(input1.value.trim() === "" || input2.value.trim() === ""){
        window.alert("Rellene todos los campos");
        return;
    }
    
    //Convertimos a números
    const op1 = parseFloat(input1.value);
    const op2 = parseFloat(input2.value);
    

    //2º Los campos deben ser numeros
    // Al usar isNaN primero se pone isNaN y luego a lo que nos referimos
    if(isNaN(op1) || isNaN(op2)){
        window.alert("Los campos deben ser numeros");
        return;
    }

    //Recogemos la operación seleccionada
    const form = document.getElementById("calcForm");
    let operacion = form.elements["operation"].value;

    //Almacenamos los datos en una variable
    let resultado;

    switch (operacion) {
        case "suma":
            resultado = op1 + op2;
            break;
        case "resta":
            resultado = op1 - op2;
            break;
        case "multiplicacion":
            resultado = op1 * op2;
            break;
        case "division":
            if (op2 === 0) {
                alert("¡No se puede dividir por cero!");
                return;
            }
            resultado = op1 / op2;
            break;
    }

    alert("Resultado: " + resultado);
}