//let element = document.querySelector('*');
//window.alert(element);
/*let firstHeading = document.querySelector('h1');
alert("Primer h1" +firstHeading.textContent);
alert(document.querySelectorAll('h2')[2].textContent);
let note = document.querySelector('.menu-item');
alert("primer elemento con clase menu item: " + note);*/

/*devuelve todos los h2 ¿hijos de lass="section-X"? ¿hermanos de p?*/



/*ddevuelve todos los p hermanos de h2 */
/*let links = document.querySelectorAll('h2 ~ p');
alert(links.length);
console.log(links[0],links[1], links[2]);*/

/* devuelve todos los hermanos de P que son H2*/
/*let parrafos = document.querySelectorAll('p');
let h2Hermanos = [];

parrafos.forEach(parrafo => {
    let hermanoAnterior = parrafo.previousElementSibling;
    let hermanoSiguiente = parrafo.nextElementSibling;

    if (hermanoAnterior && hermanoAnterior.tagName === 'H2') {
        h2Hermanos.push(hermanoAnterior);
    }

    if (hermanoSiguiente && hermanoSiguiente.tagName === 'H2') {
        h2Hermanos.push(hermanoSiguiente);
    }
});

console.log(h2Hermanos);*/

/* devuelve todos los hermanos de P que son H2 otra versión*/

let h2Siblings = document.querySelectorAll('p ~ h2, h2 ~ p');
console.log(h2Siblings);

/* devuelve todos */
let elementos = document.querySelectorAll('p, h2');
let hermanos = [];

elementos.forEach(elemento => {
    if (
        (elemento.previousElementSibling && (elemento.previousElementSibling.tagName === 'H2' || elemento.previousElementSibling.tagName === 'P')) ||
        (elemento.nextElementSibling && (elemento.nextElementSibling.tagName === 'H2' || elemento.nextElementSibling.tagName === 'P'))
    ) {
        hermanos.push(elemento);
    }
});

console.log(hermanos);




