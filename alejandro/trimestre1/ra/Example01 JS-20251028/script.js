// Capture data from user
let name = prompt("Enter your name:");
let age = prompt("Enter your age:");
let color = prompt("Enter your favorite color:");

// Create message
let message = "Hello, " + name + "! You are " + age + " years old and your favorite color is " + color + ".";

// Show in console
console.log(message);


// Check age and show result
if (age > 18) {
  console.log("You are an adult!");
} else {
  console.log("You are a minor!");
}

// Change background color
document.body.style.backgroundColor = color;
