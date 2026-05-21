function calcularPromedioVentas(){

    //Recogemos los valores del formulario, los guardamos en un array y los mostaramos
    const mes1 = parseFloat(document.getElementById("mes1").value);
    const mes2 = parseFloat(document.getElementById("mes2").value);
    const mes3 = parseFloat(document.getElementById("mes3").value);
    const mes4 = parseFloat(document.getElementById("mes4").value);
    const mes5 = parseFloat(document.getElementById("mes5").value);

    let array = [mes1,mes2,mes3,mes4,mes5];

    suma= 0;

    //Validaciones

    for(let i = 0; i<array.length; i++){
        if(array[i] < 0 ){
            alert("Los numeros deben ser positivos");
            return;
        };

        if(isNaN(array[i])){
            alert("Los valores deben ser numeros");
            return;
        }

        suma += array[i];
    }
    
    console.log(array);
    alert("El resultado de la suma es: " + suma);
   
}