function Student_Grades() {
    
    const inputs = [
        document.getElementById("name"),
        document.getElementById("math"),
        document.getElementById("language"),
        document.getElementById("science")
    ];
    
    /*let name = document.getElementById("name").value;
    let math = parseFloat(document.getElementById("math").value);
    let language = parseFloat(document.getElementById("language").value);
    let science = parseFloat(document.getElementById("science").value); */

    let values = [];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.value.trim() === "") {
            alert("All fields must be filled.");
            return;
        }   
        
        if (i > 0 && isNaN(input.value)) {
            alert("All the fields except name must be numbers.");
            return;
        }
        values.push(input.value);
    }

   
    /*
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.value.trim() === "") {
            alert("All fields must be filled.");
            return;
        }
        // El primer campo es el nombre, los demás deben ser números
        if (i > 0 && isNaN(input.value)) {
            windowalert("All the fields except name must be numbers.");
            return;
        }
        values.push(input.value);
    }
*/
let sum = 0;
let count = 0;

for (let i in values) {
   if (i == 0) continue; 
    sum = sum + parseFloat(values[i]);
    count++;
}
let average = sum / count;
alert("La media de las notas es: " + average);
}
    