function procesarDatosUsuario() {
    
    let name = prompt("Enter your name:");
    let birthYearInput = prompt("Enter your year of birth (e.g., 1990):");
    let country = prompt("Enter your country of residence:");

    
    const birthYear = parseInt(birthYearInput);
    if (isNaN(birthYear) || birthYear < 1900) {
        console.error("Invalid year of birth entered.");
        alert("Please enter a valid year of birth.");
        return;
    }

    
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    
    saludarYMostrarDatos(name, age, country);

    
    if (age >= 65) {
        alert("¡Atención! Estás en edad de jubilación (65+). 👴");
    } else {
        alert("Aún te queda un tiempo para jubilarte. Sigue trabajando. 💪");
    }
}


function saludarYMostrarDatos(nombre, edad, pais) {
    const message = `Hello ${nombre}! You are approximately ${edad} years old and you live in ${pais}.`;

    // Muestra en la consola (Requerimiento del ejercicio)
    console.log("--- DATOS DEL USUARIO ---");
    console.log(message);
    console.log("-------------------------");

    // Muestra en el DOM (en el elemento con id="datos-usuario")
    const container = document.getElementById("datos-usuario");

    if (container) {
        container.innerHTML = `
            <h3>¡Hola, ${nombre}!</h3>
            <p>Tienes aproximadamente **${edad}** años.</p>
            <p>Vives en **${pais}**.</p>
        `;
    } else {
        console.error("Element with ID 'datos-usuario' not found in the HTML.");
    }
}

procesarDatosUsuario();


 
