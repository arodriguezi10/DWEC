// index.js
//before executing this file, make sure to run "npm init -y" in the terminal
//before importing modules, we need to set "type": "module" in package.json 
// to enable ES6 module support in Node.js
// Import classes
import { digitalproduct } from './digitalproduct.js';								  
import { physicalproduct } from './physicalproduct.js';
import { shoppingcart } from './shoppingcart.js';

// Create products
const course = new digitalproduct(1, "JavaScript Course", 50, 10, 1500);
const laptop = new physicalproduct(2, "Laptop", 1000, 5, 2);

// Show info
course.showInfo();
laptop.showInfo();

// Create a shopping cart
const cart = new shoppingcart();

// Add products to the cart
cart.addProduct(course, 2);
cart.addProduct(laptop, 1);

//create here another product and add it to the cart
//complete the classes that are no completed yet

// Show cart items
cart.showCart();

// Total
console.log("TOTAL:", cart.getTotal(), "€");

// Apply discount
cart.applyDiscountToAll(10);
cart.showCart();
console.log("TOTAL with discount:", cart.getTotal(), "€");

// Simulate download and shipping
course.download();
laptop.ship();
