function calculate() {
  const inputs = [
    document.getElementById("op1"),
    document.getElementById("op2")
  ];

  let values = [];
  for (let input of inputs) {
    if (input.value.trim() === "") {
      alert("All fields must be filled.");
      return;
    }
    if (isNaN(input.value)) {
      alert("All fields must be numbers.");
      return;
    }
    values.push(parseFloat(input.value));
  }

  // Recoger operación como en tu versión original
  const form = document.getElementById("calcForm");
  let operation = form.elements["operation"].value;

  let result;
  switch (operation) {
    case "add":
      result = values[0] + values[1];
      break;
    case "subtract":
      result = values[0] - values[1];
      break;
    case "multiply":
      result = values[0] * values[1];
      break;
    case "divide":
      if (values[1] === 0) {
        alert("Cannot divide by zero!");
        return;
      }
      result = values[0] / values[1];
      break;
    default:
      alert("No operation selected.");
      return;
  }

  alert("Result: " + result);
}
