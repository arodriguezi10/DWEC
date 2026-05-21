function average(){

    //Recogemos los datos del formulario
    const inputs = [
        document.getElementById("name"),
        document.getElementById("math"),
        document.getElementById("lenguage"),
        document.getElementById("science")
    ];

    //Guardamos esos datos recogidos en un array
    let values = [];
    
    //VALIDACIONES
    //1º. Todos los campos tiene que estar rellenos
    //2º. Todos los campos excepto name tiene que se números
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value.trim() === ""){
            alert("All fields must be filled");
            return;
        };

        if (i > 0 && isNaN(inputs[i].value)) {
            alert("All the fields except name must be numbers.");
            return;
        }
        values.push(inputs[i].value);
    }

    console.log(values);
    
    //Cálculo de la medio

    //Declaramos la variable suma y contador y las inicializamos a 0
    let suma = 0;
    let contador = 0;

    for (let i = 1; i < values.length; i++) {
            suma = suma + parseFloat(values[i]);
            contador++;
    }   

    let average = suma / contador;
        alert("La media de las notas es: " + average);
    }