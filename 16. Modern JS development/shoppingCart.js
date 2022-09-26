// Exporting module
console.log("Exporting module");

// Variables within a module are scoped to the module, this means that all top level variables are private inside of this module.
const shippingCode = 10;
const cart = [];

// 1. Named export
export const addToCart = (product, quantity) => {
  cart.push({product, quantity});
  console.log(`${product} ${quantity} added to cart`);
}

/* Exports need to happen in top-level code below wont work
  if (true) {
    export const addToCart = (product, quantity) => {
      cart.push({product, quantity});
      console.log(`${product} ${quantity} added to cart`);
    }
  }
*/

// Multiple named export
const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq};
// (totalQuantity as tq) this allows us to change the name of the named export when exporting, we can also do the same thing when importing

// 2. Default Export
// Can only do one default export per module.
// Export the whole value of below (We give the value a name when importing)
export default (product, quantity) => {
  cart.push({product, quantity});
  console.log(`${product} ${quantity} added to cart`);
};

// Use case
// When exporting more than one use named export.
// When we only want to export one thing per a module.