let myInterval = null;

export function mostrarHora(){

    let ahora = new Date();

    document.querySelector(".reloj").innerHTML = `

        <div class="reloj">
            <h1>
                ${ahora.toLocaleTimeString()}
            </h1>
        </div>

    `;
}


// 1ª OPCIÓN PARA PARAR E INICIAR RELOJ CON EL BOTÓN

export function deteneryencenderReloj(){
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }else{
        myInterval = setInterval(mostrarHora, 1000);
        mostrarHora();
    }

};  


// 2ª OPCIÓN PARA PARAR E INICIAR RELOJ CON EL BOTÓN
/*
document.getElementById('stopClockButton').onclick = function(){
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }else{
        myInterval = setInterval(mostrarHora, 1000);
        mostrarHora();
    }

};
*/

export function initClock() {
    // Iniciar reloj por defecto
    myInterval = setInterval(mostrarHora, 1000);
    mostrarHora();

    // Lógica de color (Fase 5)
    const clock = document.querySelector(".reloj");
    const select = document.getElementById("opciones");
    const savedColor = localStorage.getItem("clockColor");

    if (savedColor && clock) {
        clock.style.color = savedColor;
        if (select) select.value = savedColor;
    }

    select?.addEventListener("change", () => {
        const color = select.value;
        clock.style.color = color;
        localStorage.setItem("clockColor", color);
    });
}