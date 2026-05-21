// 1. Obtener el padre de un ítem de la lista
const secondTask = document.querySelectorAll('.task')[1]; 
const parentOfSecond = secondTask.parentElement;

console.log("Parent element of Task 2:", parentOfSecond);

// 2. Obtener los hijos del contenedor
const container = document.getElementById('task-container');
const containerChildren = container.children;

console.log("Child elements of the container:", containerChildren);

// 3. Obtener los elementos hermanos de un ítem
const prevSibling = secondTask.previousElementSibling;
const nextSibling = secondTask.nextElementSibling;

console.log("Previous sibling:", prevSibling);
console.log("Next sibling:", nextSibling);

// 4. Crear un nuevo elemento con createElement()
const newTask = document.createElement('li');

// 5. Insertar el nuevo elemento dentro del contenedor usando appendChild()
newTask.textContent = "Task 4 (added with appendChild)";
document.getElementById('task-list').appendChild(newTask);

// 6. Modificar el contenido usando textContent e innerHTML
// textContent → solo texto
secondTask.textContent = "Task 2 (edited with textContent)";

// innerHTML → permite HTML dentro
parentOfSecond.innerHTML += "<li class='task'><strong>Task 5 (added with innerHTML)</strong></li>";