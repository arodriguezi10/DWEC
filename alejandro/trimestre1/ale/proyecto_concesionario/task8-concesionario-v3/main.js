import {add, show, deleteCar} from './cars.js';
import { initClock, deteneryencenderReloj } from './clock.js';
import { allowDrop, arrastrar, soltar, check } from './dragDrop.js';


document.addEventListener("DOMContentLoaded", () => {
    show();
    initClock();
    
    const imagenes = document.querySelectorAll('.cars img');
    imagenes.forEach(img => {
        img.addEventListener('dragstart', arrastrar);
    });

    const cajas = document.querySelectorAll('.cont-cajas div');
    cajas.forEach(caja => {
        caja.addEventListener('dragover', allowDrop);
        caja.addEventListener('drop', soltar);
    });


    document.getElementById('btnadd').addEventListener('click', add);
    document.getElementById('btnmostrar').addEventListener('click', show);
    document.getElementById('btndelete').addEventListener('click', deleteCar);

    document.getElementById('stopClockButton').addEventListener.onclick = deteneryencenderReloj;

    const btnCheck = document.getElementById('btncheck');
        if (btnCheck) {
            btnCheck.addEventListener('click', check);
    }

    //Añadir datos en localStorage
    document.getElementById('anadirLocalStorage').onclick = function(){
        //Añadir datos a localStorage
        localStorage.setItem('brand', 'Toyota');
        localStorage.setItem('color', 'Azul');
        window.alert('Datos añadidos a Local Storage');
    };
})  