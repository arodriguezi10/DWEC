// PhysicalProduct.js
import { product } from './product.js';

// Physical products like laptops, shirts, etc.
export class physicalproduct extends product {
  #weight;

  constructor(id, name, price, stock, weight) {
    super(id, name, price, stock); 
    this.weight = weight;           
  }

  // Getter for weight
  get weight() {
    return this.#weight;
  }

  // Setter for weight with validation
  set weight(value) {
    if (value <= 0) {
      throw new Error("Weight must be greater than 0");
    }
    this.#weight = value;
  }

  // Calculate shipping cost based on weight
  calculateShippingCost() {
    return this.weight * 2; // 2€ per kg
  }

  // Override finalPrice to include shipping
  finalPrice() {
    return super.finalPrice() + this.calculateShippingCost();
  }

  // Override showInfo to include weight
  showInfo() {
    super.showInfo();
    console.log(`Type: Physical - Weight: ${this.weight} kg`);
  }

  // Simulate shipping the product
  ship() {
    console.log(`Shipping ${this.name} (Weight: ${this.weight} kg)`);
  }
}
