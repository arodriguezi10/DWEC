
export function allowDrop(ev){
    ev.preventDefault();
}

export function arrastrar(ev){
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

export function soltar(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elemento = document.getElementById(data);
    ev.currentTarget.appendChild(elemento);
}

// funcion para comprobar si los coches estan en la caja correcta
export function check() {

    const cajas = document.querySelectorAll('.cont-cajas > div');
    const totalCoches = document.querySelectorAll('.dragDrop img').length;
    
    let aciertos = 0;
    let cochesColocados = 0;

    document.querySelectorAll('.dragDrop img').forEach(img => {
        img.classList.remove('resaltar-correcto', 'resaltar-error');
    });

    cajas.forEach(caja => {
        const cochesEnCaja = caja.querySelectorAll('img');
        
        cochesEnCaja.forEach(img => {
            cochesColocados++;

            if (img.getAttribute('data-category') === caja.id) {
                img.classList.add('resaltar-correcto');
                aciertos++;
            } else {
                img.classList.add('resaltar-error');
            }
        });
    });

    if (cochesColocados < totalCoches) {
        window.alert("¡Aún quedan coches por colocar!");
    } else if (aciertos === totalCoches) {
        window.alert("¡Felicidades! Todos los coches están en su lugar correcto.");
    } else {
        window.alert(`Has tenido fallos. ¡No te rindas! Ánimo y vuelve a intentarlo.`);
        
    }




}