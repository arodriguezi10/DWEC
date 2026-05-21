// Simple function to calculate the result
function calculate() {
  // Read values from input fields and convert them to numbers
  let op1 = parseFloat(document.getElementById("op1").value);
  let op2 = parseFloat(document.getElementById("op2").value);

  let operation = document.forms[0].elements["operation"].value;


  // Variable to store the result
  let result;

  // Perform calculation based on the selected operation
  if (operation === "add") {
    result = op1 + op2; // addition
  } else if (operation === "subtract") {
    result = op1 - op2; // subtraction
  } else if (operation === "multiply") {
    result = op1 * op2; // multiplication
  } else if (operation === "divide") {
    // Check for division by zero
    if (op2 !== 0) {
      result = op1 / op2; // division
    } else {
      console.log("Cannot divide by zero!"); // error message
      return;
    }
  }

  // Show the result in the console
  console.log("Result:", result);
}
