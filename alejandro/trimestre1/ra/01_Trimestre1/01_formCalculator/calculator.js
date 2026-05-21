// Simple function to calculate the result
function calculate() {
  // Get all input elements for validation
  const form = document.getElementById('calcForm');
  const elements = form.elements;
  let valid = true;
  let values = {};

  // Validate input fields using a loop
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName === 'INPUT' && (el.type === 'text')) {
      const value = el.value.trim();
      if (value === '') {
        console.log(`Field '${el.name}' is empty.`);
        valid = false;
      } else if (isNaN(value)) {
        console.log(`Field '${el.name}' is not a number.`);
        valid = false;
      } else {
        values[el.name] = parseFloat(value);
      }
    }
  }

  if (!valid) {
    return;
  }

  // Get selected operation
  let operation = form.elements["operation"].value;
  let op1 = values["op1"];
  let op2 = values["op2"];
  let result;

  // Perform calculation based on the selected operation
  if (operation === "add") {
    result = op1 + op2;
  } else if (operation === "subtract") {
    result = op1 - op2;
  } else if (operation === "multiply") {
    result = op1 * op2;
  } else if (operation === "divide") {
    if (op2 !== 0) {
      result = op1 / op2;
    } else {
      console.log("Cannot divide by zero!");
      return;
    }
  }
  console.log("Result:", result);
}
