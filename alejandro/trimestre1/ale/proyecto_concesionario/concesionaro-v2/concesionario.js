// FASE 1
let cars = [];

const btadd = document.getElementById('btadd');
const btnmostrar = document.getElementById('btnmostrar');
const btndelete = document.getElementById('btndelete');

btadd.addEventListener('click', add);
btnmostrar.addEventListener('click', show);
btndelete.addEventListener('click', deleteCar);

function add() {

    // Esto es para recoger los valores de todos los campos del formulario, incluyendo category y fuel_type
    const categoryElement = document.getElementById("category");
    const selectedFuel = document.querySelector('input[name="fuel_type"]:checked'); 

    const car = {
        brand: document.getElementById("brand").value.trim(),
        color: document.getElementById("color").value.trim(),
        year: parseInt(document.getElementById("year").value), 
        plate: document.getElementById("plate").value.trim(),
        category: categoryElement ? categoryElement.value : "",
        fuel_type: selectedFuel ? selectedFuel.value : "",
        mot: document.getElementById("mot").checked
    }
    
    // VALIDACIONES

    // 1. Comprueba que ningún campo este vacío y que year sea un número válido
    if (!car.brand || !car.color || !car.plate || !car.year || isNaN(car.year) || !car.category || !car.fuel_type) {
        alert("All fields (Brand, Color, Year, Plate, Category, Fuel Type) must be filled, and Year must be a number.");
        return; // Se detiene si hay un campo vacío o year no es un número válido
    }

    // 2. Utilizo el método some() para comprobar si ya existe un coche en el array con la misma matrícula
    const plateExists = cars.some(existingCar => existingCar.plate === car.plate);
    if (plateExists) {
        window.alert("This plate is already registered. Please, check it.");
        return; // Detenemos si es un duplicado
    }

    // 3. Comprobamos que brand y color no superen los 30 caracteres
    if (car.brand.length > 30) {
        window.alert("Brand must be at most 30 characters long");
        return;
    }

    if (car.color.length > 30) { 
        window.alert("Color must be at most 30 characters long");
        return;
    }

    // Se añade el coche al array si pasa todas las validaciones
    cars.push(car);

    // Imprime el array actualizado por consola
    console.log(cars);
    //añadir a localStorage: key valor
    localStorage.setItem('cars', JSON.stringify(cars));
    // Reseteamos el formulario
    document.getElementById("formulario").reset();  
}

/*----------------------------------------------------------------------------------------*/

// FASE 2

function show() {

    // Aquí le damos el array a la funcioón y lo mostramos por pantalla en forma de lista
    const lista = document.getElementById("lista-cars");
    // Referencia a contador
    const contador = document.getElementById("contador"); 

    // Comprobamos que hay coches en la lista y que el elemento existe y si no, mostramos un mensaje
    if (!lista) {
        console.error("Error: Element with ID 'lista-cars' not found.");
        return;
    }
    // Esto es para limpiar la lista antes de mostrar los coches
    lista.innerHTML = "";

    // Si no hay coche añadidos, mostramos un mensaje
    if (cars.length === 0) {
        lista.innerHTML = "<li>No cars added yet.</li>";
        // Y actrualizamos el contador a 0
        if (contador) {
            contador.textContent = `Total cars: 0`;
        }
        return;
    }

    // Ordenar los coches alfabéticamente por la marca (brand)
    const cochesOrdenados = [...cars].sort((a, b) => a.brand.localeCompare(b.brand));

    // Itera sobre el array ordenado y crea un elemento de lista para cada coche con todos los datos
    cochesOrdenados.forEach((car, index) => {
        const item = document.createElement("li"); // Crea un elemento de lista
        // Formatea el texto con todos los datos del coche
        item.textContent = 
            `${index + 1}. ${car.brand} (${car.color}, ${car.year}) ` +
            `| Plate: ${car.plate} ` +
            `| Category: ${car.category.toUpperCase()} ` +
            `| Fuel: ${car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1)} ` +
            `| MOT: ${car.mot ? "Yes " : "No "}`;
            
        lista.appendChild(item); 
    });

    // Esto es para mostrar el número de coche añadidos
    if (contador) {
        contador.textContent = `Total cars: ${cars.length}`;
    }
}

//--------------------------------------------------------------------------------------
// FASE 3

function deleteCar() {
    const plateToDelete = prompt("Enter the plate of the car to delete:").trim(); // Pide al usuario la matrícula 
    if (plateToDelete) {
        const initialLength = cars.length;
        // Filtramos el array, manteniendo solo los coches cuya matrícula NO coincida
        cars = cars.filter(car => car.plate.toLowerCase() !== plateToDelete.toLowerCase()); 
        
        // Comprueba si se ha eliminado algún coche e imprime un mensaje de éxito o de error
        if (cars.length < initialLength) {
            alert(`Car with plate ${plateToDelete} deleted successfully.`);
            localStorage.setItem('cars', JSON.stringify(cars));
        } else {
            alert(`Car with plate ${plateToDelete} not found.`);
        }
        
        show();// Actualizamos la lista después de la eliminación
    }
}

/*----------------------------------------------------------------------------------------*/

// FASE 4

// MODIFICA TU PRACTIC  A FASE 3
// PARA QUE MUESTRE EN UN DIV
// USANDO SETINTERVAL UN RELOJ DIGITAL 
// QUE SE ACTUALICE CADA SEGUNDO


function mostrarHora(){

    let ahora = new Date();

    document.querySelector(".reloj").innerHTML = `

        <div class="reloj">
            <h1>
                ${ahora.toLocaleTimeString()}
            </h1>
        </div>

    `;
}

let myInterval = setInterval(mostrarHora, 1000);
mostrarHora();

// 1ª OPCIÓN PARA PARAR E INICIAR RELOJ CON EL BOTÓN

/*
function deteneryencenderReloj(){
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }else{
        myInterval = setInterval(mostrarHora, 1000);
        mostrarHora();
    }

};  
*/



// 2ª OPCIÓN PARA PARAR E INICIAR RELOJ CON EL BOTÓN
document.getElementById('stopClockButton').onclick = function(){
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }else{
        myInterval = setInterval(mostrarHora, 1000);
        mostrarHora();
    }

};


//Añadir datos en localStorage
document.getElementById('anadirLocalStorage').onclick = function(){
    //Añadir datos a localStorage
    localStorage.setItem('brand', 'Toyota');
    localStorage.setItem('color', 'Azul');
    window.alert('Datos añadidos a Local Storage');
}

/*----------------------------------------------------------------------------------------*/

// FASE 5

// Cambiar el color del reloj, dependiendo del color que se seleccione

const clock = document.querySelector(".reloj");
const select = document.getElementById("opciones");

const savedColor = localStorage.getItem("clockColor");
if (savedColor) {
    clock.style.color = savedColor;
    select.value = savedColor;
}

select.addEventListener("change", () =>{
    const color = select.value;
    clock.style.color = color;
    localStorage.setItem("clockColor", color);
});




