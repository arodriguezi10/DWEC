// Product.js
// Base class for all products
export class product {
  //this class is incomplete, add here the missing code
  #price; // private property for price
  #stock; // private property for stock

  /** The constructor can be named however you want in each class, as 
   * long as it has the parameters you need.
    The important thing is that the child class calls super(...) with the 
    parameters required by the parent class. */
  constructor(id, name, price, stock) {
    this.id = id;         
    this.name = name;     
    this.price = price;   // call setter
    this.stock = stock;   // call setter
  }

  // GETTER for price
  get price() {
    return this.#price; // return private property
  }

  // SETTER for price
  set price(value) {
    if (value <= 0) {
      throw new Error("Price must be greater than 0");
    }
    this.#price = value; // set private property
  }

  // GETTER for stock
  get stock() {
    return this.#stock;
  }

  // SETTER for stock
  set stock(value) {
    if (value < 0) {
      throw new Error("Stock cannot be negative");
    }
    this.#stock = value;
  }

  // Method to calculate final price with tax (21%)
  finalPrice() {
    return this.price * 1.21;
  }

  // Method to display product info
  showInfo() {
    console.log(`${this.name} - ${this.price} € (Stock: ${this.stock})`);
  }
}
