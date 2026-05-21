function calcularEnvio(){
    //Recogemos los datos del formulario y lo guardamos en un array
    const peso = parseFloat(document.getElementById("peso").value);
    const zona = document.getElementById("zona").value;

    if (isNaN(peso)) {
        alert("El peso introducido no es un número válido.");
        return;
    }

    const array = [peso, zona];

    console.log(array);

    //Validaciones

    if(peso <= 0){
        alert("El peso no es válido");
        return;
    }

    if(zona === ""){
        alert("El campo zona no puede estar vacio");
        return;
    }

    //Coste segun la zona
    let costeBase;

    switch(zona){
        case "local":
            costeBase = 5;
            break;
        case "nacional":
            costeBase = 15;
            break;
        case "internacional":
            costeBase =20;
            break;
        default:
            alert("Zona no reconocida. Por favor, revise la selección.");
            return;
    }

    //Coste final
    const recargoPorPeso = 1.5 * peso; // 1.5€ por cada kg
    const costoFinal = costeBase + recargoPorPeso;

    // 5. Mostrar el resultado
    console.log("--- CÁLCULO DE ENVÍO ---");
    console.log(`Peso: ${peso} kg`);
    console.log(`Zona: ${zona.toUpperCase()}`);
    console.log(`Costo Base: ${costeBase} €`);
    console.log(`Recargo por peso: ${recargoPorPeso.toFixed(2)} €`);
    console.log(`Costo Final: ${costoFinal.toFixed(2)} €`); // toFixed(2) para 2 decimales
    console.log("------------------------");
    
    alert(`El costo final del envío a la zona ${zona.toUpperCase()} con ${peso} kg es: ${costoFinal.toFixed(2)} €`);

    // Opcional: Mostrar resultado en un elemento del DOM
    const resultadoDiv = document.getElementById("resultado-envio");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = `El **costo final** es de **${costoFinal.toFixed(2)} €** (Base: ${costeBase}€ + Recargo: ${recargoPorPeso.toFixed(2)}€)`;
    }
}