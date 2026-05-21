// ShoppingCart.js
// Shopping cart to hold products
export class shoppingcart {
  constructor() {
    this.items = []; // array of { product, quantity }
  }

  // Add a product to the cart
  addProduct(product, quantity) {
    if (!product.stock || product.stock < quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    this.items.push({ product, quantity });
    product.stock -= quantity;
    console.log(`${quantity} x ${product.name} added to cart`);
  }

  // Remove a product by its ID
  removeProduct(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    console.log(`Product removed from cart`);
  }

  // Show all items in the cart
  showCart() {
    console.log("---- SHOPPING CART ----");
    this.items.forEach(item => {
      console.log(`${item.quantity} x ${item.product.name} = ${item.product.finalPrice() * item.quantity} €`);
    });
  }

  // Calculate total price of the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.product.finalPrice() * item.quantity, 0);
  }

  // Apply discount to all products in cart
  applyDiscountToAll(percent) {
    this.items.forEach(item => item.product.price *= (1 - percent / 100));
  }

  // Clear the cart
  clearCart() {
    this.items = [];
    console.log("Cart cleared");
  }
}
